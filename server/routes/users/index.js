const { getUsers, getUser, getUserByEmail } = require('../../src/db/user_queries');
const { getRecipesForUser } = require('../../src/db/recipe_queries');



const usersRoute = async (fastify) => {
  fastify.get('/users', async (req, reply) => {
    const rows = await getUsers(fastify);
    reply.send(rows);
  })

  fastify.get('/users/:id', async (req, reply) => {

    // getUser(fastify, req.params.id)
    // .then((rows) => {
    //   reply.send(rows);
    // })

    const rows = await getUser(fastify, req.params.id);
    reply.send(rows);
  })

  fastify.post('/login', async (req, reply) => {
    console.log('login details:', req.body); // shows username and password

    const user = await getUserByEmail(fastify, req.body.email);

    if (user.length === 0) {
      console.log('no user found');
      reply.send({error: 'Invalid email.'});
      return;
    }

    console.log('found this user:', user[0]);

    if (user[0].password !== req.body.password) { // TODO: hash the passwords at the very least
      console.log('bad password');
      reply.send({error: 'Invalid Password.'});
      return;
    }
    
    console.log('good password');
    reply.send({
      user: {...user[0], password: null},
      token: user[0].id,
    });
  })

  fastify.get('/users/:id/recipes', async (req, reply) => {
    console.log('fetching user recipes for', req.params.id);
    console.log(req);

    // TODO: check Authorization header somehow
  
    const rows = await getRecipesForUser(fastify, req.params.id);
  
    console.log('rows:', rows);
  
    reply.send({recipes: rows});

  })
}

module.exports = usersRoute
