import axios from 'axios';
import { ElLoading } from 'element-plus';
import { ElMessage } from 'element-plus';

let instance = axios.create({
  baseURL: 'http://localhost:9002/',
  timeout: 1000
});

// 请求格式或参数的统一
const Http = async function (
  url,
  method,
  params, // 请求参数：get，post，put，patch，delete
  isFormData = false, // 标识是否为 form-data请求
  config = {}
) {
  let newParams = {};
  // 判断是否为form-data请求
  if (params && isFormData) {
    newParams = new FormData();
    for (let i in params) {
      newParams.append(i, params[i]);
    }
  } else {
    newParams = params;
  }
  // 不同请求的判断
  let response = {}; // 请求的返回值
  if (method === 'put' || method === 'post' || method === 'patch') {
    try {
      response = await instance[method](url, newParams, config);
    } catch (error) {
      response = error;
    }
  } else if (method === 'get' || method === 'delete') {
    config.params = newParams;
    try {
      response = await instance[method](url, newParams, config);
    } catch (error) {
      response = error;
    }
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
    return res.data;
  },
  error => {
    // 响应失败
    loadingInstance.close();
    ElMessage.error('请求失败，请稍后重试！');
  }
);

export default Http;
