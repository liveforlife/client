import { baseURL } from './api'

export default function (url, param) {
  let paramStr = ''
  for (const k in param) {
    paramStr += `&${k}=${param[k]}`
  }
  paramStr = paramStr.substr(1)
  const el = document.createElement('a')
  document.body.appendChild(el)
  el.href = `${baseURL}${url}?${paramStr}`
  el.click()
  document.body.removeChild(el)
}
