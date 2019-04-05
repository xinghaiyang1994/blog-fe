// 全局过滤器
import day from 'dayjs'

const filters = {
  dateTime (value) {
    return day(value).format('YYYY年MM月DD日 HH:mm:ss')
  },
  limit (txt, number = 10) {
    return txt.length > number ? txt.slice(0, number) + '...' : txt
  }
}

export default function (Vue) {
  for (let key in filters) {
    Vue.filter(key, filters[key])
  }
}

