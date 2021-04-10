<script>
  import axios from "axios";

  let name = 'world';

  let user = {};

  // Make a request for a user with a given ID
  axios.get('/api/users/13')
    .then(function (response) {
      // handle success
      console.log(response.data[0]); // log the user data

      name = response.data[0].username; // save user name 

      user = {...response.data[0]}; // save entire user object
    })
    .catch(function (error) {
      // handle error
      console.log('the error is:',error);
    })
    .then(function () {
      // always executed
    });
</script>

<!-- test output -->
<h2>Hello {name}</h2>

<p>id: {user.id}</p>
<p>email: {user.email_address}</p>
<p>password: {user.password}</p>
