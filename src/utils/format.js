// 数据格式化
import format from 'date-fns/format'

export function formatDateTime (timestamp) {
  return timestamp && format(timestamp, 'YYYY-MM-DD HH:mm:ss')
}

export function formatDateMin (timestamp) {
  return timestamp && format(timestamp, 'YYYY-MM-DD HH:mm')
}

export function formatDate (timestamp) {
  return timestamp && format(timestamp, 'YYYY-MM-DD')
}

export function formatDate2 (timestamp) {
  let day = timestamp.getDay()
  let weeks = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
  let week = weeks[day]
  let ymd = format(timestamp, 'YYYY-MM-DD')
  let hm = format(timestamp, 'HH:mm')
  let date = ymd + '，' + week + '，' + hm
  return date
}

export function getTime () {
  var dateObj = new Date()

  var y = dateObj.getFullYear()
  var m = dateObj.getMonth() + 1
  var d = dateObj.getDate()
  var day = dateObj.getDay()
  var weeks = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
  var week = weeks[day]
  var h = dateObj.getHours()
  var min = dateObj.getMinutes()

  if (m < 10) {
    m = '0' + m
  }
  if (d < 10) {
    d = '0' + d
  }
  if (h < 10) {
    h = '0' + h
  }
  if (min < 10) {
    min = '0' + min
  }

  var newDate = y + '-' + m + '-' + d + ' ' + h + ':' + min + ' ' + week
  return newDate
}

export function changeMoneyToChinese (money) {
  // 汉字的数字
  var cnNums = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖']
  // 基本单位
  var cnIntRadice = ['', '拾', '佰', '仟']
  // 对应整数部分扩展单位
  var cnIntUnits = ['', '万', '亿', '兆']
  // 对应小数部分单位
  var cnDecUnits = ['角', '分', '毫', '厘']
  // var cnInteger = '整' //整数金额时后面跟的字符
  // 整型完以后的单位
  var cnIntLast = '元'
  // 最大处理的数字
  var maxNum = 999999999999999.9999
  // 金额整数部分
  var IntegerNum
  // 金额小数部分
  var DecimalNum
  // 输出的中文金额字符串
  var ChineseStr = ''
  // 分离金额后用的数组，预定义
  var parts = []
  if (money === '') {
    return ''
  }
  money = parseFloat(money)
  if (money >= maxNum) {
    alert('超出最大处理数字')
    return ''
  }
  if (money === 0) {
    ChineseStr = cnNums[0] + cnIntLast
    return ChineseStr
  }
  // 转换为字符串
  money = money.toString()
  if (money.indexOf('.') === -1) {
    IntegerNum = money
    DecimalNum = ''
  } else {
    parts = money.split('.')
    IntegerNum = parts[0]
    DecimalNum = parts[1].substr(0, 4)
  }
  if (parseInt(IntegerNum, 10) > 0) {
    // 获取整型部分转换
    var zeroCount = 0
    const IntLen = IntegerNum.length
    for (let i = 0; i < IntLen; i++) {
      const n = IntegerNum.substr(i, 1)
      const p = IntLen - i - 1
      const q = p / 4
      const m = p % 4
      if (n === '0') {
        zeroCount++
      } else {
        if (zeroCount > 0) {
          ChineseStr += cnNums[0]
        }
        zeroCount = 0 // 归零
        ChineseStr += cnNums[parseInt(n)] + cnIntRadice[m]
      }
      if (m === 0 && zeroCount < 4) {
        ChineseStr += cnIntUnits[q]
      }
    }
    ChineseStr += cnIntLast
    // 整型部分处理完毕
  }
  if (DecimalNum !== '') {
    // 小数部分
    const decLen = DecimalNum.length
    for (let i = 0; i < decLen; i++) {
      const n = DecimalNum.substr(i, 1)
      if (n !== '0') {
        ChineseStr += cnNums[Number(n)] + cnDecUnits[i]
      }
    }
  }
  if (ChineseStr === '') {
    ChineseStr += cnNums[0] + cnIntLast
  }
  return ChineseStr
}

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
// 节流
export function throttle (method, duration) {
  let begin = new Date()
  return function () {
    const context = this
    const args = arguments
    const current = new Date()
    if (current - begin >= duration) {
      method.apply(context, args)
      begin = current
    }
  }
}

// 去抖
export function debounce (method, delay) {
  let timer = null
  return function () {
    const context = this
    const args = arguments
    clearTimeout(timer)
    timer = setTimeout(() => {
      method.apply(context, args)
    }, delay)
  }
}
export function clearCity (list) {
  list.forEach(i => {
    const leav1Childs = i.childs
    if (leav1Childs) {
      leav1Childs.forEach(j => {
        const leav2Childs = j.childs
        if (leav2Childs) {
          leav2Childs.forEach(k => {
            delete k.childs
          })
        }
      })
    } else {
      // delete list[i].childs
    }
  })
  return list
}
