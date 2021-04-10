<script>
  import axios from "axios";

  let name = 'world';

  // let user = {};

  // Make a request for a user with a given ID
  axios.get('/api/users/10')
    .then(function (response) {
      // handle success
      console.log(response.data[0]);

      name = response.data[0].username;

      // user = {...response.data[0]};
    })
    .catch(function (error) {
      // handle error
      console.log('the error is:',error);
    })
    .then(function () {
      // always executed
    });
</script>

<h2>Hello {name}</h2>
