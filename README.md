# MonetMyrtleMentor

## Backend REST API

Examples:

POST to `/api/user/new` to create a new user;
sample POST body:
```
{
  firstName: 'Fanno',
  lastName: 'Chea',
  email: 'fanno.chea@gmail.com',
  password: 'helloworld',
  offeringName: 'Form creation',
  offeringDesc: 'I can teach you poorly how to create a web form',
  availability: [
    {
      startTime: '2021-10-20T02:00:00.000Z',
      endTime: '2021-10-20T03:00:00.000Z'
    }
  ]
}
```
