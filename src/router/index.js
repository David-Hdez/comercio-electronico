import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Category from '../views/Category.vue'
import Cookies from 'js-cookie'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/iniciar-sesion',
    name: 'login',
    component: Login
  },
  {
    path: '/registro',
    name: 'register',
    component: Register
  },
  {
    path: '/:category',
    component: Category
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach(async (to, from) => {
  if (Cookies.get('jwt') !== undefined && (to.name == 'login' || to.name == 'register')) {
    return { name: 'home' }
  }
})

export default router
