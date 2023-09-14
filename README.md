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
- `db.hardwares.insertOne({"type": "laptop", "buyDate": new Date("2022-01-12"), "serialNumber": "AZQSWX12", "manufacturer": "Dell", "model": "Lattitude", "endOfWarrantyDate": new Date("2024-01-11"), "internalId": "LA2022010001", "note": "i5-12400F, 16GB Ram, 512 NVMe"});`

## Logging in
```shell
curl --location 'http://localhost:3000/login' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'password=a' \
--data-urlencode 'username=john'
```

Returns a JWT in json under property `token`. To use it request any private endpoint with header `Authorization: XXX`.