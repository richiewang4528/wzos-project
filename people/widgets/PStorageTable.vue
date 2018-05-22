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

           <!--普通表格全选 :span-method="mergeSameCols"-->
            <div class="td-wrapper">
                <el-table-column
                    type="selection"
                    fixed="left"
                    width="50"></el-table-column>
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
                    </template>
                </el-table-column>
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
            listType: { type: String, required: true }
        },
        data(){
            return{ 
                pageSize: this.$store.getters.getPageSize,
                pageLimit: 100,
                currentPage: this.$store.getters.getCurrentPage,
                loading: false,
                fixedShow: true,
                currenRowIndex: 0,
                maxHeight:(window.innerHeight - 330),
                loadSign:true,
                taskdm:'intercept',
                referArr:[]
            }
        },
        computed: {
            customColumns(){
                return this.$store.getters.getCustomColumns
            },
            keyPeopleList(){
                return this.$store.getters.getStoragePeopleList
            }
        },
        mounted(){
            let pageOption = this.$store.getters.getStoragePageOption
            this.currentPage = pageOption.page
            this.pageLimit = pageOption.pageLimit
            this.initData()
        },
        destroyed(){
            this.$store.commit('set_current_selection', [])  
            this.$store.commit('set_current_storageselection', [])  
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
            handleSelectionChange(val) {
                this.$store.commit('set_current_storageselection', val)
            },
            loadDataCallBack(data, flag){
                this.loading = false
                if(data && data.result){
                    this.$store.commit('set_storage_people_list', data)
                }
                if(data.code === 200){
                    this.referArr = Utils.generateMerageData(data, 'identify')
                } else {
                    this.$message({ type: 'error', message:  data.message ? data.message : '加载失败'  })
                }
            },
            loadData(payload, flag){
                this.$store.dispatch('get_people_storage_list', payload).then((data)=>{
                    this.loadDataCallBack(data, flag)
                })
            },
            loadCustomColumn(){
                let pageOption = this.$store.getters.getStoragePageOption
                let payload = {
                    limit: this.pageLimit,
                    page: pageOption.page,
                    isStorage: 0
                }
                this.$store.dispatch('get_custom_columns').then((data)=>{
                    this.loadData(payload)
                    let ccArrs = data.result
                    let tempArr
                    tempArr = [...ccArrs]
                    this.$store.commit('set_custom_column', tempArr)
                })
            },
            initData(){
                this.loading = true
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
                this.$store.commit('set_storage_pageoption', {page:this.page, pageLimit:this.pageLimit})
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
                this.loadData(payload)
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