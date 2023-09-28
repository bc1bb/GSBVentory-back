//db.auth('root', '12345');

gsbdb = db.getSiblingDB('gsbv');

gsbdb.createCollection('hardwares');
gsbdb.createCollection('users');
gsbdb.createCollection('hardware_types');

gsbdb.createUser({
    user: 'gsbv',
    pwd: 'gsbv',
    roles: [
        {
            role: 'readWrite',
            db: 'gsbv',
        },
    ],
});

gsbdb.users.insertOne([
    {
        username: 'root',
        password: '$2b$10$4bMeCqR9uOAnfqw4NUW0SOX65xjm28veObBpkQOI7iuq7GLMfltaS',
        userType: '4'
    }
]);
