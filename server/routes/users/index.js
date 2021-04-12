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
    const user = await getUserByEmail(fastify, req.body.email);

    if (user.length === 0) {
      reply.send({error: 'Invalid email.'});
      return;
    }

    if (user[0].password !== req.body.password) { // TODO: hash the passwords at the very least
      reply.send({error: 'Invalid Password.'});
      return;
    }
    
    reply.send({
      user: {...user[0], password: null},
      token: user[0].id,
    });
  })

  fastify.get('/users/:id/recipes', async (req, reply) => {
    
    // TODO: check Authorization header somehow
  
    const rows = await getRecipesForUser(fastify, req.params.id);
  
    reply.send({recipes: rows});
  })
}

module.exports = usersRoute
