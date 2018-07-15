<template>
  <div class="login">
    <div class="loginBox">
      <ul>
        <li>
          <span class="loginSpan">账号:</span>
          <input class="form-control" placeholder="请输入账号" v-model="username"/>
        </li>
        <li>
          <span class="loginSpan">密码:</span>
          <input type="text" class="form-control" placeholder="请输入密码" v-model="password"
                 ref="pwdInput"/>
        </li>
        <li class="buttonLi">
          <div class="loginSubmit btn btn-default" @click="login">登录</div>
          <div class="registerSubmit btn btn-default" @click="register">去注册</div>
        </li>
      </ul>
    </div>
  </div>
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
    },

    methods: {

      login: function () {
        const _this = this
        if (this.username && this.password) {
          this.$http.post(this.$conf.httpServerUrl + "/login",
              {username: this.username, password: this.password}).then(res => {
            _this.createEventBus(res.data.data, 1);

          }).catch(err => {
            // TODO
            console.log(err)
          })
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

          _this.sendMsg({a: 1, b: 2})
        };

        eb.onerror = function (err) {
          console.log(err)
        }

        eb.onclose = function (err) {
          console.log(err)
        }

      },

      sendMsg: function (msg) {
        if (this.eb != null) {
          this.eb.send('im.server', msg);
        } else {
          // TODO
          throw new Error('eventbus is not inited');
        }
      }
    }

  }
</script>

<style scoped>

</style>