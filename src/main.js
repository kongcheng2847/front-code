import { createApp } from 'vue';

import ElementPlus from 'element-plus';
import zhCn from 'element-plus/dist/locale/zh-cn.mjs';
import { ElLoading } from 'element-plus';
import { ElMessage } from 'element-plus';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import 'element-plus/dist/index.css';

import './assets/style/global.css';

import VXETable from 'vxe-table';
import 'vxe-table/lib/style.css';

import App from './App.vue';
import router from './router';

import Http from '@/utils/Http';
import FileHttp from '@/utils/FileHttp';

const app = createApp(App);
app.config.globalProperties.$Http = Http;
app.config.globalProperties.$FileHttp = FileHttp;
app.config.globalProperties.$Message = ElMessage;
app.config.globalProperties.$Loading = ElLoading;
// 给 vue 实例挂载内部对象
app.config.globalProperties.$VXETable = VXETable;
app.config.globalProperties.$XModal = VXETable.modal;

app.use(ElementPlus, { locale: zhCn });
app.use(VXETable, { zIndex: 3000 });
app.use(router);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app.mount('#app');
