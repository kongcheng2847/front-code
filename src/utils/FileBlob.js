import axios from 'axios';
import { ElLoading } from 'element-plus';
import { ElMessage } from 'element-plus';

let instance = axios.create({
  baseURL: 'http://localhost:9002/',
  timeout: 20000
});

// 请求格式或参数的统一
const FileBlob = async function (url, params) {
  let response = {}; // 请求的返回值
  try {
    response = await instance['post'](url, params, {
      responseType: 'blob'
    });
  } catch (error) {
    response = error;
  }
  return response;
};

// 请求拦截器
const loadingInstance = ElLoading.service({
  lock: true,
  text: '加载中...',
  background: 'rgba(0, 0, 0, 0.7)'
});
instance.interceptors.request.use(
  config => {
    // 发起请求前
    return config;
  },
  error => {
    // 请求错误
    loadingInstance.close();
    ElMessage.error('请求失败，请稍后重试！');
  }
);

// 响应拦截器
instance.interceptors.response.use(
  res => {
    // 响应成功
    loadingInstance.close();
    return res;
  },
  error => {
    // 响应失败
    loadingInstance.close();
    ElMessage.error('请求失败，请稍后重试！');
  }
);

export default FileBlob;
