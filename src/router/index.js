import { createRouter, createWebHistory } from 'vue-router'
import LandingView from '../views/LandingView.vue'
import LoginView from '../views/LoginView.vue'
import LayoutView from '../views/admin/LayoutView.vue'
import HomeView from '../views/admin/HomeView.vue'
import OrphanView from '../views/admin/OrphanView.vue'
import ServerErrorView from '../views/errors/ServerErrorView.vue'
import PageNotFound from '../views/errors/PageNotFound.vue'
import { useAuthUserStore } from "@/stores/auth";
import { storeToRefs } from "pinia";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'landing',
      component: LandingView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/admin',
      name: 'admin',
      component: LayoutView,
      meta: { requiresAuth: true },
      children: [
        {
          path: 'home',
          name: 'admin.home',
          component: HomeView,
          meta: { requiresAuth: true },
        },
        {
          path: 'orphan/:id',
          name: 'admin.orphan',
          component: OrphanView,
          meta: { requiresAuth: true },
        },
      ]
    },
    {
      path: '/server-error',
      name: '500',
      component: ServerErrorView
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'pageNotfound',
      component: PageNotFound
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 }
  }
})

router.beforeEach((to, from, next) => {

  const store = useAuthUserStore();
  const { authStatus } = storeToRefs(store);
  const { authCheck } = store;
  authCheck();

  let requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !authStatus.value) {
    next({
      path: '/login',
      query: {
        redirect: to.fullpath
      }
    })
  } else if (!requiresAuth && authStatus.value && to.name == 'login') {
    next({
      path: '/admin/home'
    })
  } else {
    next();
  }


})

export default router
