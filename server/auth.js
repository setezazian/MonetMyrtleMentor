const passport = require('passport');
const LocalStrategy = require('passport-local');
const crypto = require('crypto');
const db = require('../db');

module.exports = () => {
  passport.use(new LocalStrategy((username, password, cb) => {
    /*
      Given a username and password, this function should verify that the
      credentials are correct:
      make a call to the database and look for that username,
      get the password,
      and confirm the password is correct somehow ('crypto' library).
      If correct, return the user object to the callback;
      if not, return false and an error message to the callback.
    */
    db.get('SELECT rowid AS id, * FROM users WHERE username = ?', [username], (errDb, row) => {
      if (errDb) { return cb(errDb); }
      if (!row) { return cb(null, false, { message: 'Incorrect username or password.' }); }

      crypto.pbkdf2(password, row.salt, 310000, 32, 'sha256', (errCrypto, hashedPassword) => {
        if (errCrypto) { return cb(errCrypto); }
        if (!crypto.timingSafeEqual(row.hashed_password, hashedPassword)) {
          return cb(null, false, { message: 'Incorrect username or password.' });
        }

        const user = {
          id: row.id.toString(),
          username: row.username,
          displayName: row.name,
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
      cb(null, { id: user.id, username: user.username });
    });
  });

  passport.deserializeUser((user, cb) => {
    process.nextTick(() => cb(null, user));
  });
};
