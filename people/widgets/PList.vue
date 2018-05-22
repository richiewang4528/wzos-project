<template>
    <div>
        <div class="innernav-wrapper">
            <div style="float:left">
                <el-button @click="addNewPeople()"  type="primary" size="mini">新增人员</el-button>
                <el-button @click="updatePeople()"  type="primary" size="mini">修改人员</el-button>
                <el-button @click="assignTask()"  :loading="assignTaskLoading" type="success" size="mini">分配任务</el-button>
                <el-button @click="storagePeople()"  v-if="(auth == 3)" type="warning" size="mini">人员入库审核</el-button>
                <el-button @click="deletePeople()" v-if="(auth == 3)"  :loading="deleteLoading" type="danger" size="mini">删除人员</el-button>
            </div>
            <div style="float:right">
                <el-button @click="showImport()" type="primary" size="mini">导入数据</el-button>
                <el-button @click="exportCsvFile()" :loading="exportCsvFileLoading" type="success" size="mini">导出数据</el-button>
                <el-button type="warning" size="mini"  @click="showCustomColumn">自定义字段<i :class="toggleMore"></i></el-button>
            </div>
        </div>


        <transition name="fade">
            <el-dialog class="control-level" @open="openTl" title="任务处置措施(必须)" :visible.sync="isShowControllevel">
                <el-form>
                    <el-form-item>
                        <el-radio v-model="controlLevel" :disabled="attentionDisable" label="2">关注</el-radio>
                        <el-radio v-model="controlLevel" :disabled="interceptDisable" label="1">拦截</el-radio>
                    </el-form-item>
                </el-form>
                <el-card>
                    <span class="tlt-header">请牢记以下操作步骤</span>
                    <ul class="task-level-tip">
                        <li class="tlt-item">当选择<span class="tlt-txt">关注</span>时，要前往当前页面 <span class="tlt-txt">待审核人员</span> 菜单，完成<span class="tlt-txt">入库和任务审核</span>，方能成功。</li>
                        <li class="tlt-item">当选择<span class="tlt-txt">拦截</span>时，要前往当前页面 <span class="tlt-txt">待审核人员</span> 菜单，完成<span class="tlt-txt">入库和任务审核</span>，然后要前往当前页面 <span class="tlt-txt">待审批人员</span> 菜单，同时完成<span class="tlt-txt">审批</span>操作，方能成功。</li>
                    </ul>
                </el-card>
                <div class="cl-footer" >
                    <el-button  :loading="confirmClLoading" @click="confirmCl()" type="primary">确定</el-button>
                    <el-button  @click="cancelCl()" type="info">取消</el-button>
                </div>
            </el-dialog>
        </transition>
        <transition name="fade">
            <el-dialog class="control-level" title="选择任务列表" :visible.sync="isShowTaskList">
                <el-table
                    :data="taskList.result"
                    @current-change="handleCTask"
                    max-height="350"
                    size="mini"
                    highlight-current-row
                    style="width: 100%">
                    <el-table-column
                      label="任务名称"
                      prop="name"
                      ></el-table-column>
                </el-table>
                <div class="tl-footer">
                    <el-button  @click="confirmTL()" type="primary">确定</el-button>
                    <el-button  @click="cancelTL()" type="info">取消</el-button>
                </div>
            </el-dialog>
        </transition>

        <wz-importexcelfile
            :url="this.$store.getters.getPeopleUploadUrl"
            download="重点人批量导入模板暨系统中重点人员信息字段.xls"
            cburl="get_people_list"></wz-importexcelfile>

        <el-collapse-transition>
            <div v-if="isShowCC" style="width: 100%;">
                <p-customColumn></p-customColumn>
            </div>
        </el-collapse-transition>
        <p-table :list-type="listType"></p-table>
        <p-addUpdate v-if="isShowPcu"></p-addUpdate>
        <p-addMoreUpdate v-if="isShowMore"></p-addMoreUpdate>
    </div>
</template>

