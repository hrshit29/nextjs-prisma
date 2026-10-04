
const {client} = require('./packages/prisma/dist/index.js');
client.user.create({ data: { username: 'harhsit2', password: 'password' } })
  .then(console.log)
  .catch(console.error)
  .finally(() => client.$disconnect());
