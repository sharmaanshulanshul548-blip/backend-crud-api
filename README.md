# Backend CRUD API

A beginner-friendly backend built with Node.js, Express, MongoDB Atlas, Mongoose and bcrypt. It follows the freeCodeCamp **Intro to Backend Web Development** tutorial and uses separate models, controllers and routes.

## Features

- MongoDB models for users and posts
- User register, login and logout examples
- Password hashing (plain-text passwords are never stored)
- Complete Create, Read, Update and Delete operations for posts
- Request validation and useful HTTP status codes
- Postman collection and automated API tests

## Project structure

```text
backend/src/
├── config/database.js
├── controllers/
│   ├── post.controller.js
│   └── user.controller.js
├── models/
│   ├── post.model.js
│   └── user.model.js
├── routes/
│   ├── post.route.js
│   └── user.route.js
├── app.js
└── index.js
```

## 1. Install the required programs

Install Node.js, Git, Postman Desktop and create free GitHub and MongoDB Atlas accounts.

Check Node and npm in a terminal:

```bash
node --version
npm --version
```

## 2. Install this project

Open a terminal in the project folder and run:

```bash
npm install
```

## 3. Create the MongoDB Atlas database

1. Sign in at [MongoDB Atlas](https://www.mongodb.com/atlas/database).
2. Create a free project and free cluster.
3. Under **Database Access**, add a database user and save its password.
4. Under **Network Access**, add your current IP address. For a classroom demo, Atlas also offers access from anywhere (`0.0.0.0/0`), but your database username and password must remain private.
5. Select **Connect → Drivers → Node.js**, then copy the connection string.
6. Copy `.env.example` to a new file named `.env`.
7. Put the connection string in `.env`, replace the username/password placeholders, and keep `/backend-course` before the `?`.

Example only (do not commit real credentials):

```env
PORT=4000
MONGODB_URI=mongodb+srv://myUser:myPassword@cluster0.example.mongodb.net/backend-course?retryWrites=true&w=majority
```

If the password includes special characters such as `@`, encode them for a URL (for example, `@` becomes `%40`). The `.gitignore` file prevents `.env` from being uploaded to GitHub.

## 4. Run the API

Development mode (Node automatically restarts after saved changes):

```bash
npm run dev
```

Normal mode:

```bash
npm start
```

Open <http://localhost:4000/api/v1/health>. A working server returns:

```json
{ "status": "ok" }
```

## 5. Test with Postman

Import `postman/Backend-CRUD-API.postman_collection.json` into Postman. Run the requests in this order:

1. Health Check
2. Register User
3. Login User
4. Create Post (automatically saves the new post ID)
5. Get All Posts
6. Get One Post
7. Update Post
8. Delete Post
9. Logout User

The collection uses `http://localhost:4000` by default.

## API endpoints

| Method | Endpoint | Purpose | Expected status |
|---|---|---|---:|
| GET | `/api/v1/health` | Check the server | 200 |
| POST | `/api/v1/users/register` | Create a user | 201 |
| POST | `/api/v1/users/login` | Check credentials | 200 |
| POST | `/api/v1/users/logout` | Logout example | 200 |
| POST | `/api/v1/posts/create` | Create a post | 201 |
| GET | `/api/v1/posts/getPosts` | Read every post | 200 |
| GET | `/api/v1/posts/:id` | Read one post | 200 |
| PATCH | `/api/v1/posts/update/:id` | Update a post | 200 |
| DELETE | `/api/v1/posts/delete/:id` | Delete a post | 200 |

Create-post JSON body:

```json
{
  "name": "Anshu",
  "description": "My first backend post",
  "age": 20
}
```

## Automated tests

The test suite starts a temporary in-memory MongoDB database, so it does not need your Atlas password:

```bash
npm test
```

## 6. Upload to your own public GitHub repository

Create a new **public** GitHub repository without adding a README or `.gitignore,` then run these commands from this folder. Replace the two placeholders first:

```bash
git init
git add .
git commit -m "Complete Node Express MongoDB backend tutorial"
git branch -M main
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/YOUR_REPOSITORY_NAME.git
git push -u origin main
```

Submit the public URL shown by GitHub. Before submitting, confirm that `.env` is not visible in the repository.

## Short viva/demo explanation

- **Node.js** runs JavaScript outside the browser.
- **Express** receives HTTP requests and sends responses.
- A **route** maps an HTTP method and URL to a controller.
- A **controller** validates a request and performs the operation.
- A **Mongoose model** defines the data shape and communicates with MongoDB.
- **CRUD** means Create (`POST`), Read (`GET`), Update (`PATCH`) and Delete (`DELETE`).
- Passwords are hashed with bcrypt before saving, so the original password is not stored.
- `.env` keeps configuration and secrets outside source code.

Note: this tutorial's login/logout endpoints demonstrate password checking, but they do not create a real authenticated session. A production application would add sessions or JWTs and protect post routes.

## Tutorial

[Intro to Backend Web Development – Node.js & Express Tutorial for Beginners](https://www.youtube.com/watch?v=KOutPbKc9UM)
