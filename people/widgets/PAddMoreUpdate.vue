<template>
    <div class="addmoreupdate-wrapper">
        <el-dialog :close-on-click-modal="false" :title="headerTitle" :visible.sync="isShow">
            <el-form :inline="true"
                :rules="rules"
                :label-position="labelPosition"
                :model="addObj"
                size="mini"
                ref="addupdateForm">
                <el-row>
                    <el-col :span="8">
                        <el-form-item prop="gender" label="性别">
                            <el-select filterable v-model="addObj.gender">
                                <el-option
                                  v-for="item in genders"
                                  :key="item.name"
                                  :label="item.name"
                                  :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item prop="classify" label="归类">
                            <el-select filterable v-model="addObj.classify"  @change="onClassify(addObj.classify)" >
                                <el-option
                                    v-for="item in classifys"
                                    :key="item.name"
                                    :label="item.name"
                                    :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>

                    <el-col :span="8">
                        <el-form-item prop="masterDepartment" label="主管部门">
                            <el-select filterable v-model="addObj.masterDepartment">
                                <el-option
                                  v-for="item in masterDepartments"
                                  :key="item.name"
                                  :label="item.name"
                                  :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item prop="leadPolice" label="牵头警种">
                            <el-select v-model="addObj.leadPolice" @change="getCPersonnelCategorys(addObj.leadPolice)" filterable>
                                <el-option
                                    v-for="item in leadPolices"
                                    :key="item.name"
                                    :label="item.name"
                                    :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="8">
                        <el-form-item prop="personnelCategory" label="人员类别">
                            <el-select v-model="addObj.personnelCategory" :disabled="personnelCategoryDisable" @change="getCRelatedClasss(addObj.personnelCategory)" filterable>
                                <el-option
                                  v-for="item in personnelCategorys"
                                  :key="item.name"
                                  :label="item.name"
                                  :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item prop="relatedClass" label="涉事细类">
                            <el-select
                                v-model="addObj.relatedClass" :disabled="relatedClassDisable" filterable>
                                <el-option
                                  v-for="item in relatedClasss"
                                  :key="item.name"
                                  :label="item.name"
                                  :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <wz-responsibilityunit :isable="!updateFlag" :responunit="addObj.responsibilityUnit" v-on:getResponinfo="getResponsibilityUnitDetail"></wz-responsibilityunit>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item prop="nonPoliceRelation" label="非公安口布控联系人">
                            <el-input v-model="addObj.nonPoliceRelation"  placeholder="多个用，分开"></el-input>
                        </el-form-item>
                    </el-col>

                </el-row>



                <el-row>
                    <el-col :span="8">
                        <el-form-item prop="responsibilityPerson" label="责任人">
                            <el-input v-model="addObj.responsibilityPerson" placeholder="填写民警姓名"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item prop="shortNumber" label="短号">
                            <el-input v-model="addObj.shortNumber"  placeholder="6位数字，多个用，分开"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item prop="messagelongNumber" label="短信接收长号">
                            <el-input v-model="addObj.messagelongNumber"  placeholder="多个用，分开"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item  prop="cooperatePolice" label="配合警种">
                            <el-input v-model="addObj.cooperatePolice"></el-input>
                        </el-form-item>
                    </el-col>

                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item prop="selfSetLabel" label="录入人自设标签">
                            <el-input v-model="addObj.selfSetLabel"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="非公安口布控单位" prop="nonPoliceRelationOffice">
                            <el-input v-model="addObj.nonPoliceRelationOffice"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>

                    <el-col :span="8">
                        <el-form-item prop="nonPoliceRelationPhone" label="非公安口布控联系人手机号">
                            <el-input v-model="addObj.nonPoliceRelationPhone"  placeholder="多个用，分开"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item prop="relatedDescription" label="涉事简述">
                            <el-input type="textarea" placeholder="详细填写涉事时间、具体事项、信访诉求、针对的单位等要素" :rows="textareaRows" :cols="1" v-model="addObj.relatedDescription"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item prop="provinceCitiyDistrict" label="现住地省市区">
                            <v-distpicker  @province="onProvinceSelected" @city="onCitySelected"  @area="onAreaSelected" :placeholders="placeholders"></v-distpicker>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>

            <div slot="footer">
                <el-button size="mini" @click="cancelShowPcu">取 消</el-button>
                <el-button size="mini" @click="confirmShowPcu('addupdateForm')" :loading="confirmBtnLoading" type="primary">确 定</el-button>
            </div>


        </el-dialog>
    </div>
