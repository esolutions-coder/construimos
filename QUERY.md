# CREAR USUARIOS

### Mutacion

`mutation Mutation($userData: UserInput!) {
  addNewUser(userData: $userData) {
    code
    message
    user {
      username
      email
      creationDate
    }
    success
  }
}`

### Input Data

`{
  "userData": {
    "email": null,
    "password": null,
    "role": null,
    "username": null
  }
}`
