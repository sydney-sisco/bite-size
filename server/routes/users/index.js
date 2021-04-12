const { getUsers, getUser, getUserByEmail } = require('../../src/db/user_queries');


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

    console.log(user[0]);

    if (user[0].password !== req.body.password) { // TODO: hash the passwords at the very least
      console.log('bad password');
      reply.send({error: 'Invalid Password.'});
      return;
    }
    
    console.log('good password');
    reply.send({token: user[0].id});
  })

  fastify.get('/test-session', (request, reply) => {
    const data = request.session.get('data')
    console.log('session:', data);
    if (!data) {
      reply.code(404).send()
      return
    }
    reply.send(data)
  })
  
  fastify.post('/logout', (request, reply) => {
    request.session.delete()
    reply.send('logged out')
  })
}

module.exports = usersRoute
