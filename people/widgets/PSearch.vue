<template>
    <div class="search-wrapper">
        <el-form :inline="true"  size="mini"
            :label-position="labelPosition"
            :model="searchObj"
            ref="searchForm">
            <el-form-item label="姓名">
                <el-input v-model="searchObj.name" placeholder="如搜索多个，需要用,隔开"></el-input>
            </el-form-item>
            <el-form-item label="身份证">
                <el-input v-model="searchObj.identify" placeholder="如搜索多个，需要用,隔开"></el-input>
            </el-form-item>
            <wz-responsibilityoffice v-on:getResOffice="getResponOffice"></wz-responsibilityoffice>
            <el-form-item label="归类">
                <el-select filterable v-model="searchObj.classify">
                    <el-option
                      v-for="item in classifys"
                      :key="item.name"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>

            <el-collapse-transition>
                <template v-if="isShowMore">
                    <div>
                        <el-form-item v-if="isKeyPeople" :label="storageLabel">
                            <el-select v-model="searchObj.isStorage">
                                <el-option
                                  v-for="item in storages"
                                  :key="item.name"
                                  :label="item.name"
                                  :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item v-if="isAudit" label="任务审核">
                            <el-select v-model="searchObj.isAudit">
                                <el-option
                                  v-for="item in audits"
                                  :key="item.name"
                                  :label="item.name"
                                  :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="手机号">
                            <el-input v-model="searchObj.phoneNumber" placeholder="如搜索多个，需要用,隔开"></el-input>
                        </el-form-item>
                        <el-form-item label="现住址">
                            <el-input v-model="searchObj.currentAddress" placeholder="如搜索多个，需要用,隔开"></el-input>
                        </el-form-item>
                        <el-form-item label="牵头警种">
                            <el-select
                                v-model="searchObj.leadPolice" @change="getCPersonnelCategorys(searchObj.leadPolice)" filterable>
                                <el-option
                                  v-for="item in leadPolices"
                                  :key="item.name"
                                  :label="item.name"
                                  :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="人员类别">
                            <el-select v-model="searchObj.personnelCategory"  @change="getCRelatedClasss(searchObj.personnelCategory)" :disabled="personnelCategoryDisable" filterable>
                                <el-option
                                  v-for="item in personnelCategorys"
                                  :key="item.name"
                                  :label="item.name"
                                  :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="涉事细类">
                            <el-select v-model="searchObj.relatedClass" :disabled="relatedClassDisable" filterable>
                                <el-option
                                  v-for="item in relatedClasss"
                                  :key="item.name"
                                  :label="item.name"
                                  :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="责任人">
                            <el-input v-model="searchObj.responsibilityPerson" placeholder="如搜索多个，需要用,隔开"></el-input>
                        </el-form-item>
                        <el-form-item label="主管部门">
                            <el-select v-model="searchObj.masterDepartment" filterable>
                                <el-option
                                  v-for="item in masterDepartments"
                                  :key="item.name"
                                  :label="item.name"
                                  :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="汽车号牌">
                            <el-input v-model="searchObj.carPlates" placeholder="如搜索多个，需要用,隔开"></el-input>
                        </el-form-item>
                        <el-form-item label="短号">
                            <el-input v-model="searchObj.shortNumber" placeholder="如搜索多个，需要用,隔开"></el-input>
                        </el-form-item>
                        <el-form-item label="短信接收长号">
                            <el-input v-model="searchObj.messagelongNumber" placeholder="如搜索多个，需要用,隔开"></el-input>
                        </el-form-item>
                        <el-form-item label="QQ">
                            <el-input v-model="searchObj.QQ" placeholder="如搜索多个，需要用,隔开"></el-input>
                        </el-form-item>
                        <el-form-item label="微信">
                            <el-input v-model="searchObj.weChat" placeholder="如搜索多个，需要用,隔开"></el-input>
                        </el-form-item>
                        <el-form-item label="银行卡">
                            <el-input v-model="searchObj.bankCard" placeholder="如搜索多个，需要用,隔开"></el-input>
                        </el-form-item>
                        <el-form-item label="重点关系人姓名">
                            <el-input v-model="searchObj.keyRelationName" placeholder="如搜索多个，需要用,隔开"></el-input>
                        </el-form-item>
                        <el-form-item label="重点关系人手机">
                            <el-input v-model="searchObj.keyRelationPhone" placeholder="如搜索多个，需要用,隔开"></el-input>
                        </el-form-item>
                        <el-form-item label="录入人自设标签">
                            <el-input v-model="searchObj.selfSetLabel" placeholder="如搜索多个，需要用,隔开"></el-input>
                        </el-form-item>
                        <el-form-item label="护照号">
                            <el-input v-model="searchObj.passportNumber" placeholder="如搜索多个，需要用,隔开"></el-input>
                        </el-form-item>
                        <el-form-item label="配合警种">
                            <el-input v-model="searchObj.cooperatePolice" placeholder="如搜索多个，需要用,隔开"></el-input>
                        </el-form-item>
                        <el-form-item label="手机串号">
                            <el-input v-model="searchObj.phoneSerialNumber" placeholder="如搜索多个，需要用,隔开"></el-input>
                        </el-form-item>
                        <el-form-item class="middle" label="非公安口布控联系人">
                            <el-input v-model="searchObj.nonPoliceRelation" placeholder="如搜索多个，需要用,隔开"></el-input>
                        </el-form-item>
                    </div>
                </template>
            </el-collapse-transition>
        </el-form>
        <div class="search-btns">
            <el-button class="sitem-btn" @click="searchKeyPeopleList('searchForm')" :loading="searchLoading" round size="mini" >搜索</el-button>
            <el-button class="sitem-btn" @click="clearSearchObj" :loading="resetLoading"  round size="mini">重置</el-button>
            <el-button class="sitem-btn" @click="showMoreSearch" type="primary" round size="mini">
                更多搜索
                <i :class="toggleMore"></i>
            </el-button>
        </div>
    </div>
