import { Fetch, Utils } from '../utils/index'
import { apiUrl, devFlag } from '../config.js'


// 获取左侧人员信息
var getPersonInfo = payload => Fetch('POST',apiUrl + 'getPersonInfo',payload)

// 获取人员轨迹信息
var getTrackInfo = payload => Fetch('POST',apiUrl + 'getTrackInfo',payload)

//获取表格信息（管控、预警等）
var getCWSInfo = payload => Fetch('POST',apiUrl + 'getCWSInfo',payload)

//获取人员电话信息
var getPhoneInfo = payload => Fetch('POST',apiUrl + 'getPhoneInfo',payload)

//导入话单/短信
var uploadKeyPeopleDetailsUrl = apiUrl + 'uploadPhone'

//导出话单/短信
var exportPhoneMes = payload => Fetch('POST',apiUrl + 'exportPhone',payload)

export {
    getPersonInfo,
    getTrackInfo,
    getCWSInfo,
    getPhoneInfo,
    uploadKeyPeopleDetailsUrl,
    exportPhoneMes,
}
