# Week 2 Express API

Simple Express API with the following endpoints:

- `GET /` -> returns "My Week 2 API!"
- `POST /user` -> accepts JSON `{ name, email }`, responds with `Hello, {name}!` (400 if missing)
- `GET /user/:id` -> returns `user[id] profile`

Setup

```bash
cd /home/it/Desktop/express_API
npm install
npm start
```

Examples

```bash
# root
curl http://localhost:3000/

# create user
curl -X POST http://localhost:3000/user -H "Content-Type: application/json" -d '{"name":"Alice","email":"a@example.com"}'

# get user
curl http://localhost:3000/user/123
```
# express-api
# express-api
