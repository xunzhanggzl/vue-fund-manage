import axios from 'axios';
// 这是在.js文件中，需要引入，与 Register.vue 中的 this.$message 作对比
import { Message,Loading } from 'element-ui';
let loading;
function startLoading() {
  loading = Loading.service({
    lock: true,
    text: "加载中...",
    background: 'rgba(0,0,0,0.7)'
  });
}

function endLoading() {
  loading.close();
}

// 请求拦截
axios.interceptors.request.use(config => {
  // 加载动画
  startLoading();
  return config;
}, error => {
  return Promise.reject(error);
})

// 响应拦截
axios.interceptors.response.use((response) => {
  // 结束加载动画
  endLoading();
  return response;
}, (error) => {
  endLoading();
  Message.error(error.response.data);
  return Promise.reject(error);
});

export default axios;