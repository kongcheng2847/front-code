import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const routes = [
  {
    path: '/',
    redirect: '/base',
    component: HomeView,
    children: [
      {
        path: '/base',
        name: 'base',
        component: () => import('../views/BaseView.vue')
      },
      {
        path: '/work',
        name: 'work',
        component: () => import('../views/WorkView.vue'),
        children: [
          {
            path: '/control',
            name: 'control',
            component: () => import('../views/control/ControlView.vue')
          },
          {
            path: '/sys',
            name: 'sys',
            children: [
              {
                path: '/sys/menu',
                name: 'menu',
                component: () => import('../views/sys/menu/MenuView.vue')
              },
              {
                path: '/sys/dict',
                name: 'dict',
                component: () => import('../views/sys/dict/DictView.vue')
              },
              {
                path: '/sys/file',
                name: 'file',
                component: () => import('../views/sys/file/FileView.vue')
              }
            ]
          },
          {
            path: '/trade',
            name: 'trade',
            children: [
              {
                path: '/trade/stock',
                name: 'stock ',
                component: () => import('../views/trade/stock/StockView.vue')
              }
            ]
          }
        ]
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
