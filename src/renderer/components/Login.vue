<template>

</template>

<script>

  import EventBus from 'vertx3-eventbus-client'

  const options = {
    vertxbus_ping_interval: 5000,
    vertxbus_reconnect_attempts_max: Infinity,
    vertxbus_reconnect_delay_min: 1000,
    vertxbus_reconnect_delay_max: 5000,
    vertxbus_reconnect_exponent: 2,
    vertxbus_randomization_factor: 0.5
  };

  const eb = new EventBus('http://localhost:8090/eventbus', options);
  window.eb = eb
  eb.enableReconnect(true);

  eb.onopen = function () {

    eb.registerHandler('im.server', function (error, message) {
      console.log('received a message: ' + JSON.stringify(message));
    });

    // send a message
    eb.send('im.test', {name: 'tim', age: 587});

  };

  eb.onerror = function (err) {
    console.log(err)
  }

  export default {
    name: "login"
  }
</script>

<style scoped>

</style>