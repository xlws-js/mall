import {
  ADD_COUNTER,
  ADD_TO_CART} from './mutations-type'

export default {
  addCart({state, commit}, payload) {
    // pop shift unshif push reduce includes filter map find findIndex indexOf lastindexOf concat sort reverse slice splice forEach some every join
    return new Promise(( resolve, reject ) => {
      let oldProduct = state.cartList.find(item => item.iid == payload.iid)

      if (oldProduct) {
        commit(ADD_COUNTER, oldProduct)
        resolve("当前商品数量+1")
      } else {
        commit(ADD_TO_CART, payload)
        resolve('添加了新的商品')
      }
    })
  }
}
