<template>
    <div class="table-list" v-loading="loading">
        <el-table
            :data="keyPeopleList.result"
            border
            stripe
            size="mini"
            tooltip-effect="dark"
            ref="keyPeopleTable2"
            key="keyPeopleTable2k"
            @selection-change="handleSelectionChange"
            :cell-class-name="cellClassName"
            :max-height="maxHeight"
            style="width: 100%">

            <!--普通表格全选 :span-method="mergeSameCols" -->
            <div class="td-wrapper">
                <!--任务审核全选-->
                <el-table-column
                    width="90"
                    fixed="left"
                    :render-header="renderTaskHeader">
                    <template slot-scope="scope">
                        <i v-if="scope.row.isPassTask" class="el-icon-check"></i>
                        <el-checkbox v-else-if="!scope.row.isPassStorage" disabled></el-checkbox>
                        <input v-else type="checkbox" class="audititem" :checked="scope.row.isTaskChecked" @change="selectTaskCB(scope.row, $event)" :key="scope.row.number" ></input>
                    </template> </el-table-column>
            </div>
            <div class="td-wrapper">
                <!--入库审核全选-->
                <el-table-column 
                    :render-header="renderStorageHeader"
                    fixed="left"
                    width="90">
                    <template slot-scope="scope">
                        <i v-if="scope.row.isPassStorage" class="el-icon-check"></i>
                        <input v-else type="checkbox" class="audititem" :checked="scope.row.isStorageChecked" @change="selectStorageCB(scope.row, $event)"  :key="scope.row.number" ></input>
                    </template> </el-table-column>
            </div>
            <div class="td-wrapper">
                <el-table-column
                    label="序号"
                    prop="number"
                    width="80"></el-table-column>
            </div>
            <div class="td-wrapper" v-if="customColumns.name">
                <el-table-column
                  label="姓名"
                  prop="name"
                  :show-overflow-tooltip="true"
                  min-width="80"></el-table-column>
            </div>
            <div class="td-wrapper" v-if="customColumns.identify">
                <el-table-column
                    prop="identify"
                    label="身份证" 
                    width="160"
                    class-name="test-column">
                    <template slot-scope="scope">
                        <router-link :to="{ path: '/peopledetail/' + scope.row.identify + '/'  + scope.row.leadPoliceID + '/'  + scope.row.responsibilityUnitID }"><span style="margin-left: 10px">{{ scope.row.identify }}</span></router-link>
                    </template></el-table-column>
            </div>
            <div class="td-wrapper" v-if="customColumns.gender">
                <el-table-column
                  prop="gender"
                  label="性别"
                  width="60"></el-table-column>
            </div>
            <div class="td-wrapper" v-if="customColumns.passportNumber">
                <el-table-column
                  prop="passportNumber"
                  label="护照号"
                  :show-overflow-tooltip="true"
                  min-width="120"></el-table-column>
            </div>
            <div class="td-wrapper" v-if="customColumns.taskDisposalMeasure"> 
                <el-table-column
                  prop="taskDisposalMeasure"
                  label="处置措施"
                  width="80"></el-table-column>
            </div>
            <div class="td-wrapper" v-if="customColumns.classify">  
                <el-table-column
                  prop="classify"
                  label="归类"
                  width="80"></el-table-column>
            </div>
            <div class="td-wrapper" v-if="customColumns.masterDepartment">
                <el-table-column
                  prop="masterDepartment"
                  label="主管部门"
                  :show-overflow-tooltip="true"
                  min-width="120"></el-table-column>
            </div>
            <div class="td-wrapper" v-if="customColumns.leadPolice">
                <el-table-column
                  prop="leadPolice"
                  label="牵头警种"
                  :show-overflow-tooltip="true"
                  min-width="150"></el-table-column>
            </div>
            <div class="td-wrapper" v-if="customColumns.personnelCategory">
                <el-table-column
                  prop="personnelCategory"
                  label="人员类别"
                  :show-overflow-tooltip="true"
                  min-width="150"></el-table-column>
            </div>
            <div class="td-wrapper" v-if="customColumns.relatedClass">
                <el-table-column
                  prop="relatedClass"
                  label="涉事细类"
                  :show-overflow-tooltip="true"
                  min-width="120"></el-table-column>
            </div>
            <div class="td-wrapper" v-if="customColumns.cooperatePolice">
                <el-table-column
                  prop="cooperatePolice"
                  label="配合警种"
                  :show-overflow-tooltip="true"
                  min-width="120"></el-table-column>
            </div>
            <div class="td-wrapper" v-if="customColumns.relatedDescription">
                <el-table-column
                  prop="relatedDescription"
                  label="涉事简述"
                  :show-overflow-tooltip="true"
                  min-width="160"></el-table-column>
            </div>
            <div class="td-wrapper" v-if="customColumns.currentAddress">
                <el-table-column
                  prop="currentAddress"
                  label="现住址详细地址"
                  :show-overflow-tooltip="true"
                  min-width="150"></el-table-column>
            </div>
            <div class="td-wrapper" v-if="customColumns.phoneNumber">
                <el-table-column
                  prop="phoneNumber"
                  label="手机号"
                  :show-overflow-tooltip="true"
                  width="120"></el-table-column>
            </div>
            <div class="td-wrapper" v-if="customColumns.phoneSerialNumber">
                <el-table-column
                  prop="phoneSerialNumber"
                  label="手机串号"
                  :show-overflow-tooltip="true"
                  min-width="120"></el-table-column>
            </div>
            <div class="td-wrapper" v-if="customColumns.SIMCard">
                <el-table-column
                  prop="SIMCard"
                  label="SIM卡码"
                  min-width="120"></el-table-column>
            </div>
            <div class="td-wrapper" v-if="customColumns.mobileSignatureCode">
                <el-table-column
                  prop="mobileSignatureCode"
                  label="手机特征码"
                  :show-overflow-tooltip="true"
                  min-width="150"></el-table-column>
            </div>
            <div class="td-wrapper" v-if="customColumns.QQ">
                <el-table-column
                  prop="QQ"
                  label="QQ"
                  :show-overflow-tooltip="true"
                  min-width="120"></el-table-column>
            </div>
            <div class="td-wrapper" v-if="customColumns.weChat">
                <el-table-column
                  prop="weChat"
                  label="微信"
                  :show-overflow-tooltip="true"
                  min-width="120"></el-table-column>
            </div>
            <div class="td-wrapper" v-if="customColumns.bankCard">
                <el-table-column
                  prop="bankCard"
                  label="银行卡"
                  :show-overflow-tooltip="true"
                  min-width="120"></el-table-column>
            </div>
            <div class="td-wrapper" v-if="customColumns.carPlates">
                <el-table-column
                  prop="carPlates"
                  label="汽车号牌"
                  :show-overflow-tooltip="true"
                  min-width="120"></el-table-column> 
            </div>
            <div class="td-wrapper" v-if="customColumns.keyRelation">                           
                <el-table-column
                  prop="keyRelation"
                  label="重点关系人关系"
                  :show-overflow-tooltip="true"
                  min-width="150"></el-table-column>
            </div>
            <div class="td-wrapper" v-if="customColumns.keyRelationName">
                <el-table-column
                  prop="keyRelationName"
                  label="重点关系人姓名"
                  :show-overflow-tooltip="true"
                  min-width="150"></el-table-column>
            </div>
            <div class="td-wrapper" v-if="customColumns.keyRelationIdentify">
                <el-table-column
                  prop="keyRelationIdentify"
                  label="重点关系人身份证号"
                  :show-overflow-tooltip="true"
                  width="200"></el-table-column>
            </div>
            <div class="td-wrapper" v-if="customColumns.keyRelationPhone">
                <el-table-column
                  prop="keyRelationPhone"
                  label="重点关系人手机"
                  :show-overflow-tooltip="true"
                  min-width="150"></el-table-column>
            </div>
            <div class="td-wrapper" v-if="customColumns.responsibilityUnit">
                <el-table-column
                  prop="responsibilityUnit"
                  label="责任单位"
                  :show-overflow-tooltip="true"
                  min-width="200"></el-table-column>
            </div>
            <div class="td-wrapper" v-if="customColumns.responsibilityPerson">
                <el-table-column
                  prop="responsibilityPerson"
                  label="责任人"
                  :show-overflow-tooltip="true"
                  min-width="120"></el-table-column>
            </div>
            <div class="td-wrapper" v-if="customColumns.shortNumber">
                <el-table-column
                  prop="shortNumber"
                  label="短号"
                  :show-overflow-tooltip="true"
                  min-width="120"></el-table-column>
            </div>
            <div class="td-wrapper" v-if="customColumns.messagelongNumber">
                <el-table-column
                  prop="messagelongNumber"
                  label="短信接收长号"
                  :show-overflow-tooltip="true"
                  width="150"></el-table-column>
            </div>
            <div class="td-wrapper" v-if="customColumns.nonPoliceRelation">
                <el-table-column
                  prop="nonPoliceRelation"
                  :show-overflow-tooltip="true"
                  label="非公安口布控联系人"
                  min-width="180"></el-table-column>
            </div>
            <div class="td-wrapper" v-if="customColumns.nonPoliceRelationPhone">
                <el-table-column
                  prop="nonPoliceRelationPhone"
                  :show-overflow-tooltip="true"
                  label="非公安口布控联系人手机号"
                  min-width="220"></el-table-column>
            </div>
            <div class="td-wrapper" v-if="customColumns.nonPoliceRelationOffice">
                <el-table-column
                  prop="nonPoliceRelationOffice"
                  label="非公安口布控单位"
                  :show-overflow-tooltip="true"
                  min-width="160"></el-table-column>
            </div>
            <div class="td-wrapper" v-if="customColumns.taskAssign">
                <el-table-column
                  prop="taskAssign"
                  label="任务分配"
                  :show-overflow-tooltip="true"
                  min-width="140"></el-table-column>
            </div>
            <div class="td-wrapper" v-if="customColumns.selfSetLabel">
                <el-table-column
                  prop="selfSetLabel"
                  label="录入人自设标签"
                  :show-overflow-tooltip="true"
                  min-width="150"></el-table-column>
            </div>
            <div class="td-wrapper" v-if="customColumns.reason">
                <el-table-column
                  prop="reason"
                  label="不通过原因"
                  :show-overflow-tooltip="true"
                  min-width="120"></el-table-column>
            </div>
        </el-table>

        <div class="alignItem">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage"
                :page-sizes="[50, 100, 200, 300, 400, 500, 800, 1000]"
                background
                :page-size="pageLimit"
                layout="total, sizes, prev, pager, next, jumper"
                :total="keyPeopleList.total">
            </el-pagination>     
        </div>
    </div>
