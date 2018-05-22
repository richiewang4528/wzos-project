import _ from 'lodash'
import * as PeopleService from '../service/peopleService.js'
const processListData = (data) => {
    if(data && data.result){
        data.result.forEach((item, index)=>{
            item.provinceCitiyDistrictStr = item.provinceCitiyDistrict
            item.phoneNumber = item.phoneNumber.replace('，',',')
            item.taskDisposalMeasure = '暂未设'
            if(item.taskAssign){
                let tempStr = item.taskAssign.replace('(',',').replace(')','')
                let tempArr = tempStr.split(',')
                if(tempArr && tempArr.length>0){
                    item.taskString =  tempArr[0]
                    item.taskDisposalMeasure = tempArr[1]
                }
            }
        })
        return data
    } else {
        return  -1
    }
}

export default {
    state: {
        // 重点人员分页Option
        keyPageOption:{
            page: 1,
            pageLimit: 100
        },
        // 入库审核分页Option
        storagePageOption:{
            page: 1,
            pageLimit: 100
        },
        // 任务审核Option
        taskPageOption:{
            page: 1,
            pageLimit: 100
        },
        // 任务审批Option
        task2PageOption:{
            page: 1,
            pageLimit: 100
        },
        // 未通过任务Option
        noTaskPageOption:{
            page: 1,
            pageLimit: 100
        },
        // 已分配人员分页Option
        assignPageOption:{
            page: 1,
            pageLimit: 100
        },
        // 未分配人员分页Option
        noAssignPageOption:{
            page: 1,
            pageLimit: 100
        },


        currentTable:'',
        isShowAddUpdate: false,
        isShowAddMoreUpdate: false,
        isShowAssigned: false,
        isShowAssignPeo: false,
        isShowControllevel: false,
        isShowCC: false,
        isShowReason: false,
        uploadKeyPeopleUrl: PeopleService.uploadKeyPeopleUrl,
        responsibilityUnitsList:[],
        responsibilityUnitsOrigin:[],
        responsibilityUnitsOrigin2:[
            {
                id:'330300000000-1-温州市公安局-(0)',
                label: '温州市公安局',
                offices: [],
                index:0
            },
            {
                id:'330327000000-1-温州市苍南县公安局-(1)',
                label: '温州市苍南县公安局',
                offices: [],
                index:1
            },
            {
                id:'330328000000-1-温州市文成县公安局-(2)',
                label: '温州市文成县公安局',
                offices: [],
                index:2
            },
            {
                id:'330329000000-1-温州市泰顺县公安局-(3)',
                label: '温州市泰顺县公安局',
                offices: [],
                index:3
            },
            {
                id:'330381000000-1-温州市瑞安市公安局-(4)',
                label: '温州市瑞安市公安局',
                offices: [],
                index:4
            },
            {
                id:'330382000000-1-温州市乐青市公安局-(5)',
                label: '温州市乐青市公安局',
                offices: [],
                index:5
            },
            {
                id:'330398000000-1-温州市公安局水上分局-(6)',
                label: '温州市公安局水上分局',
                offices: [],
                index:6
            },
            {
                id:'330399000000-1-温州市公安局交通治安分局-(7)',
                label: '温州市公安局交通治安分局',
                offices: [],
                index:7
            },
            {
                id:'330305000000-1-温州市公安局经济技术开发区-(8)',
                label: '温州市公安局经济技术开发区',
                offices: [],
                index:8
            },
            {
                id:'330322000000-1-温州市铜头县公安局-(9)',
                label: '温州市铜头县公安局',
                offices: [],
                index:9
            },
            {
                id:'330324000000-1-温州市永嘉县公安局-(10)',
                label: '温州市永嘉县公安局',
                offices: [],
                index:10
            },
            {
                id:'330326000000-1-温州市平阳县公安局-(11)',
                label: '温州市平阳县公安局',
                offices: [],
                index:11
            },
            {
                id:'330302000000-1-温州市公安局鹿城区分局-(12)',
                label: '温州市公安局鹿城区分局',
                offices: [],
                index:12
            },
            {
                id:'330303000000-1-温州市公安局龙湾区分局-(13)',
                label: '温州市公安局龙湾区分局',
                offices: [],
                index:13
            },
            {
                id:'330304000000-1-温州市公安局瓯海区分局-(14)',
                label: '温州市公安局瓯海区分局',
                offices: [],
                index:14
            }
        ],
        peopleFields:{
            number: '序号',
            name: '姓名',
            identify: '身份证',
            classify: '归类',
            masterDepartment: '主管部门',
            leadPolice: '牵头警种',
            personnelCategory: '人员类别',
            relatedClass: '涉事细类',
            relatedDescription: '涉事简述',
            currentAddress: '现住址',
            phoneNumber: '手机号',
            carPlates: '汽车号牌',
            responsibilityPolice: '责任警种',
            responsibilityUnit: '责任单位',
            responsibilityPerson: '责任人',
            shortNumber: '短号',
            messagelongNumber: '短信接收长号',
            nonPoliceRelation: '非公安口布控联系人',
            nonPoliceRelationPhone: '非公安口布控联系人手机号',
            nonPoliceRelationOffice: '非公安口布控单位',
            gender: '性别',
            passportNumber: '护照号',
            cooperatePolice: '配合警种',
            phoneSerialNumber: '手机串号',
            SIMCard: 'SIM卡码',
            mobileSignatureCode: '手机特征码',
            QQ: 'QQ',
            weChat: '微信',
            bankCard: '银行卡',
            keyRelation: '重点关系人关系',
            keyRelationName: '重点关系人姓名',
            keyRelationIdentify: '重点关系人身份证号',
            keyRelationPhone: '重点关系人手机',
            taskAssign: '任务分配',
            selfSetLabel: '录入人自设标签'
        },
        isPeopleSearching: false,
        peopleSearchObj:'',

        isTaskSearching: false,
        taskSearchObj:'',
        taskType: 0,
        controlLevel: 2, //1拦截 2关注

        customColumns: [],
        defaultCC:[{"name":"name"},{"name":"identify"},{"name":"classify"},{"name":"taskDisposalMeasure"},{"name":"leadPolice"},{"name":"personnelCategory"},{"name":"relatedClass"},{"name":"phoneNumber"},{"name":"responsibilityUnit"}],
        updateObj:'',
        leadPoliceList:[],

        keyPeopleList:{
            result:[],
            total:0
        },
        assignPeopleList:'',
        assignedPeopleList:'',
        auditPeopleList:'',
        storagePeopleList:'',
        approvalPeopleList:'',
        auditapprovalPeopleList:'',

        taskList: '',
        currentTaskId:'',

        currentSelection:[],
        currentStorageSelection:[],
        currentTaskSelection:[],

        //人员管理右上子菜单
        peopleSubmenus:[
            {
                index: '/people/',
                title: '重点人员'
            },
            {
                index: '/people/storage',
                title: '入库审核'
            },
            {
                index: '/people/assignTask',
                title: '分配任务'
            },
            {
                index: '/people/pendingAudit',
                title: '任务审核'
            },
            {
                index: '/people/pendingApproval',
                title: '任务审批'
            },
            {
                index: '/people/notPassAuditApproval',
                title: '任务审核/审批未通过'
            }
        ],

        peopleAURules: {
            // 姓名
            name: [
                { required: true, message: '请输入姓名'},
                { min: 2, max: 25, message: '长度在 2 到 25 个字符', trigger: 'blur'},
            ],
            // 身份证
            identify: [
                { required: true, message: '请输入身份证'},
                { validator: (rule, value, callback) => {
                    let pattern = /(^\d{18}$)|(^\d{17}(\d|X)$)/
                    let idArr = value.split("")
                    if(idArr.length == 18){
                        var lastNum = idArr[17]
                        let ruleArr = [7,9,10,5,8,4,2,1,6,3,7,9,10,5,8,4,2,0]
                        let valiRule = [1,0,'X',9,8,7,6,5,4,3,2]
                        let calculateNum = null
                        idArr.forEach( (a,i)=> {
                            calculateNum+= a * ruleArr[i]
                        })
                        let remainder = calculateNum%11
                        var result = valiRule[remainder]
                    }else{

                    }
                    if(!pattern.test(value)){
                        callback(new Error('请输入正确位数的身份证号'))
                    }else if(result != lastNum){
                        console.log(result,lastNum)
                        callback(new Error('身份证验证错误'))
                    }else{
                        callback()
                    }
                }, trigger: 'change' }
            ],
            // 手机号
            phoneNumber: [
                //{ required: true, message: '请输入手机号'},
                { validator: (rule, value, callback) => {
                    let pattern = /^(1[34578]\d{9}\s*[,|，]\s*)*(1[34578]\d{9})*$/g
                    if(!pattern.test(value)){
                        callback(new Error('请按正确的格式输入手机号，多个用，分开'))
                    } else {
                        callback()
                    }
                }, trigger: 'change' }
            ],
            // 归类l
            classify: [
                { required: true, message: '请选择归类'}
            ],
            // 省市区
            provinceCitiyDistrict:[
                //{ required: true, message: '请选择省市区'}
            ],
            // 牵头警种
            leadPolice: [
                { required: true, message: '请选择牵头警种'}
            ],
            // 人员类别
            personnelCategory: [
                { required: true, message: '请选择人员类别(先选择牵头警种)'}
            ],
            // 涉事细类
            relatedClass: [
                { required: true, message: '请选择涉事细类(先选择人员类别)'}
            ],
            // 主管部门
            masterDepartment: [
                { required: true, message: '请选择主管部门'}
            ],
            responsibilityUnitDetail:[],
            // 汽车号牌
            carPlates: [],
            // 责任人
            responsibilityPerson: [
                { required: true, message: '请填写责任人'},
                { min: 2, max: 25, message: '长度在 2 到 25 个字符'}
            ],
            // 责任单位
            responsibilityUnitProp: [
                { required: true, message: '请输入责任单位'}
            ],
            // 短号 用3到6位数字的号码代替11位手机号
            shortNumber: [
                { required: true, message: '请输入短号（6位数字的号码）'}
            ],
            // 短信接收长号 长号即为原来的手机号
            messagelongNumber: [
                { required: true, message: '请输入长号（民警手机号）'}
            ],

            // 非公安口布控联系人
            nonPoliceRelation: [],
            // 非公安口布控联系单位
            nonPoliceRelationOffice: [],
            // 非公安口布控联系人手机号
            nonPoliceRelationPhone: [
                // { validator: (rule, value, callback) => {
                //     let pattern = /^(1[34578]\d{9}\s*[,|，]\s*)*(1[34578]\d{9})*$/g
                //     if(value && !pattern.test(value)){
                //         callback(new Error('请输入正确的非公安口布控联系人手机号'))
                //     } else {
                //         callback()
                //     }
                // }, trigger: 'change' }
            ],

            // 手机串号 IMEI 国际移动设备身份码 由15位数字组成的"电子串号",与每台手机一一对应
            phoneSerialNumber: [],
            // 护照号
            passportNumber: [],
            // SIM卡码
            SIMCard: [],
            // 手机特征码
            mobileSignatureCode: [],
            // QQ
            QQ: [],
            // 微信
            weChat: [],
            // 银行卡
            bankCard: [],
            // 重点关系人姓名
            keyRelationName: [
                { min: 2, max: 25, message: '长度在 2 到 25 个字符', trigger: 'blur'}
            ],
            // 重点关系人身份证号
            keyRelationIdentify: [],
            // 重点关系人手机
            keyRelationPhone: [
                { validator: (rule, value, callback) => {
                    let pattern = /^(1[34578]\d{9}\s*[,|，]\s*)*(1[34578]\d{9})*$/g
                    if(!pattern.test(value)){
                        callback(new Error('请输入正确的重点关系人手机，多个用，分开'))
                    } else {
                        callback()
                    }
                }, trigger: 'change' }
            ],
            // 录入人自设标签
            selfSetLabel: []
        },
        peopleMoreAURules: {
            // 归类l
            classify: [
                { required: false, message: '请选择归类'}
            ],
            // 省市区
            provinceCitiyDistrict:[
                //{ required: true, message: '请选择省市区'}
            ],
            // 牵头警种
            leadPolice: [
                { required: false, message: '请选择牵头警种'}
            ],
            // 人员类别
            personnelCategory: [
                { required: false, message: '请选择人员类别(先选择牵头警种)'}
            ],
            // 涉事细类
            relatedClass: [
                { required: false, message: '请选择涉事细类(先选择人员类别)'}
            ],
            // 主管部门
            masterDepartment: [
                { required: false, message: '请选择主管部门'}
            ],
            responsibilityUnitDetail:[],
            // 责任人
            responsibilityPerson: [
                { required: false, message: '请填写责任人'},
                { min: 2, max: 25, message: '长度在 2 到 25 个字符'}
            ],
            // 责任单位
            responsibilityUnitProp: [
                { required: true, message: '请输入责任单位'}
            ],
            // 短号 用3到6位数字的号码代替11位手机号
            shortNumber: [
                { required: false, message: '请输入短号（6位数字的号码）'}
            ],
            // 短信接收长号 长号即为原来的手机号
            messagelongNumber: [
                { required: false, message: '请输入长号（民警手机号）'}
            ],

            // 非公安口布控联系人
            nonPoliceRelation: [],
            // 非公安口布控联系单位
            nonPoliceRelationOffice: [],
            // 非公安口布控联系人手机号
            nonPoliceRelationPhone: [
                // { validator: (rule, value, callback) => {
                //     let pattern = /^(1[34578]\d{9}\s*[,|，]\s*)*(1[34578]\d{9})*$/g
                //     if(value && !pattern.test(value)){
                //         callback(new Error('请输入正确的非公安口布控联系人手机号'))
                //     } else {
                //         callback()
                //     }
                // }, trigger: 'change' }
            ],
            // 录入人自设标签
            selfSetLabel: []
        }
    },
    mutations: {

        set_key_pageoption(state, data){ // 重点人员分页Option
            state.keyPageOption = data
        },
        set_storage_pageoption(state, data){// 入库审核分页Option
            state.storagePageOption = data
        },
        set_task_pageoption(state, data){// 任务审核Option
            state.taskPageOption = data
        },
        set_task2_pageoption(state, data){ // 任务审批Option
            state.task2PageOption = data
        },
        set_notask_pageoption(state, data){// 未通过任务Option
            state.noTaskPageOption = data
        },
        set_assign_pageoption(state, data){ // 已分配人员分页Option
            state.assignPageOption = data
        },
        set_noassign_pageoption(state, data){// 未分配人员分页Option
            state.noAssignPageOption = data
        },


        set_people_list(state, data){
            let list = processListData(data)
            if(list == -1){
                state.keyPeopleList = {
                    result:[],
                    total:0
                }
            } else {
                state.keyPeopleList = list
            }
        },
        set_approval_people_list(state, data){
            let list = processListData(data)
            if(list == -1){
                state.approvalPeopleList = {
                    result:[],
                    total:0
                }
            } else {
                state.approvalPeopleList = list
            }
        },
        set_audit_people_list(state, data){
            let list = processListData(data)
            if(list == -1){
                state.auditPeopleList = {
                    result:[],
                    total:0
                }
            } else {
                state.auditPeopleList = list
            }
        },
        set_storage_people_list(state, data){
            let list = processListData(data)
            if(list == -1){
                state.storagePeopleList = {
                    result:[],
                    total:0
                }
            } else {
                state.storagePeopleList = list
            }
        },

        set_auditapproval_people_list(state, data){
            let list = processListData(data)
            if(list == -1){
                state.auditapprovalPeopleList = {
                    result:[],
                    total:0
                }
            } else {
                state.auditapprovalPeopleList = list
            }
        },
        set_assign_people_list(state, data){
            let list = processListData(data)
            if(list == -1){
                state.assignPeopleList = {
                    result:[],
                    total:0
                }
            } else {
                state.assignPeopleList = list
            }
        },
        set_assigned_people_list(state, data){
            let list = processListData(data)
            if(list == -1){
                state.assignedPeopleList = {
                    result:[],
                    total:0
                }
            } else {
                state.assignedPeopleList = list
            }
        },
        set_task_type(state, data){
            state.taskType = data
        },
        set_current_table(state, data){
            state.currentTable = data
        },
        set_show_au(state, data){
            state.isShowAddUpdate = data.flag

            state.updateObj = data.data
        },
        set_show_more_au(state, data){
            state.isShowAddMoreUpdate = data.flag
            state.updateObj = data.data

        },
        set_show_cl(state, data){
            state.isShowControllevel = data
        },
        set_show_cc(state, data){
            state.isShowCC = data
        },
        set_current_selection(state, data){

            state.currentSelection = data
        },
        set_custom_column(state, data){
            let originData = []
            let obj = {
                number: false,
                name: false,
                identify: false,
                classify: false,
                masterDepartment: false,
                leadPolice: false,
                personnelCategory: false,
                relatedClass: false,
                relatedDescription: false,
                currentAddress: false,
                phoneNumber: false,
                carPlates: false,
                responsibilityPolice: false,
                responsibilityUnit: false,
                responsibilityPerson: false,
                shortNumber: false,
                messagelongNumber: false,
                nonPoliceRelation: false,
                nonPoliceRelationPhone: false,
                nonPoliceRelationOffice: false,
                gender: false,
                passportNumber: false,
                cooperatePolice: false,
                phoneSerialNumber: false,
                SIMCard: false,
                mobileSignatureCode: false,
                QQ: false,
                weChat: false,
                bankCard: false,
                keyRelation: false,
                keyRelationName: false,
                keyRelationIdentify: false,
                keyRelationPhone: false,
                taskAssign: false,
                selfSetLabel: false,
                storage:false,
                reason:false,
                task: false,
                taskDisposalMeasure: false
            }
            if(data.length > 0){
                originData = [...data]
                originData.forEach((item)=>{
                    obj[item.key] = true
                })
            }
            state.customColumns = Object.assign({},obj)
        },
        set_task_list(state, data){
            state.taskList = data
        },
        set_lead_police(state, data){
            state.leadPoliceList = data
            state.leadPoliceList.unshift({id:-1,name:"全部"})
        },
        set_control_level(state, data){
            state.controlLevel = data
        },
        set_update_obj(state, data){
            state.updateObj = ''
        },
        set_assigned_au(state, flag){
            state.isShowAssigned = flag
        },
        set_assignpeo_au(state, flag){
            state.isShowAssignPeo = flag
        },
        set_current_storageselection(state, data){
            state.currentStorageSelection = data
        },
        set_current_taskselection(state, data){
            state.currentTaskSelection = data
        },
        set_people_psearching(state, data){
            state.isPeopleSearching = data
        },
        set_people_tsearching(state, data){
            state.isTaskSearching = data
        },
        set_people_tsearchobj(state, data){
            state.taskSearchObj = data
        },
        set_people_psearchobj(state, data){
            state.peopleSearchObj = data
        },
        set_current_taskid(state, data){
            state.currentTaskId = data
        },
        set_show_reason(state, data){
            state.isShowReason = data
        },
        set_responsibility_unit_list(state, data){
            state.responsibilityUnitsList = data
        },
        set_responsibility_unit_origin(state, data){
            state.responsibilityUnitsOrigin = data
        }
    },

    getters: {

        getKeyPageOption(state){ // 重点人员分页Option
            return state.keyPageOption
        },
        getStoragePageOption(state){ // 入库审核分页Option
            return state.storagePageOption
        },
        getTaskPageOption(state){ // 任务审核Option
            return state.taskPageOption
        },
        getTask2PageOption(state){ // 任务审批Option
            return state.task2PageOption
        },
        getNoTaskPageOption(state){ // 未通过任务Option
            return state.noTaskPageOption
        },
        getAssignPageOption(state){ // 已分配人员分页Option
            return state.assignPageOption
        },
        getNoAssignPageOption(state){ // 未分配人员分页Option
            return state.noAssignPageOption
        },

        getPeopleSubmenus(state){
            return state.peopleSubmenus
        },
        getTaskList(state){
            return state.taskList
        },
        getControlLevel(state){
            return state.controlLevel
        },
        getCustomColumns(state){
            return state.customColumns
        },
        getPeopleAURules(state){
            return state.peopleAURules
        },
        getPeopleMoreAURules(state){
            return state.peopleMoreAURules
        },

        getCurrentSelection(state){
            return state.currentSelection
        },
        getLeadPolices(state){
            return state.leadPoliceList
        },
        getUpdateObj(state){
            return state.updateObj
        },
        getStorageSelections(state){
            return state.currentStorageSelection
        },
        getTaskSelections(state){
            return state.currentTaskSelection
        },
        getDefaultCC(state){
            return state.defaultCC
        },
        getIsShowAddUpdate(state){
            return state.isShowAddUpdate
        },
        getIsShowAddMoreUpdate(state){
            return state.isShowAddMoreUpdate
        },
        getIsShowAssigned(state){
            return state.isShowAssigned
        },
        getIsShowCL(state){
            return state.isShowControllevel
        },
        getIsShowAssignPeo(state){
            return state.isShowAssignPeo
        },
        getIsShowCC(state){
            return state.isShowCC
        },
        getIsShowReason(state){
            return state.isShowReason
        },
        getIsPeopleSearching(state){
            return state.isPeopleSearching
        },
        getPeopleSearchObj(state){
            return state.peopleSearchObj
        },
        getIsTaskSearching(state){
            return state.isTaskSearching
        },
        getTaskSearchObj(state){
            return state.taskSearchObj
        },
        getCurrentTaskId(state){
            return state.currentTaskId
        },
        getPeopleFields(state){
            return state.peopleFields
        },
        getPeopleUploadUrl(state){
            return state.uploadKeyPeopleUrl
        },
        getResponsibilityUnitsOrigin(state){
            return state.responsibilityUnitsOrigin
        },
        getResponsibilityUnitsOrigin2(state){
            return state.responsibilityUnitsOrigin2
        },
        getResponsibilityUnitsList(state){
            return state.responsibilityUnitsList
        },
        getKeyPeopleList(state){
            return state.keyPeopleList
        },
        getApprovalPeopleList(state){
            return state.approvalPeopleList
        },
        getAuditPeopleList(state){
            return state.auditPeopleList
        },
        getStoragePeopleList(state){
            return state.storagePeopleList
        },
        getAuditapprovalPeopleList(state){
            return state.auditapprovalPeopleList
        },
        getAssignedPeopleList(state){
            return state.assignedPeopleList
        },
        getAssignPeopleList(state){
            return state.assignPeopleList
        },
        getTaskType(state){
            return state.taskType
        },
        getCurrentTable(state){
            return state.currentTable
        }
    },
    actions: {
        async get_people_list({commit}, payload){
            let res = await PeopleService.getKeyPeopleList(payload)
            if(res){
                commit('set_people_list', res)
            }
            return res
        },
        async get_people_assigned_list({commit}, payload){
            let res = await PeopleService.getKeyPeopleAssignedList(payload)
            return res
        },
        async get_people_nonAssigned_list({commit}, payload){
            let res = await PeopleService.getKeyPeopleNonAssignedList(payload)
            return res
        },
        async get_people_audit_list({commit}, payload){
            let res = await PeopleService.getKeyPeopleAuditList(payload)
            return res
        },
        async get_people_storage_list({commit}, payload){
            let res = await PeopleService.getKeyPeopleStorageList(payload)
            return res
        },

        async get_people_approval_list({commit}, payload){
            let res = await PeopleService.getKeyPeopleApprovalList(payload)
            return res
        },
        async get_people_noAuditApproval_list({commit}, payload){
            let res = await PeopleService.getKeyPeopleNoAuditApprovalList(payload)
            return res
        },
        async set_promise_people({commit}, payload){
            let res = await PeopleService.setPromisePeopleList(payload)
            if(res && res.result){
                commit('set_people_list', res)
            }
            return res
        },
        async assign_task_people({commit}, payload){
            let res = await PeopleService.assignTaskToPeople(payload)
            return res
        },
        async change_notpass_reason({commit}, payload){
            let res = await PeopleService.changeNotPassReason(payload)
            return res
        },
        async get_task_list({commit}, payload){
            let res = await PeopleService.getTaskList(payload)
            if(res && res.result){
                commit('set_task_list', res)
            }
            return res
        },
        async get_lead_police({commit}, payload){
            let res = await PeopleService.getPersonnelCategory(payload)
            commit('set_lead_police', res.result)
        },
        async get_custom_columns({commit}){
            let res = await PeopleService.getCustomColumns()
            if(res && res.result){
                commit('set_custom_column', res.result)
            }
            return res
        },
        async get_assigned_list({commit}){
            let res = await PeopleService.getKeyPeopleList()
        },
        async save_people({commit}, payload){
            let res = await PeopleService.saveKeyPeople(payload)
            return res
        },
        async pass_audit_stroage({commit}, payload){
            let res = await PeopleService.passAuditStorageKeyPeople(payload)
            return res
        },
        async pass_audit_task({commit}, payload){
            let res = await PeopleService.passAuditTaskKeyPeople(payload)
            return res
        },
        async pass_approval_people({commit}, payload){
            let res = await PeopleService.passApprovalKeyPeople(payload)
            return res
        },
        async update_people({commit}, payload){
            let res = await PeopleService.updateKeyPeople(payload)
            return res
        },
        async del_people_intask({commit}, payload){
            let res = await PeopleService.deleteKeyPeopleInTask(payload)
            return res
        },
        async add_people_totask({commit}, payload){
            let res = await PeopleService.addKeyPeopleToTask(payload)
            return res
        },
        async del_key_people({commit, state}, payload){
            let res = await PeopleService.deleteKeyPeople(payload)
            return res
        },
        async set_custom_columns({commit}, payload){
            let res = await PeopleService.setCustomColumns(payload)
            if(res && res.result){
                commit('set_custom_column', res)
            }
            return res
        }
    }
}
