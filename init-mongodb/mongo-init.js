db.auth('root', '12345');

db.createUser({
    user: 'gsbv',
    pwd: 'gsbv',
    roles: [
        {
            role: 'root',
            db: 'gsbv',
        },
    ],
});

db = db.getSiblingDB('gsbv');

db.createCollection('users');

db.users.insertOne([
    {
        username: 'root',
        password: '$2b$10$4bMeCqR9uOAnfqw4NUW0SOX65xjm28veObBpkQOI7iuq7GLMfltaS',
        userType: '4'
    }
]);