</template>

<script>
    import _ from 'lodash'
    import { Utils } from '../../../utils/index.js'
    export default {
        props: {
            listType: {
                type: String,
                required: true
            }
        },
        data(){
            return{ 
                pageSize: this.$store.getters.getPageSize,
                pageLimit: 100,
                currentPage: this.$store.getters.getCurrentPage,
                fixedShow: true,
                loading: false,
                selectAllTaskFlag: false,
                selectAllStorageFlag: false,
                currenRowIndex: 0,
                taskdm:'intercept',
                maxHeight:(window.innerHeight - 330),
                referArr:[]
            }
        },
        computed: {
            customColumns(){
                return this.$store.getters.getCustomColumns
            },
            keyPeopleList(){
                return this.$store.getters.getAuditPeopleList
            }
        },
        mounted(){
            let pageOption = this.$store.getters.getTaskPageOption
            this.currentPage = pageOption.page
            this.pageLimit = pageOption.pageLimit
            this.initData()
        },
        destroyed(){
            this.$store.commit('set_current_selection', [])  
            this.$store.commit('set_current_storageselection', [])  
            this.$store.commit('set_current_taskselection', [])  
            this.$store.commit('set_current_page', 1)
        },
        methods: {
            cellClassName({ row, column, rowIndex }){
                if(column.property === 'taskDisposalMeasure'){ 
                    if(row.taskDisposalMeasure.indexOf('拦截') !== -1){
                        return 'intercept'
                    } else if(row.taskDisposalMeasure.indexOf('关注') !== -1){
                        return 'attention'
                    } else {
                        return ''
                    }
                }
            },
            changeReason(val){
                this.$store.commit('set_current_selection', [val])
                this.$store.commit('set_show_reason', true)
            },
            handleSelectionChange(val) {
                this.$store.commit('set_current_selection', val)
            },
            initCheckAll(){
                let flag = true
                let originList = this.$store.getters.getAuditPeopleList
                let peopleArr = [...originList.result]
                // 此循环为刚开始检车是否全部已入库
                for (let i=0; i<peopleArr.length;i++) {
                    if(!peopleArr[i].isPassStorage){
                        flag = false
                        break
                    }
                }
                if(flag){
                    let storageEl = document.getElementById('allstorage')
                    storageEl ? storageEl.disabled = true : ''
                }
            },
            // 单选时检查 是否全选 全选 -> 全选按钮选中 有一个非全选 -> 全选按钮不选中
            checkedAllSelect(selectArr, type){
                let originList = this.$store.getters.getAuditPeopleList
                let originObj = Object.assign({}, originList)
                let peopleArr = [...originList.result]
                let checkedArr = []
                if(type == 'task'){
                    checkedArr = _.filter(peopleArr, (item)=>{
                        return item.isPassStorage && !item.isPassTask
                    })
                } else {
                    checkedArr = _.filter(peopleArr, (item)=>{
                        return !item.isPassStorage
                    })
                }

                let targetEl = ''
                if(type == 'task'){
                    targetEl = document.getElementById('alltask')
                } else {
                    targetEl = document.getElementById('allstorage')
                }
                if(checkedArr.length == selectArr.length){
                    targetEl ? targetEl.checked = true : ''
                } else {
                    targetEl ? targetEl.checked = false : ''
                }
            },

            // 单独选择入库
            selectStorageCB(val, evt){
                let originStorageSelection = this.$store.getters.getStorageSelections
                let tempArr = [...originStorageSelection]
                if(evt.currentTarget.checked){
                    val.isStorageChecked = true
                    tempArr = [...originStorageSelection, val]
                } else {
                    val.isStorageChecked = false
                    _.remove(tempArr, (item)=>{
                        return val.number == item.number
                    })
                }
                this.checkedAllSelect(tempArr, 'storage')
                this.$store.commit('set_current_storageselection', tempArr)
            },

            // 单独选择任务
            selectTaskCB(val, evt){
                let originTaskSelection = this.$store.getters.getTaskSelections
                let tempArr = [...originTaskSelection]
                if(evt.currentTarget.checked){
                    val.isTaskChecked = true
                    tempArr = [...originTaskSelection, val]
                } else {
                    val.isTaskChecked = false
                    _.remove(tempArr, (item)=>{
                        return val.number == item.number
                    })
                }
                this.checkedAllSelect(tempArr, 'task')
                this.$store.commit('set_current_taskselection', tempArr)
            },

            // 全部选择任务
            selectAllTask(evt){
                let finalArr = []
                let originKeyPeopleList = this.$store.getters.getAuditPeopleList
                let originObj = Object.assign({}, originKeyPeopleList)
                let peopleList = [...originKeyPeopleList.result]
                this.selectAllTaskFlag = evt
                if(evt.currentTarget.checked){
                    let tempArr = []
                    peopleList.forEach((item, index, array) => {
                        if(item.isPassStorage){
                            item.isTaskChecked = true
                        }
                        if(!item.isPassTask && item.isPassStorage){
                            tempArr.push(item)
                        }
                    })
                    finalArr = tempArr
                } else {
                    peopleList.forEach((item, index, array) => {
                        item.isTaskChecked = false
                    })
                }
                originObj.result = [...peopleList]
                this.$store.commit('set_audit_people_list', originObj)
                this.$store.commit('set_current_taskselection', finalArr)
            },

            // 全部选择入库
            selectAllStorage(evt){
                let finalArr = []
                let originKeyPeopleList = this.$store.getters.getAuditPeopleList
                let originObj = Object.assign({}, originKeyPeopleList)
                let peopleList = [...originKeyPeopleList.result]
                this.selectAllStorageFlag = evt
                if(evt.currentTarget.checked){
                    let tempArr = []
                    peopleList.forEach((item, index, array) => {
                        item.isStorageChecked = true
                        if(!item.isPassStorage){
                            tempArr.push(item)
                        }
                    })
                    finalArr = tempArr
                } else {
                    peopleList.forEach((item, index, array) => {
                        item.isStorageChecked = false
                    })
                }
                originObj.result = [...peopleList]
                this.$store.commit('set_audit_people_list', originObj)
                this.$store.commit('set_current_storageselection', finalArr)
                
            },
            loadDataCallBack(data, flag){
                this.loading = false
                if(data && data.result){
                    this.$store.commit('set_audit_people_list', data)
                }
                if(data.code === 200){
                    this.referArr = Utils.generateMerageData(data, 'identify')
                } else {
                    this.$message({
                        type: 'error',
                        message:  data.message ? data.message : '加载失败'
                    })
                }
            },
            loadData(payload, flag){
                this.$store.dispatch('get_people_audit_list', payload).then((data)=>{
                    this.loadDataCallBack(data, flag)
                    this.initCheckAll()
                })
            },
            loadCustomColumn(){
                let pageOption = this.$store.getters.getTaskPageOption
                let payload = {
                    limit: this.pageLimit,
                    page: pageOption.page
                }
                this.$store.dispatch('get_custom_columns').then((data)=>{
                    this.loadData(payload)
                    let ccArrs = data.result
                    let tempArr = [...ccArrs]
                    this.$store.commit('set_custom_column', tempArr)
                })
            },
            initData(){
                this.loading = true
            let storageEl = document.getElementById('allstorage')
            let targetEl = document.getElementById('alltask')
            console.log(storageEl)
            storageEl ? storageEl.checked = true : ''
            targetEl ? targetEl.checked = true : ''
                this.loadCustomColumn()
            },
            handleSizeChange(val) {
                this.pageLimit = val
                this.handleChange()
            },
            handleCurrentChange(val) {
                this.page = val
                this.handleChange()
            },
            handleChange(){
                this.$store.commit('set_task_pageoption', {page:this.page, pageLimit:this.pageLimit})
                let isSearching = this.$store.getters.getIsPeopleSearching
                let searchObj = this.$store.getters.getPeopleSearchObj
                let payload
                if(isSearching){
                    searchObj.limit = this.pageLimit
                    searchObj.page = this.page
                    payload = searchObj
                    payload.isDefault = 1
                } else {
                    payload = {
                        limit: this.pageLimit,
                        page: this.page,
                        isDefault: 2
                    }
                }
                this.loading = true
                let storageEl = document.getElementById('allstorage')
                let targetEl = document.getElementById('alltask')
                storageEl ? storageEl.checked = false : ''
                targetEl ? targetEl.checked = false : ''
                this.loadData(payload)
                this.loadData(payload)
            },
            renderTaskHeader(h) {
                return (
                    <div>
                        <span>任务&nbsp;</span>
                        <input type="checkbox" style={{  width: '15px', height: '15px' }} id="alltask" onChange={this.selectAllTask} ></input>
                    </div>
                )
            },
            renderStorageHeader(h) {
                return (
                    <div>
                        <span>入库&nbsp;</span>
                        <input type="checkbox" style={{  width: '15px', height: '15px' }} id="allstorage" onChange={this.selectAllStorage}></input>
                    </div>
                )
            }
        }
    }
</script>
<style scoped>
    .audititem {
        width: 15px; 
        height: 15px;
        background-color: white;
        border:1px solid #d5d5d5;
    }
</style>