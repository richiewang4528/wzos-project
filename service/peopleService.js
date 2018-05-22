import { Fetch, Utils } from '../utils/index.js'
import { apiUrl, devFlag } from '../config.js'

import * as keyPeopleList from './jsondata/keyPeopleList'
import * as taskList from './jsondata/taskList'
import * as customColumn from './jsondata/customColumn'
import * as selections from './jsondata/selections'

//使用真实数据
if (devFlag) {
	/**
	 * 获得所有重点人员
	 */
	var getKeyPeopleList = payload => Fetch('POST', apiUrl + 'getPerson', payload)
	/**
	 * 获得已分配任务重点人员
	 */
	var getKeyPeopleAssignedList = payload => Fetch('POST', apiUrl + 'getAssignedList', payload)
	/**
	 * 获得未分配任务重点人员
	 */
	var getKeyPeopleNonAssignedList = payload => Fetch('POST', apiUrl + 'getUnAssignedList', payload)
	/**
	 * 获得待审核重点人员
	 */
	var getKeyPeopleAuditList = payload => Fetch('POST', apiUrl + 'getPendingAuditList', payload)
	/**
	 * 获得待入库审核重点人员
	 */
	var getKeyPeopleStorageList = payload => Fetch('POST', apiUrl + 'getPerson', payload)
	/**
	 * 获得待审批重点人员
	 */
	var getKeyPeopleApprovalList = payload => Fetch('POST', apiUrl + 'getPendingApprovalList', payload)
	/**
	 * 获得未通过审核审批重点人员
	 */
	var getKeyPeopleNoAuditApprovalList = payload => Fetch('POST', apiUrl + 'getNotPassAuditApprovalList', payload)
	/**
	 * 保存更新重点人员
	 */
	var saveKeyPeople = payload => Fetch('POST', apiUrl + 'addKeyPeople', payload)
	/**
	 * 分配任务到人
	 */
	var assignTaskToPeople = payload => Fetch('POST', apiUrl + 'assignTaskToPeople', payload)
	/**
	 * 保存更新重点人员
	 */
	var updateKeyPeople = payload => Fetch('POST', apiUrl + 'updateKeyPeople', payload)
	/**
	 * 重点人员通过入库审核
	 */
	var passAuditStorageKeyPeople = payload => Fetch('POST', apiUrl + 'passAuditInStorage', payload)
	/**
	 * 重点人员通过任务审核
	 */
	var passAuditTaskKeyPeople = payload => Fetch('POST', apiUrl + 'passAuditAtTask', payload)
	/**
	 * 重点人员通过审批
	 */
	var passApprovalKeyPeople = payload => Fetch('POST', apiUrl + 'passApproval', payload)
	/**
	 * 重点人员未通过审批
	 */
	var changeNotPassReason = payload => Fetch('POST', apiUrl + 'changeNotPassReason', payload)
	/**
	 * 删除重点人员
	 */
	var deleteKeyPeople = payload => Fetch('POST', apiUrl + 'deleteKeyPeople', payload)
	/**
	 * 从任务里删除重点人员
	 */
	var deleteKeyPeopleInTask = payload => Fetch('POST', apiUrl + 'deletePeopleInTask', payload)
	/**
	 * 添加重点人员到任务
	 */
	var addKeyPeopleToTask = payload => Fetch('POST', apiUrl + 'addPeopleToTask', payload)
	/**
	 * 获得任务列表
	 */
	var getTaskList = payload => Fetch('POST', apiUrl + 'getTaskList', payload)
	/**
	 * 获得自定义字段
	 */
	var getCustomColumns = payload => Fetch('GET', apiUrl + 'getCustomColumn', payload)
	//var getCustomColumns = data => Utils.setpromise(customColumn)
	/**
	 * 设置自定义字段
	 */
	var setCustomColumns = payload => Fetch('POST', apiUrl + 'setCustomColumn', payload)
	/**
	 * 获得人员类别
	 */
	var getPersonnelCategory = payload => Fetch('GET', apiUrl + 'getPersonnelCategory?id=' + payload)
	/**
	 * 根据角色获得牵头警钟
	 */
	var getPoliceTypeByRole = payload => Fetch('GET', apiUrl + 'getPoliceType?t=' + payload)
	/**
	 * 根据角色获得牵头警钟
	 */
	var getResponsibilityUnitOrigin = payload => Fetch('GET', apiUrl + 'getDepartmentObject?t=' + payload)
	/**
	 * 获得各种分类
	 */
	var getCategory = payload => Fetch('GET', apiUrl + 'getCategory?t=' + payload)
	/**
	 * 搜索责任单位
	 */
	 var searchresponsibilityOffice = payload => Fetch('GET', apiUrl + 'getSearchDepartment?t=' + payload)
	/**
	 * 模拟异步设置重点人员列表
	 */
	var setPromisePeopleList = payload => Utils.setpromise(payload)

	var uploadKeyPeopleUrl = apiUrl + 'importPeopleExcel'

} else {	
	var getKeyPeopleList = data => Utils.setpromise(keyPeopleList.result)
	var getKeyPeopleAssignedList = data => Utils.setpromise(keyPeopleList.result)
	var getKeyPeopleNonAssignedList = data => Utils.setpromise(keyPeopleList.result)
	var getKeyPeopleAuditList = data => Utils.setpromise(keyPeopleList.result)
	var getKeyPeopleStorageList = data => Utils.setpromise(keyPeopleList.result)
	var getKeyPeopleApprovalList = data => Utils.setpromise(keyPeopleList.result)
	var getKeyPeopleNoAuditApprovalList = data => Utils.setpromise(keyPeopleList.result)
	var saveKeyPeople = data => Utils.setpromise({"code":200,"status":"","result":"","message":"用户添加成功","total":0,"currentPage":1})
	var assignTaskToPeople = data => Utils.setpromise({"code":200,"status":"","result":"","message":"用户添加成功","total":0,"currentPage":1})
	var updateKeyPeople = data => Utils.setpromise({"code":200,"status":"","result":"","message":"成功","total":0,"currentPage":1})
	var setCustomColumns = data => Utils.setpromise({"code":200,"status":"","result":"","message":"成功","total":0,"currentPage":1})
	var passAuditStorageKeyPeople = data => Utils.setpromise({"code":200,"status":"","result":"","message":"成功","total":0,"currentPage":1})
	var passAuditTaskKeyPeople = data => Utils.setpromise({"code":200,"status":"","result":"","message":"成功","total":0,"currentPage":1})
	var deleteKeyPeople = data => Utils.setpromise(keyPeopleList.result)
	var deleteKeyPeopleInTask = data => Utils.setpromise({"code":200,"status":"","result":"","message":"成功","total":0,"currentPage":1})
	var addKeyPeopleToTask = data => Utils.setpromise({"code":200,"status":"","result":"","message":"成功","total":0,"currentPage":1})
	var passApprovalKeyPeople = data => Utils.setpromise({"code":200,"status":"","result":"","message":"成功","total":0,"currentPage":1})
	var getTaskList = data => Utils.setpromise(taskList.result)
	var getPersonnelCategory = data => Utils.setpromise(selections.result)
	var getCustomColumns = data => Utils.setpromise(customColumn)
	var getCategory = data => Utils.setpromise(selections.result)
	var setPromisePeopleList = payload => Utils.setpromise(payload)
	var changeNotPassReason = data => Utils.setpromise({"code":200,"status":"","result":"","message":"成功","total":0,"currentPage":1})
	var uploadKeyPeopleUrl = apiUrl + 'importPeopleExcel'
	var searchresponsibilityOffice = data => Utils.setpromise({"code":200,"status":"","result":"","message":"用户添加成功","total":0,"currentPage":1})
}	

export  { 
	getKeyPeopleList,
	getKeyPeopleAssignedList,
	getKeyPeopleNonAssignedList,
	getKeyPeopleAuditList,
	getKeyPeopleStorageList,
	changeNotPassReason,
	uploadKeyPeopleUrl,
	getKeyPeopleApprovalList,
	getKeyPeopleNoAuditApprovalList,
	deleteKeyPeople,
	assignTaskToPeople,
	passApprovalKeyPeople,
	passAuditStorageKeyPeople,
	addKeyPeopleToTask,
	passAuditTaskKeyPeople,
	deleteKeyPeopleInTask,
	getTaskList,
	saveKeyPeople,
	setCustomColumns,
	updateKeyPeople,
	getCustomColumns,
	getPersonnelCategory,
	getCategory,
	getPoliceTypeByRole,
	getResponsibilityUnitOrigin,
	searchresponsibilityOffice,
	setPromisePeopleList
}