</template>

<script>
    import {
        getPersonnelCategory,
        getCategory } from '../../../service/peopleService.js'
    import wzResponsibilityoffice from '../../../components/ResponsibilityOffice.vue'
    var sObj = {
        name:'',
        responsibilityPolice:'',
        identify:'',
        classify:'',
        masterDepartment: '',
        leadPolice:'',
        personnelCategory:'',
        relatedClass:'',
        relatedDescription:'',
        currentAddress:'',
        phoneNumber:'',
        carPlates:'',
        responsibilityUnit:'',
        responsibilityPerson:'',
        shortNumber:'',
        messagelongNumber:'',
        nonPoliceRelation:'',
        QQ:'',
        phoneSerialNumber:'',
        cooperatePolice:'',
        passportNumber:'',
        selfSetLabel:'',
        keyRelationPhone:'',
        keyRelationName:'',
        bankCard:'',
        weChat:'',
        responsibilityUnitArrStr:'',
        isStorage:-1,
        isAudit:-1
    }
    export default {
        components: {
            wzResponsibilityoffice
        },
        props: {
            searchType: {
                type: String,
                required: true
            }
        },
        data(){
            return{
                isAudit:true,
                isKeyPeople: true,
                storageLabel:'是否入库',

                responsibilityOfficeResult: [],

                pageLimit: this.$store.getters.getPageLimit,
                currentPage: this.$store.getters.getCurrentPage,

                isShowMore:false,
                labelPosition:'right',
                toggleMore:'el-icon-arrow-down',
                textareaRows: 1,
                personnelCategoryDisable: false,
                relatedClassDisable: false,
                searchLoading: false,
                resetLoading: false,
                responsibilityUnit:'',

                leadPolices:[], //牵头警种
                personnelCategorys:[], //人员类别
                relatedClasss:[], //涉事细类

                masterDepartments:[], //主管部门

                classifys:[
                    {id:-1,name:"全部"},
                    {id:0,name:"公安"},
                    {id:1,name:"非公安"}
                ],
                storages:[
                    {id:-1,name:"全部"},
                    {id:1,name:"是"},
                    {id:0,name:"否"}
                ],
                audits:[
                    {id:-1,name:"全部"},
                    {id:1,name:"已通过"},
                    {id:0,name:"未通过"}
                ],
                searchObj: Object.assign({}, sObj)
            }
        },
        destroyed(){
            this.searchObj = Object.assign({},sObj)
            this.$store.commit('set_people_psearchobj', this.processParam())
            this.$store.commit('set_people_psearching', false)
        },
        methods: {
            getResponOffice(val){
                this.responsibilityOfficeResult = val
            },
            async getMasterDepartments(){
                let res = await getCategory(2)
                res.result.unshift({id:-1,name:"全部"})
                this.masterDepartments = res.result
            },
            async getPersonnelCategorys(id){
                let res = await getPersonnelCategory(id)
                res.result.unshift({id:-1,name:"全部"})
                this.personnelCategorys = res.result
            },
            async getRelatedClasss(id){
                let res = await getPersonnelCategory(id)
                res.result.unshift({id:-1,name:"全部"})
                this.relatedClasss = res.result
            },
            getCPersonnelCategorys(id){
                this.personnelCategorys = []
                this.searchObj.personnelCategory = ''
                this.relatedClasss = []
                this.searchObj.relatedClass = ''
                this.getPersonnelCategorys(id)
            },
            getCRelatedClasss(id){
                this.relatedClasss = []
                this.searchObj.relatedClass = ''
                this.getRelatedClasss(id)
            },
            showMoreSearch(){
                this.isShowMore = !this.isShowMore
                if(this.toggleMore === 'el-icon-arrow-down'){
                    this.toggleMore = 'el-icon-arrow-up'
                } else {
                    this.toggleMore = 'el-icon-arrow-down'
                }
            },
            processParam(){
                let payload = Object.assign({}, this.searchObj)
                payload.responsibilityPolice = parseInt(payload.responsibilityPolice) > -1?parseInt(payload.responsibilityPolice):-1
                payload.classify = parseInt(payload.classify) > -1?parseInt(payload.classify):-1
                payload.masterDepartment = parseInt(payload.masterDepartment) > -1?parseInt(payload.masterDepartment):-1
                payload.leadPolice = parseInt(payload.leadPolice) > -1?parseInt(payload.leadPolice):-1
                payload.personnelCategory = parseInt(payload.personnelCategory) > -1?parseInt(payload.personnelCategory):-1
                payload.relatedClass = parseInt(payload.relatedClass) > -1?parseInt(payload.relatedClass):-1

                payload.responsibilityUnit = -1
                let tempStr = ''
                this.responsibilityOfficeResult.forEach((item)=>{
                    tempStr =  tempStr + ',' + item
                })
                payload.responsibilityUnitArrStr = tempStr

                return payload
            },
            loadDataCallBack(data, cflag, dispatchStr){
                this.searchLoading = false
                this.resetLoading = false
                if(data && data.result){
                    this.$store.commit(dispatchStr, data)
                }
                if(data.code == 200){
                    let blean = true
                    if(cflag){
                        blean = false
                    }
                    this.$store.commit('set_people_psearchobj', this.processParam())
                    this.$store.commit('set_people_psearching', blean)
                } else {
                    this.$message({
                        type: 'error',
                        message:  data.message ? data.message : '加载失败'
                    })
                }
            },
            loadData(payload, cflag){
                switch(this.searchType){
                    case 'all':
                        this.$store.dispatch('get_people_list', payload).then((data)=>{
                            this.loadDataCallBack(data, cflag, 'set_people_list')
                        })
                        break;
                    case 'assigned':
                        payload.taskid = this.$store.getters.getCurrentTaskId
                        this.$store.dispatch('get_people_assigned_list', payload).then((data)=>{
                            this.loadDataCallBack(data, cflag, 'set_assigned_people_list')
                        })
                        break;
                    case 'nonAssigned':
                        payload.taskid = this.$store.getters.getCurrentTaskId
                        this.$store.dispatch('get_people_nonAssigned_list', payload).then((data)=>{
                            this.loadDataCallBack(data, cflag, 'set_assign_people_list')
                        })
                        break;
                    case 'audit':
                        this.$store.dispatch('get_people_audit_list', payload).then((data)=>{
                            this.loadDataCallBack(data, cflag, 'set_audit_people_list')
                        })
                        break;
                    case 'approval':
                        this.$store.dispatch('get_people_approval_list', payload).then((data)=>{
                            this.loadDataCallBack(data, cflag, 'set_approval_people_list')
                        })
                        break;
                    case 'noAuditApproval':
                        this.$store.dispatch('get_people_noAuditApproval_list', payload).then((data)=>{
                            this.loadDataCallBack(data, cflag, 'set_auditapproval_people_list')
                        })
                        break;
                    case 'storage':
                        this.$store.dispatch('get_people_storage_list', payload).then((data)=>{
                            this.loadDataCallBack(data, cflag, 'set_storage_people_list')
                        })
                        break;
                }
            },
            searchKeyPeopleList(formName) {
                let payload = this.processParam()
                payload.limit = this.pageLimit
                payload.page = this.$store.getters.getCurrentPage
                this.searchLoading = true
                for(var i  in payload){
                  i.replace(/，/g, ",")
                }
                this.loadData(payload)
            },
            clearSearchObj(){
                this.searchObj = Object.assign({}, sObj)
                this.resetLoading = true
                this.loadData({limit:this.pageLimit, page:1}, true)
            }
        },
        mounted(){
            this.$store.dispatch('get_lead_police', 0).then(()=>{
                this.leadPolices = this.$store.getters.getLeadPolices
            })
            this.getMasterDepartments()

            let path = this.$route.path
            if(path.indexOf('people/notPassAuditApproval') !== -1
                || path.indexOf('people/assignTask') !== -1
                || path.indexOf('people/pendingApproval') !== -1){
                this.isAudit = false
                this.isKeyPeople = false
            } else if(path.indexOf('people/pendingAudit') !== -1) {
                this.storageLabel = '入库审核'
                this.storages = [
                    {id:-1,name:"全部"},
                    {id:1,name:"通过"},
                    {id:0,name:"未通过"}
                ]
                this.isAudit = true
                this.isKeyPeople = true
            } else {
                this.isAudit = false
                this.isKeyPeople = true
                this.storageLabel = '是否入库'
            }
        }
    }
</script>
<style scoped></style>
