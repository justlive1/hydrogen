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

  import {Toast} from 'mint-ui';

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
            this.$eventBus.createEventBus(res.data.data, this.username);

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
      }

    }
  }
</script>

<style scoped>

</style>