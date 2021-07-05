import { request } from "./request"

export function getDetail(iid) {
  return request({
    url: '/detail',
    params: {
      iid
    }
  })
}

export function getRecommed() {
  return request({
    url: '/recommend'
  })
}

export class goodsInfo {
  constructor(itemInfo, columns, services) {
    this.title = itemInfo.title
    this.desc = itemInfo.desc
    this.discountBgColor = itemInfo.discountBgColor
    this.discountDesc = itemInfo.discountDesc
    this.price = itemInfo.lowNowPrice
    this.oldPrice = itemInfo.oldPrice
    this.columns = columns
    this.services = services
    this.realPrice = itemInfo.lowNowPrice
  }
}

export class shopInfo {
  constructor(shopInfo) {
    this.logo = shopInfo.shopLogo
    this.name = shopInfo.name
    this.fans = shopInfo.cFans
    this.sells = shopInfo.cSells
    this.score = shopInfo.score
    this.goodsCount = shopInfo.cGoods
    this.link = shopInfo.allGoodsUrl
  }
}

export class GoodsParam {
  constructor(info, rule) {
    this.images = info.images ? info.images : ''
    this.infos = info.set
    this.sizes = rule.tables[0]
  }
}