<script>
    import _ from 'lodash'
    import pTable from '../widgets/PKeyPeopleTable.vue'
    import pCustomColumn from '../widgets/PCusColumn.vue'
    import pAddUpdate from '../widgets/PAddUpdate.vue'
    import pAddMoreUpdate from '../widgets/PAddMoreUpdate.vue'
    import wzImportexcelfile from '../../../components/WzImportExcelFile.vue'
    export default {
        components:{
            pTable,
            pCustomColumn,
            pAddUpdate,
            pAddMoreUpdate,
            wzImportexcelfile
        },
        data(){
            return {
                listType: 'all',
                deleteLoading: false,
                exportCsvFileLoading:false,
                assignTaskLoading: false,
                confirmClLoading: false,
                isShowTaskList: false,
                isShowControllevel:false,
                attentionDisable:false,
                interceptDisable:true,
                setDispatchStr:'set_people_list',
                toggleMore:'el-icon-arrow-down',
                controlLevel: '',
                taskSelection:'',
                taskList: '',
                auth:0,
                activeName: 'second'
            }
        },
        computed: {
            isShowPcu(){
                return this.$store.getters.getIsShowAddUpdate
            },
            isShowMore(){
                return this.$store.getters.getIsShowAddMoreUpdate
            },
            isShowCC(){
                return this.$store.getters.getIsShowCC
            }
        },
        destroyed(){
            this.controlLevel = ''
            this.$store.commit('set_show_cc', false)
        },
        mounted(){
            let auth = JSON.parse(localStorage.getItem('wz_user'))
            this.auth = parseInt(auth.auth)
        },
        methods: {
            showImport(){
                this.$store.commit('set_show_dialog', true)
            },
            invokeExportCsvFile(flagData){
                let strArr = flagData.curSelection
                let exportStr = ''
                let customColumns = this.$store.getters.getCustomColumns
                let peopleFileds = this.$store.getters.getPeopleFields
                let headerTxt = ''
                let contentTxt = ''
                for(let item in customColumns){
                    if(customColumns[item] && peopleFileds[item]){
                        headerTxt += peopleFileds[item] + ','
                    }
                }
                headerTxt += '\n'
                strArr.forEach((item)=>{
                    let keys = Object.keys(peopleFileds)
                    keys.forEach((key)=>{
                        if(customColumns[key]){
                            let reg = new RegExp(',', 'g')
                            if(item[key] && _.isString(item[key])){
                                item[key] = item[key].replace(reg, ' \t')
                            }
                            if(key == 'identify'
                                || key == 'phoneNumber'
                                || key == 'nonPoliceRelationPhone'
                                || key == 'keyRelationPhone'
                                || key == 'bankCard'
                                || key == 'shortNumber'
                                || key == 'phoneSerialNumber'
                                || key == 'QQ'
                                || key == 'messagelongNumber'){
                                if(item[key] == undefined){
                                    item[key] = ' '
                                }
                                contentTxt += item[key] + " \t" + ','
                            } else{
                                if(item[key] == undefined){
                                    item[key] = ' '
                                }
                                contentTxt += item[key] + ','
                            }
                        }
                    })
                    contentTxt += '\n'
                })

                let blob = new Blob(['\ufeff' + headerTxt + contentTxt], { type: 'text/csv,charset=UTF-8'})
                let link = document.createElement('a')
                link.download = '重点人员-' + new Date().toLocaleString() + '.csv'
                link.href = URL.createObjectURL(blob)
                let event = document.createEvent('MouseEvents')
                event.initMouseEvent('click', true, true, window, 1, 0, 0, 0, 0, false, false, false, false, 0, null)
                link.dispatchEvent(event)
            },
            exportCsvFile(){
                let flagData = this.checkCurrentSelection()
                if(flagData.curSelection.length > 0){
                    this.$confirm('确定导出这些文件文件吗?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.invokeExportCsvFile(flagData)
                    }).catch((e) => {
                        console.log(e)
                        this.$message({
                            type: 'warning',
                            message: '已取消删除'
                        })
                    })
                } else {
                    this.$message({
                        type:'warning',
                        message:'请选择最少一条'
                    })
                }
            },
            handleCTask(val){
                this.taskSelection = val
            },
            checkCurrentSelection(){
                let curSelection = this.$store.getters.getCurrentSelection
                let flag = true
                if(curSelection.length > 1 || curSelection.length == 0){
                    flag = false
                }
                return {flag:flag, curSelection:curSelection}
            },
            addNewPeople(){
                this.$store.commit('set_show_au', {flag:true})
            },
            showCustomColumn(){
                let isShowCC = this.$store.getters.getIsShowCC
                if(this.toggleMore === 'el-icon-arrow-down'){
                    this.toggleMore = 'el-icon-arrow-up'
                } else {
                    this.toggleMore = 'el-icon-arrow-down'
                }
                this.$store.commit('set_show_cc', !isShowCC)
            },
            updatePeople(){
                let flagData = this.checkCurrentSelection()
                let updatePayload = flagData.curSelection

                if(flagData.flag){
                    console.log('updatePayload')
                    console.log(updatePayload)
                    this.$store.commit('set_show_au', {
                        flag: true,
                        data: updatePayload[0] })
                } else {
                    this.$store.commit('set_show_more_au', {
                        flag: true,
                        data: updatePayload })

                }
            },
            invokePassAudit(flagData, passed, dispatchPassStr){
                let fcObj = flagData.curSelection
                let peopleArr = []
                fcObj.forEach((item, index, array) => {
                    let peopleObj = {
                        identify: item.identify,
                        responsibilityUnit: parseInt(item.responsibilityUnitID),
                        responsibilityPolice: parseInt(item.responsibilityPoliceID)
                    }
                    peopleArr.push(peopleObj)
                })
                let obj = {
                    passed: passed,
                    list:peopleArr
                }
                this.$store.dispatch(dispatchPassStr, obj).then((data)=>{
                    let type = 'error'
                    if(data.code == 200){
                        type = 'success'
                        this.$store.dispatch('get_people_list', { limit: this.$store.getters.getPageLimit, page: this.$store.getters.getCurrentPage }).then((data)=>{
                            this.$store.commit('set_people_list', data)
                        })
                    }
                    let message = '<span style="color:red;">' + data.message + '</span><br/>'
                    if(data.result && data.result.length>0){
                        data.result.forEach((item)=>{
                            message = message + item + '<br/>'
                        })
                    }
                    this.$alert(message, '处理结果', {
                        dangerouslyUseHTMLString:true
                    })
                })
            },
            storagePeople(evt){
                let flagData = this.checkCurrentSelection()
                if(flagData.curSelection.length > 0){
                    this.$confirm('入库将会通过审核?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.invokePassAudit(flagData, 1, 'pass_audit_stroage')
                    }).catch(() => {
                        this.$message({
                            type: 'warning',
                            message: '已取消通过入库审核'
                        })
                    })
                } else {
                    this.$message({
                        type:'warning',
                        message:'请选择最少一条'
                    })
                }
            },
            deletePeople(evt) {
                let flagData = this.checkCurrentSelection()
                if(flagData.curSelection.length > 0){
                    this.deleteLoading = true
                    this.$confirm('此操作将删除文件, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        let fcObj = flagData.curSelection
                        let delArr = []
                        fcObj.forEach((item, index, array) => {
                            let delObj = {
                                identify: item.identify,
                                responsibilityUnit: parseInt(item.responsibilityUnitID),
                                responsibilityPolice: parseInt(item.responsibilityPoliceID)
                            }
                            delArr.push(delObj)
                        })
                        this.$store.dispatch('del_key_people', delArr).then((data)=>{
                            let type = 'error'
                            this.deleteLoading = false
                            if(data.code == 200){
                                type = 'success'
                                this.$store.dispatch('get_people_list', { limit: this.$store.getters.getPageLimit, page: this.$store.getters.getCurrentPage }).then((data)=>{
                                    this.$store.commit('set_people_list', data)
                                })
                            }
                            this.$message({
                                type: type,
                                message: data.message
                            })
                        })
                    }).catch(() => {
                        this.deleteLoading = false
                        this.$message({
                            type: 'warning',
                            message: '已取消删除'
                        })
                    })
                } else {
                    this.$message({
                        type:'warning',
                        message:'请选择最少一条'
                    })
                }
            },
            assignTask(){
                let flagData = this.checkCurrentSelection()
                if(flagData.curSelection.length > 0){
                    this.assignTaskLoading = true
                    this.$store.dispatch('get_task_list', {limit:10000, page:1}).then((data)=>{
                        this.assignTaskLoading = false
                        if(data.code == 200){
                            this.isShowTaskList =  true
                            this.taskList = this.$store.getters.getTaskList
                        } else {
                            this.$message({
                                type: 'error',
                                message:  data.message ? data.message : '加载失败'
                            })
                        }
                    })
                } else {
                    this.$message({
                        type:'warning',
                        message:'请选择最少一条'
                    })
                }
            },
            openTl(){
                if(this.taskSelection){
                    this.isShowControllevel = true
                    let tempObj = this.taskSelection
                    if(tempObj){
                        if(tempObj.tasktype == 1){
                            this.attentionDisable = true
                            this.interceptDisable = false
                            this.controlLevel = '1'
                        }else if(tempObj.tasktype == 2){
                            this.attentionDisable = false
                            this.interceptDisable = true
                            this.controlLevel = '2'
                        } else {
                            this.attentionDisable = false
                            this.interceptDisable = false
                            this.controlLevel = ''
                        }
                    }
                } else {
                    this.$message({
                        type: 'warning',
                        message: '请选择其中一个任务'
                    })
                }
            },
            confirmTL(){
                if(this.taskSelection){
                    this.isShowControllevel = true
                    let tempObj = this.taskSelection
                    if(tempObj){
                        if(tempObj.tasktype == 1){
                            this.attentionDisable = true
                            this.interceptDisable = false
                        }else if(tempObj.tasktype == 2){
                            this.attentionDisable = false
                            this.interceptDisable = true
                        } else {
                            this.attentionDisable = false
                            this.interceptDisable = false
                        }
                    }
                } else {
                    this.$message({
                        type: 'warning',
                        message: '请选择其中一个任务'
                    })
                }
            },
            cancelTL(){
                this.isShowTaskList =  false
            },
            procesData(){
                let flagData = this.checkCurrentSelection()
                let peopleList = []
                let taskList = []
                flagData.curSelection.forEach((item)=>{
                    peopleList.push({
                        identify: item.identify,
                        responsibilityUnit: parseInt(item.responsibilityUnitID),
                        responsibilityPolice: parseInt(item.responsibilityPoliceID)
                    })
                })
                taskList.push(parseInt(this.taskSelection.id))
                let tempObj = {
                    controlLevel: parseInt(this.controlLevel),
                    peopleList: peopleList,
                    taskList: taskList
                }

                return tempObj
            },
            confirmCl(){
                if(this.controlLevel){
                    let payload = this.procesData()
                    this.confirmClLoading = true
                    this.$store.dispatch('assign_task_people', payload).then((data)=>{
                        this.confirmClLoading = false
                        if(data.code == 200){
                            this.$message({
                                type: 'success',
                                message:  data.message ? data.message : '分配任务成功'
                            })
                            this.isShowControllevel = false
                            this.isShowTaskList =  false
                        } else {
                            this.$message({
                                type: 'error',
                                message:  data.message ? data.message : '加载失败'
                            })
                        }
                    })

                } else {
                    this.$message({
                        type: 'warning',
                        message: '请选择拦截或者关注'
                    })
                }
            },
            cancelCl(){
                this.isShowControllevel = false
            }
        }
    }
</script>
<style scoped>
    .tl-footer{
        margin-top: 20px;
    }
    .tlt-header{
        height: 40px;
        line-height: 40px;
        color:green;
        font-weight: 600;
        font-size: 16px;
    }
    .cl-footer{
        margin-top: 10px;
    }
    .task-level-tip{
        width: 100%;
        min-height: 100px;
        text-align: left;
    }
    .task-level-tip .tlt-item{
        list-style: decimal;
        min-height: 60px;
    }
    .task-level-tip .tlt-item .tlt-txt{
        display: inline-block;
        padding:0 2px;
        color:red;
        font-size: 16px;
        font-weight: 800;
    }
</style>
