import axios from "axios"

export function require(config) {
  const instance = axios.create({
    baseURL: 'http://152.136.185.210:7878/api/m5',
    timeout: 5000
  })

  // 拦截器
  // instance.interceptors.request.use(config => {
  //   console.log(config);
  //   return config
  // }, error => {
  //   console.log(error);
  // })
  // instance.interceptors.response.use(result => {
  //   console.log(result)
  //   return result
  // }, error => {

  // })

  // 发送网络请求
  return instance(config)
}
