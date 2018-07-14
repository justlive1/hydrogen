<template>

</template>

<script>

  import EventBus from 'vertx3-eventbus-client';

  const options = {
    vertxbus_ping_interval: 5000,
    vertxbus_reconnect_attempts_max: Infinity,
    vertxbus_reconnect_delay_min: 1000,
    vertxbus_reconnect_delay_max: 5000,
    vertxbus_reconnect_exponent: 2,
    vertxbus_randomization_factor: 0.5
  };


  function ebs(data) {
    if (window.eb != null && window.eb.close) {
      window.eb.close()
    }

    const eb = new EventBus('http://localhost:8080/eventbus?_token=' + data, options);

    window.eb = eb

    eb.enableReconnect(true);

    eb.onopen = function () {

      eb.registerHandler('im.server', function (error, message) {
        console.log('received a message: ' + JSON.stringify(message));
      });

      // send a message
      eb.send('im.client', {name: 'tim', age: 587});

    };

    eb.onerror = function (err) {
      console.log(err)
    }

    eb.onclose = function (err) {
      console.log(err)
    }
  }

  export default {
    name: "login",
    data() {
      return {
        username: 'user',
        password: '123456'
      }
    },
    created: function () {
      this.login()
    },
    methods: {
      login: function () {
        this.$http.post("http://localhost:8080/login",
            {username: this.username, password: this.password}).then()
      }
    }

  }
</script>

<style scoped>

</style>