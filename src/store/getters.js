export default {
  cartLength(state) {
    return state.cartList.length
  },

  cartList(state) {
    let arr = [...state.cartList]
    return arr.reverse()
  }
}
