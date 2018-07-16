<template>
  <div class="login-main">
    <div class="login-header">

    </div>
    <div class="login-body">
      <mt-field label="账号" placeholder="请输入账号" v-model="username"></mt-field>
      <mt-field label="密码" placeholder="请输入密码" type="password" v-model="password"></mt-field>
      <mt-button size="large" type="primary" @click="login">登录</mt-button>
    </div>
    <div class="login-footer">

    </div>
  </div>
</template>

<script>

  import EventBus from 'vertx3-eventbus-client';
  import {Toast} from 'mint-ui';

  const options = {
    vertxbus_ping_interval: 5000,
    vertxbus_reconnect_attempts_max: Infinity,
    vertxbus_reconnect_delay_min: 1000,
    vertxbus_reconnect_delay_max: 5000,
    vertxbus_reconnect_exponent: 2,
    vertxbus_randomization_factor: 0.5
  }

  export default {

    name: "login",

    data() {
      return {
        username: '',
        password: ''
      }
    },

    created: function () {
    },

    methods: {

      login: function () {
        const _this = this
        if (this.username && this.password) {
          this.$http.post(this.$conf.httpServerUrl + "/login",
              {username: this.username, password: this.password}).then(res => {
            _this.createEventBus(res.data.data, 1);

          }).catch(err => {
            console.log(err);
            Toast({
              message: '账号或密码有误！'
            });
          })
        } else {
          Toast({
            message: '请输入账号和密码！'
          });
        }
      },

      register: function () {
        // TODO
      },

      createEventBus: function (token, userId) {
        if (this.eb && this.eb.close) {
          this.eb.close();
        }
        const eb = new EventBus(this.$conf.imServerUrl + "?_token=" + token, options);
        const _this = this;
        _this.eb = eb;
        eb.enableReconnect(true);
        eb.onopen = function () {
          eb.registerHandler('im.user.' + userId, function (error, message) {
            console.log('received a message: ' + JSON.stringify(message));
          });

          _this.sendMsg({a: 1, b: 2});
        };

        eb.onerror = function (err) {
          console.log(err);
        };

        eb.onclose = function (err) {
          console.log(err);
        };

      },

      sendMsg: function (msg) {
        if (this.eb != null) {
          this.eb.send('im.server', msg);
        } else {
          Toast({
            message: '网络连接失败，请重新登录！'
          });
        }
      }
    }

  }
</script>

<style scoped>

</style>