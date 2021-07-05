import {
  ADD_COUNTER,
  ADD_TO_CART
} from './mutations-type'

export default {
  [ADD_COUNTER](state, payload) {
    payload.count++
  },

  [ADD_TO_CART](state, payload) {
    payload.count = 1
    payload.isChecked = true
    state.cartList.push(payload)
  }
}
