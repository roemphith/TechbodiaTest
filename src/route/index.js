import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

const mainComponent = { template: "<router-view></router-view>" };
const locale = localStorage.getItem("_locale");

const routes = [
  {
    path: "/",
    redirect:
        locale && JSON.parse(locale)
            ? JSON.parse(locale).title
                ? JSON.parse(locale).title
                : "en"
            : "en",
  },
  {
    path: "/:locale",
    component: mainComponent,
    children: [
      {
        path: "",
        name: "Home",

          component: () => import("../views/home-new/Home.vue"), //new route
         //component: () => import("../views/home/Home.vue"),  //old route

      },
    ]
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.matched.some((m) => m.meta.disableScroll)) return;
    if (to.hash) {
      return {
        selector: to.hash,
        // , offset: { x: 0, y: 10 }
        behavior: "smooth",
      };
    }
    const position = {
      x: 0,
      y: 0,
    };

    if (savedPosition) {
      position.x = savedPosition.x;
      position.y = savedPosition.y;
    }

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(position);
      }, 400);
    });
  },
});

// check route that need authenticate
// router.beforeEach((to, from, next) => {
//   const appLoading = document.getElementById("loading-bg");
//   let locale = localStorage.getItem("_locale");
//   locale = locale ? JSON.parse(locale) : null;
//   if (appLoading) {
//     appLoading.style.display = "block";
//   }
//   if (to.params.locale && to.params.locale !== locale.title) {
//     next({ name: to.name, params: { locale: locale.title } });
//   }
//   next();
// });
// router.afterEach(() => {
//   // Remove initial loading
//   const appLoading = document.getElementById("loading-bg");
//   if (appLoading) {
//     appLoading.style.display = "none";
//   }
// });

export default router;
