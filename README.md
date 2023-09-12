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