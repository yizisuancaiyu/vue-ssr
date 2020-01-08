/**
 * 获取当前环境信息，如操作系统，浏览器，app等信息
 */

//const ua = navigator.userAgent.toLowerCase()
let ua
try {
  ua = navigator.userAgent.toLowerCase()
} catch (error) {
  ua = 'window'
}
// 项目配置信息
export function getDevEnv() {
  return process.env.DEV_ENV || ''
}
// 项目配置信息
export function getProjectConf() {
  return process.env.PROJECT_CONF
}

export function getEnv() {
  // 服务器环境类型
  const servers = ['192', 'dev', 'sit', 'uat']
  let hostArr
  try {
    hostArr = location.hostname.split('.')
  } catch (error) {
    hostArr = [process.env.DEV_ENV]
  }

  let type = servers.find(item => hostArr.some(hostItem => hostItem === item)) || ''

  // 开发环境默认接口类型
  type = type === '192' ? 'dev' : type
  return type
}

export function uploadUrl() {
  const type = getEnv() ? getEnv() + '.' : ''
  return `https://multimedia.${type}qiuhui.com`
}

export function videoUrl() {
  const type = getEnv()
  return `//media.${type}.qiuhui.com`
}

// flv 视频协议地址
export function videoFlvUrl() {
  const type = getEnv()
  switch(type) {
  case 'dev':
  case 'sit':
    return 'https://cdn.sit.qiuhui.com/static/flv.min.js'
  case 'uat':
    return 'https://cdn.uat.qiuhui.com/static/flv.min.js'
  default:
    return 'https://cdn.qiuhui.com/static/flv.min.js'
  }
}

// hls 视频协议地址
export function videoHlsUrl() {
  const type = getEnv()
  switch(type) {
  case 'dev':
  case 'sit':
    return 'https://cdn.sit.qiuhui.com/static/hls.js'
  case 'uat':
    return 'https://cdn.uat.qiuhui.com/static/hls.js'
  default:
    return 'https://cdn.qiuhui.com/static/hls.js'
  }
}


// 判断是否在app中
export function isApp() {

}

// 判断是否在微信中
export function isWechat() {
  return ua.includes('micromessenger')
}

// android终端
export function isAndroid() {
  return ua.includes('android') || ua.includes('linux')
}

// ios终端
export function isIOS() {
  let iosReg = /\(i[^;]+;( U;)? CPU.+Mac OS X/i
  return iosReg.test(ua)
}

// 获取app版本号
export function getAppVersion() {

}

// 判断是否为pc客户端
export function isDevServer() {
  const { isDev } = getProjectConf()
  return location.hostname.search(/dev\./) > -1 || isDev
}

// 判断是否为pc客户端
export function isPc() {
  // let userAgentInfo = navigator.userAgent.toLocaleLowerCase()
  let userAgentInfo
  try {
    userAgentInfo = navigator.userAgent.toLowerCase()
  } catch (error) {
    userAgentInfo = 'window'
  }
  let Agents = [
    'android',
    'iphone',
    'symbianos',
    'windows phone',
    'ipad',
    'ipod'
  ]
  let flag = true
  for (let v = 0; v < Agents.length; v++) {
    if (userAgentInfo.indexOf(Agents[v]) > 0) {
      flag = false
      break
    }
  }
  return flag
}


/**
 * [getOs 获取当前系统及系统版本信息]
 * @return {object} [版本信息]
 * @example
 * {os: 'Safari', version: '10.1.1'}
 */
export function getOs() {
  // const ua = "Mozilla/5.0 (Intel android 6.0.1) AppleWebKit/603.2.4 (KHTML, like Gecko) Version/10.1.1 Safari/603.2.4".toLowerCase()

  let os = ''
  let version = ''

  // apple移动设备正则
  let appleMobileRe = /iphone|ipad|midp|ipod/

  // apple移动设备操作系统正则
  let appleOsMobileRe = /(iphone os.*?|ipad os.*?|midp os.*?|ipod os.*?)(\d+(.\d+)+)/

  // 监测是否为 apple移动设备
  let amb = ua.match(appleMobileRe)

  if (amb) {
    // 监测apple操作系统正则
    let am = ua.match(appleOsMobileRe)
    if (am) {
      os = am[1]
      version = am[2]
    } else {
      os = amb[0]
    }
  } else if (ua.match(/mac/)) {
    // mac
    let macRe = /(mac os.*?)(\d+(.\d+)+)/
    let mm = ua.match(macRe)
    if (mm) {
      os = mm[1]
      version = mm[2]
    }
    os = os || 'Mac'
  } else if (ua.match(/android/)) {
    // android
    let aRe = /(android).*?([\d.]+)/
    let andm = ua.match(aRe)
    if (andm) {
      os = andm[1]
      version = andm[2]
    }
    os = os || 'android'
  } else {
    // windows
    if (ua.match(/windows/)) {
      let wRe = /(windows nt).*?([\d.]+)/
      let wm = ua.match(wRe)
      if (wm) {
        os = wm[1]
        version = wm[2]
      }
      os = os || 'windows'
    }
  }

  os = os
    ? os.replace(/( os)|( nt)/i, '')
    : ''

  return {
    os: os || '',
    version: version || ''
  }
}

/**
 * getBrowserInfo 获取浏览器名称及版本信息
 * @return {object} [浏览器名称及版本信息]
 * @example
 * {os: 'Safari', version: '10.1.1'}
 */
export function getBrowserInfo() {
  let browser = ''
  let version = ''

  // 浏览器匹配名称与浏览器名称转换
  let exchangeObj = {
    'msie': 'IE',
    'trident': 'Edge',
    'micromessenger': 'Wechat'
  }

  let re = /(msie|trident|firefox|opera|mqqbrowser|ucbrowser|baiduboxapp|micromessenger).*?([\d.]+)/

  let m = ua.match(re)
  if (m) {
    browser = m[1]
    version = m[2]
  } else if (ua.match(/chrome/)) {
    // chrome
    let cm = ua.match(/(chrome).*?([\d.]+)/)
    if (cm) {
      browser = cm[1]
      version = cm[2]
    }
  } else {
    // safari
    let sm = ua.match(/(version).*?([\d.]+)/)
    if (sm && ua.match(/safari/)) {
      browser = 'safari'
      version = sm[2]
    }
  }

  browser = browser
    ? (exchangeObj[browser] || browser)
    : ''
  version = version
    ? version
    : ''

  return { browser: browser, version }
}