</template>
<script>
    import {
        getPersonnelCategory,
        getPoliceTypeByRole,
        getCategory } from '../../../service/peopleService.js'
    import _ from 'lodash'
    import wzResponsibilityunit from '../../../components/ResponsibilityUnit.vue'
    import wzAddressdetail from '../../../components/WzAddressDetail.vue'
    import VDistpicker from 'v-distpicker'
    import { Utils } from '../../../utils/index.js'
    export default {
        components: {
            VDistpicker,
            wzResponsibilityunit,
            wzAddressdetail
        },
        data(){
            return{
                responsibilityUnitDetail:[],
                responsibilityUnit:'',
                rules: this.$store.getters.getPeopleMoreAURules,
                innerVisible: false,
                labelPosition:'right',
                updateFlag: false,
                textareaRows: 1,
                personnelCategoryDisable: false,
                tasktypeDisable:false,
                relatedClassDisable: false,
                confirmBtnLoading:false,
                headerTitle:'批量修改人员',

                tasktypes: [{id:1,name:"拦截"},{id:2,name:"关注"}],
                leadPolices:[], //牵头警种
                personnelCategorys:[], //人员类别
                relatedClasss:[], //涉事细类
                masterDepartments:[], //主管部门

                placeholders: {
                    province: '省',
                    city: '市',
                    area: '区'
                },
                originProvinceCitiyDistrict: '',
                classifys:[
                    {id:0,name:"公安"},
                    {id:1,name:"非公安"}
                ],
                genders:[
                    {id:"男",name:"男"},
                    {id:"女",name:"女"}
                ],
                taskAssignList:[],
                addObj: {
                    name:'',
                    identify:'',
                    classify:'',
                    masterDepartment:'',
                    leadPolice:'',
                    personnelCategory:'',
                    relatedClass:'',
                    relatedDescription:'',
                    provinceCitiyDistrict:{
                        province: '',
                        city: '',
                        area: ''
                    },
                    currentAddress:'',
                    phoneNumber:'',
                    carPlates:'',
                    responsibilityUnitProp:'11',
                    responsibilityPerson:'',
                    shortNumber:'',
                    messagelongNumber:'',
                    gender:'',
                    passportNumber:'',
                    cooperatePolice:'',
                    phoneSerialNumber:'',
                    SIMCard:'',
                    mobileSignatureCode:'',
                    nonPoliceRelationOffice:'',
                    nonPoliceRelation:'',
                    nonPoliceRelationPhone:'',
                    QQ:'',
                    weChat:'',
                    bankCard:'',
                    keyRelation:'',
                    keyRelationName:'',
                    keyRelationIdentify:'',
                    keyRelationPhone:'',
                    taskid:'',
                    tasktype: '',
                    selfSetLabel:''
                }
            }
        },
        computed: {
            isShow:{
                get(){
                    return this.$store.getters.getIsShowAddMoreUpdate
                },
                set(val){
                    this.$store.commit('set_show_more_au', {flag: false})
                }
            }
        },
        mounted(){
            this.getMasterDepartments()
            this.getPoliceTypesByRole()
            this.getAllTask()
            this.initData()
        },
        destroyed(){
            this.$store.commit('set_update_obj', '')
        },
        methods: {
            getResponsibilityUnitDetail(val){
                this.responsibilityUnitDetail = val
            },
            getAddressDetail(val){
                this.addObj.currentAddress = val
            },
            onClassify(val){
                if(val == 1){
                    this.rules.nonPoliceRelation = [{ required: true, message: '请输入非公安口布控联系人', trigger: 'change'}]
                    this.rules.nonPoliceRelationOffice = [{ required: true, message: '请输入非公安口布控联系单位', trigger: 'change'}]
                    this.rules.nonPoliceRelationPhone =  [ { required: true, message: '请输入非公安口布控联系人手机号', trigger: 'change'}]
                } else {
                    this.rules.nonPoliceRelation = []
                    this.rules.nonPoliceRelationOffice = []
                    this.rules.nonPoliceRelationPhone = []
                }
            },
            getDetailForRuObj(data){
                let tempObj = ''
                if(data && data.length > 0){
                    tempObj = data[data.length -1]
                }
                if(tempObj){
                    let tempArr = tempObj.split('-')
                    let temStr = tempArr[3].replace('(','').replace(')','')
                    let tempStrArr = temStr.split(',')

                    return {
                        id: parseInt(tempArr[0]),
                        rank: parseInt(tempArr[1]),
                        label: tempArr[2],
                        indexStr: temStr,
                        indexArr: tempStrArr
                    }
                } else {
                    return {
                        id: -1,
                        rank: '',
                        label: '',
                        indexStr: '',
                        indexArr: ''
                    }
                }
            },
            getAllTask(){
                this.$store.dispatch('get_task_list', {limit:10000, page:1}).then((data)=>{
                    if(data.code == 200){
                        let tempTaskAssignList = this.$store.getters.getTaskList
                        if(tempTaskAssignList && tempTaskAssignList.result && (tempTaskAssignList.result.length > 0)){
                            let tempArr = [...tempTaskAssignList.result]
                            this.taskAssignList = tempArr
                        }
                    }
                })
            },
            getTaskTypes(id){
                let tempTaskAssignList = this.$store.getters.getTaskList
                if(tempTaskAssignList && tempTaskAssignList.result && (tempTaskAssignList.result.length > 0)){
                    let tempArr = [...tempTaskAssignList.result]
                    let filterArr = _.filter(tempArr, (item)=>{
                        return item.id == id
                    })
                    let tempObj = filterArr[0]

                    if(tempObj && tempObj.tasktype == 1){
                        this.addObj.tasktype = 1
                        this.tasktypeDisable = true
                    } else if(tempObj.tasktype == 2){
                        this.addObj.tasktype = 2
                        this.tasktypeDisable = true
                    } else {
                        this.tasktypeDisable = false
                    }
                }
            },
            onProvinceSelected(data){
                this.addObj.provinceCitiyDistrict.province = data
            },
            onCitySelected(data){
                this.addObj.provinceCitiyDistrict.city = data
            },
            onAreaSelected(data){
                this.addObj.provinceCitiyDistrict.area = data
            },
            initData(){
                let tempUpdateObj = Object.assign({}, this.$store.getters.getUpdateObj)
                this.originProvinceCitiyDistrict = tempUpdateObj.provinceCitiyDistrictStr
                let originResponsibilityPoliceID = tempUpdateObj.responsibilityPoliceID
                let originLeadPoliceID = tempUpdateObj.leadPoliceID
                let originResponsibilityUnitID = tempUpdateObj.responsibilityUnitID

                let updateObj = this.$store.getters.getUpdateObj
                if(updateObj){
                    let rules = Object.assign({}, this.$store.getters.getPeopleMoreAURules)
                    rules.identify = []
                    this.rules = rules

                    this.headerTitle = '批量修改重点人员'
                    this.addObj = Object.assign({}, this.$store.getters.getUpdateObj)
                    this.updateFlag = true
                } else {
                    this.updateFlag = false
                }
            },
            processParam(){
                let tempObj = Object.assign({}, this.addObj)
                let temPCD = Utils.generateAreaData(tempObj.provinceCitiyDistrict)
                if(temPCD && temPCD.name){
                    tempObj.provinceCitiyDistrict = temPCD.name
                } else {
                    tempObj.provinceCitiyDistrict = ''
                }

                if(!this.updateFlag){
                    let tempRespUnitObj = this.getDetailForRuObj(this.responsibilityUnitDetail)
                    tempObj.responsibilityUnit = tempRespUnitObj.id
                }
                if(tempObj.responsibilityUnit){
                    tempObj.responsibilityUnitProp = '已存在'
                }
                tempObj.personList = this.$store.getters.getUpdateObj
                tempObj.taskid = tempObj.taskid ? parseInt(tempObj.taskid): -1
                tempObj.classify = (tempObj.classify === null || tempObj.classify === '') ? -1 : parseInt(tempObj.classify)
                tempObj.tasktype = tempObj.tasktype ? parseInt(tempObj.tasktype): -1
                if(this.updateFlag){
                    let keyArr = Object.keys(tempObj)
                    keyArr.forEach((item, index, arry) => {
                        if(_.isInteger(parseInt(tempObj[item]))){
                            if(item == 'leadPolice'
                                || item =='personnelCategory'
                                || item =='classify'
                                || item =='relatedClass'
                                || item =='masterDepartment'){
                                tempObj[item] = parseInt(tempObj[item])
                            }
                        } else if(parseInt(tempObj[item + 'ID']) > -1){
                            tempObj[item] = parseInt(tempObj[item + 'ID'])
                        }
                    })
                }
                return tempObj
            },
            async getMasterDepartments(){
                let res = await getCategory(2)
                this.masterDepartments = _.filter(res.result, function(o) { return !(o.id == -1) })
            },
            async getPoliceTypesByRole(){
                let flag = localStorage.getItem('wz_user')
                let user = JSON.parse(flag)
                let res = await getPoliceTypeByRole(user.roleid)
                this.leadPolices = _.filter(res.result, function(o) { return !(o.id == -1) })
            },
            async getPersonnelCategorys(id){
                let res = await getPersonnelCategory(id)
                this.personnelCategorys = _.filter(res.result, function(o) { return !(o.id == -1) })
            },
            async getRelatedClasss(id){
                let res = await getPersonnelCategory(id)
                this.relatedClasss = _.filter(res.result, function(o) { return !(o.id == -1) })
            },
            getCPersonnelCategorys(id){
                this.personnelCategorys = []
                this.addObj.personnelCategory = ''
                this.relatedClasss = []
                this.addObj.relatedClass = ''
                this.getPersonnelCategorys(id)
            },
            getCRelatedClasss(id){
                this.relatedClasss = []
                this.addObj.relatedClass = ''
                this.getRelatedClasss(id)
            },
            cancelShowPcu(){
                this.$store.commit('set_show_more_au', {flag: false})
            },
            confirmShowPcu(formName) {
                let payload = this.processParam()
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$refs[formName].clearValidate()
                        this.confirmBtnLoading = true
                        let dispatchStr = 'save_people'
                        if(this.updateFlag){
                            dispatchStr = 'update_people'
                        }
                        this.$store.dispatch(dispatchStr, payload).then((data)=>{
                            let type = 'error'
                            this.confirmBtnLoading = false
                            if(data.code == 200){
                                type = 'success'
                                this.$store.commit('set_show_more_au', {flag: false})
                                this.$store.dispatch('get_people_list', { limit: this.$store.getters.getPageLimit, page: this.$store.getters.getCurrentPage}).then((data)=>{
                                    this.$store.commit('set_people_list', data)
                                })
                            }
                            this.$message({ type: type, message: data.message })
                        })
                    } else {
                        this.$message({ type:'error', message:'请按要求填写必要字段'})
                    }
                });
            }
        }
    }
</script>
<style scoped>

    .el-col-8{
        width: 390px;
    }


</style>
<style>
    .people-contain .addmoreupdate-wrapper .el-dialog{
        width:900px;
    }
    .people-contain .addmoreupdate-wrapper .el-dialog__body{
        padding-left: 80px;
        padding-top: 30px;
    }
</style>
