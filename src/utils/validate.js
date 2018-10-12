// 对象是否为空
export function isEmptyObj (obj) {
  for (const name in obj) {
    return false
  }
  return true
}
// 只判断两个值对应相等，不包含引用
export function isEqual (a, b) {
  if (JSON.stringify(a) !== JSON.stringify(b)) {
    return false
  }
  return true
}
