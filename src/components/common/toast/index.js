import Toast from './Toast.vue'

const toastObj = {}

toastObj.install = (Vue) => {
  // 创建toast组件构造器
  const toastconstructor = Vue.extend(Toast)
  // 实例化组件对象
  const toast = new toastconstructor()
  // 手动挂在对象
  toast.$mount(document.createElement("div"))

  document.body.appendChild(toast.$el)
  Vue.prototype.$toast = toast
}

export default toastObj
