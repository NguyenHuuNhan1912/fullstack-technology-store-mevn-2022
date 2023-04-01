import { createApp } from 'vue'
import App from './App.vue'

// SweetAlert
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
// Fontawesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import {fab} from '@fortawesome/free-brands-svg-icons'
import {far} from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(fas, fab, far);
// Aos style
import 'aos/dist/aos.css';
// Router
import router from './router';

const app = createApp(App);
app.use(router);
app.use(VueSweetalert2);
app.component('font-awesome-icon', FontAwesomeIcon);
app.mount('#app');
