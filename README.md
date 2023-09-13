# GSBVentory Backend
- npm run dev
- brew services start mongodb-community@7.0

## Env
- `JWT_TOKEN`
- `PORT` (default 3000)
- `DB_URL`

## db
- `use gsbv`
- `db.createUser({ user: "gsbv", pwd: "gsbv", roles:["dbAdmin"]})`
- `db.users.insertOne({username: "john", password: "$2y$10$ZiVn1Phi9H5yYAPO34VL9e/Hi1edPXU5QGtP/nmRAkG8ETv/Pkqiy", userType: 4})`