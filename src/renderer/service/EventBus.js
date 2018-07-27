import EventBus from 'vertx3-eventbus-client';
import {Toast} from 'mint-ui';
import conf from '../../../config/conf'

const state = {
  eventBus: null,

  createEventBus(token, username) {

    if (state.eventBus && state.eventBus.close) {
      state.eventBus.close();
    }
    const eb = new EventBus(conf.imServerUrl + "?_token=" + token, {
      vertxbus_ping_interval: 5000,
      vertxbus_reconnect_attempts_max: Infinity,
      vertxbus_reconnect_delay_min: 1000,
      vertxbus_reconnect_delay_max: 5000,
      vertxbus_reconnect_exponent: 2,
      vertxbus_randomization_factor: 0.5
    });

    eb.enableReconnect(true);
    eb.onopen = function () {
      eb.registerHandler('im.user.' + username, function (error, message) {
        console.log('received a message: ' + JSON.stringify(message));
      });
      state.eventBus = eb;
      state.sendMsg(200);
    };

    eb.onerror = function (err) {
      console.log(err);
    };

    eb.onclose = function (err) {
      console.log(err);
    };
  },

  sendMsg(code, data) {
    if (state.eventBus != null) {
      state.eventBus.send('im.server', {code: code, data: data});
    } else {
      Toast({
        message: '网络连接失败，请重新登录！'
      });
    }
  }
}

export default state;
