const passport = require('passport');
const LocalStrategy = require('passport-local');
const crypto = require('crypto');
const { Buffer } = require('buffer');
const db = require('./db');

module.exports = () => {
  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
  },
  (email, password, cb) => {
    /*
      Given a username and password, this function should verify that the
      credentials are correct:
      make a call to the database and look for that username,
      get the password,
      and confirm the password is correct somehow ('crypto' library).
      If correct, return the user object to the callback;
      if not, return false and an error message to the callback.
    */
    db.query('SELECT id, profile_id, email, password, salt FROM auth WHERE email = ?', [email], (errDb, row) => {
      if (errDb) { return cb(errDb); }
      if (!row) { return cb(null, false, { message: 'Incorrect username or password.' }); }
      if (row.length > 1) {
        console.log('Multiple auth accounts found. Are DB fields properly UNIQUE?');
        return cb(null, false, { message: 'Non-unique auth account. Contact server administrator' });
      }
      console.log('found row(s) while verifiying creds: ', row);
      const authData = row[0];

      crypto.pbkdf2(password, Buffer.from(authData.salt, 'hex'), 310000, 32, 'sha256', (errCrypto, hashedPassword) => {
        if (errCrypto) { return cb(errCrypto); }

        if (!crypto.timingSafeEqual(Buffer.from(authData.password, 'hex'), hashedPassword)) {
          return cb(null, false, { message: 'Incorrect username or password.' });
        }

        const user = {
          id: authData.id.toString(),
          profile_id: authData.profile_id,
        };
        return cb(null, user);
      });

      return null;
    });
  }));

  // Configure Passport authenticated session persistence.
  //
  // In order to restore authentication state across HTTP requests, Passport needs
  // to serialize users into and deserialize users out of the session.  The
  // typical implementation of this is as simple as supplying the user ID when
  // serializing, and querying the user record by ID from the database when
  // deserializing.
  passport.serializeUser((user, cb) => {
    process.nextTick(() => {
      cb(null, { id: user.id, profile_id: user.profile_id });
    });
  });

  passport.deserializeUser((user, cb) => {
    process.nextTick(() => cb(null, user));
  });
};
