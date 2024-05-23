import Vue from 'vue';
import App from './App.vue';
import Meta from "vue-meta";
import router from "@/route";
import store from './store';
import 'bootstrap';
import AOS from 'aos';

import CoolLightBox from 'vue-cool-lightbox';
import 'vue-cool-lightbox/dist/vue-cool-lightbox.min.css';
import { Vuelidate } from "vuelidate";
//= ========= ALl Plugin and Component  ============//
import {
  LayoutPlugin,
  ImagePlugin,
  ToastPlugin,
  ModalPlugin,
  BootstrapVueIcons,
  NavbarPlugin,
  LinkPlugin,
  CardPlugin,
  ButtonPlugin,
  ButtonGroupPlugin,
  TabsPlugin,
  TablePlugin,
  BreadcrumbPlugin,
  FormDatepickerPlugin,
  FormSelectPlugin,
  FormPlugin,
  FormInputPlugin,
  FormGroupPlugin,
  PaginationPlugin,
  FormTextareaPlugin,
  FormCheckboxPlugin,
} from 'bootstrap-vue';

// import { mapActions, mapGetters } from 'vuex';
import Toast from "vue-toastification";
// import { api } from "@core/config";
//= ========= ALl Declare Usage Plugin and Component ============//
Vue.use(Meta);
Vue.use(LayoutPlugin);
Vue.use(NavbarPlugin);
Vue.use(ImagePlugin);
Vue.use(LinkPlugin);
Vue.use(ToastPlugin);
Vue.use(ModalPlugin);
Vue.use(CardPlugin);
Vue.use(ButtonPlugin);
Vue.use(ButtonGroupPlugin);
Vue.use(TabsPlugin);
Vue.use(BootstrapVueIcons);
Vue.use(TablePlugin);
Vue.use(BreadcrumbPlugin);
Vue.use(FormDatepickerPlugin);
Vue.use(FormSelectPlugin);
Vue.use(FormPlugin);
Vue.use(FormInputPlugin);
Vue.use(FormGroupPlugin);
Vue.use(PaginationPlugin);

Vue.use(FormTextareaPlugin);
Vue.use(FormCheckboxPlugin);
Vue.use(AOS);

Vue.use(CoolLightBox);
Vue.use(Vuelidate);
Vue.use(Toast, {
  transition: "Vue-Toastification__slideBlurred",
  maxToasts: 20,
  newestOnTop: true,
  position: "top-right",
  timeout: 5000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: false,
  closeButton: "button",
  icon: true,
  rtl: false,
});

//= ========= ALl Style Main and Customize ============//
import './assets/scss/app.scss';
import 'aos/dist/aos.css';
import "vue-toastification/dist/index.css";
//= ========= Vue Render to Html ============//
new Vue({
  data: {
    loading: false,
    general: {
      settings: {},
      locales: {},
      menus: {},
    },
    appLoading: document.getElementById('loading-bg'),
  },
  computed: {
    // ...mapGetters(['settings', 'locales', 'translates']),
  },
  metaInfo: {
    title: 'Home',
    // all titles will be injected into this template
    titleTemplate: '%s | ' + 'testing-app',
    meta: [
      {
        vmid: 'description',
        name: 'description',
        content: 'testing-app .',
        id: 'description',
      },
    ],
  },
  methods: {
    // ...mapActions(['fetchTranslates', 'fetchSettings', 'fetchLocals']),
    setLocaleTtoLocaleStorage(locale) {
      if (localStorage.getItem('_locale')) {
        localStorage.removeItem('_locale');
      }
      localStorage.setItem('_locale', JSON.stringify(locale));
    },
    _loading() {
      const appLoading = document.getElementById('loading-bg');
      
      if (this.loading) {
        appLoading.style.display = 'block';
      } else {
        appLoading.style.display = 'none';
      }
    },
  },
  created() {
  },

  watch: {
    $route(to, from) {
      if (from.params.locale && to.params.locale !== from.params.locale) {
        this.fetchLocals({
          locale: to.params.locale,
        }).then(() => {
          this.general.locales = this.locales;
          this.setLocaleTtoLocaleStorage(this.general.locales.currentActive);
        });
        this.fetchTranslates({
          filter: {
            locale: to.params.locale,
          },
        });
      }
    },
  },
  router,
  store,
  render: (h) => h(App),
  // mounted() {
  //   AOS.init()
  // },
}).$mount('#app');

