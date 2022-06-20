import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false

// import firebase from 'firebase/app';
// import 'firebase/storage';
// import 'firebase/firestore';

// const firebaseConfig = {
//   apiKey: "AIzaSyA2ZIlLIKxSRLJzQOqMUqjL3fe0-U5bqkY",
//   authDomain: "jutz-7cb30.firebaseapp.com",
//   projectId: "jutz-7cb30",
//   storageBucket: "jutz-7cb30.appspot.com",
//   messagingSenderId: "364642752676",
//   appId: "1:364642752676:web:ec897d5edda67562bf2e31",
//   measurementId: "G-5DHTCG3NNE"
// };

// export const db = firebase
//     .initializeApp(firebaseConfig)
//     .firestore()

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
