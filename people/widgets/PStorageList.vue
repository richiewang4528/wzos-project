<template>
    <div>
        <div class="innernav-wrapper">
            <div style="float:left">
               <el-button  @click="passStorageAudit()" :loading="passStorageAuditLoading" class="abitem" type="primary" size="mini">入库审核通过</el-button>
               <el-button  @click="notPassStorageAudit()"  class="abitem" type="danger" size="mini">入库审核不通过</el-button>
            </div>
        </div>
        <p-table list-type="audit"></p-table>
        <transition name="fade">
            <el-dialog class="control-level" title="请输入不通过的原因" :visible.sync="isShowNPR">
                <el-form>
                    <el-form-item>
                        <el-input type="textarea" v-model="notPassReason"></el-input>
                    </el-form-item>
                </el-form>
                <div class="cl-footer">
                    <el-button  @click="confirmNPR()" :loading="confirmNPRLoading" type="primary">确定</el-button>
                    <el-button  @click="cancelNPR()" type="info">取消</el-button>
                </div>
            </el-dialog>
        </transition>
    </div>
</template>

<script>
    import pTable from '../widgets/PStorageTable.vue'
    export default {
        components:{
            pTable
        },
        data(){
            return {
                pageLimit: this.$store.getters.getPageLimit,
                currentPage: this.$store.getters.getCurrentPage,
                notPassReason: '',
                
                isShowNPR: false,
                notPassType:'',
                confirmNPRLoading: false,
                passStorageAuditLoading: false,
                setDispatchStr:'set_storage_people_list'
            }
        },
        methods: {
            checkCurrentSelection(storageflag){
                let curSelection = this.$store.getters.getStorageSelections
                let flag = true
                if(curSelection.length > 1 || curSelection.length == 0){
                    flag = false
                }
                return {flag:flag, curSelection:curSelection}
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
                    reason: this.notPassReason,
                    list:peopleArr
                }
                this.$store.dispatch(dispatchPassStr, obj).then((data)=>{
                    let type = 'error'
                    if(passed == 1){
                        this.passStorageAuditLoading = false
                    } else {
                        this.confirmNPRLoading = false
                    }
                    if(data.code == 200){
                        type = 'success'
                        if(passed == 2){
                            this.isShowNPR = false
                        }
                        this.$store.dispatch('get_people_storage_list',  { limit:this.pageLimit, page:this.$store.getters.getCurrentPage}).then((data)=>{
                            this.$store.commit(this.setDispatchStr, data)
                        })
                    }
                    let message = '<span style="color:red;">' + data.message + '</span><br/>'
                    if(data.result && data.result.length>0){
                        data.result.forEach((item)=>{
                            message = message + item + '<br/>'
                        })
                    }
                    this.$alert(message, '处理结果', { dangerouslyUseHTMLString:true })  
                })
            },
            passStorageAudit() {
                let flagData = this.checkCurrentSelection(true)
                if(flagData.curSelection.length > 0){
                    this.passStorageAuditLoading = true
                    this.$confirm('入库将会通过审核?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.invokePassAudit(flagData, 1, 'pass_audit_stroage')
                    }).catch(() => {
                        this.passStorageAuditLoading = false
                        this.$message({ type: 'warning', message: '已取消通过入库审核' })         
                    })
                } else {
                    this.$message({ type:'warning', message:'请选择最少一条' })
                }
            },
            notPassStorageAudit() {
                this.notPassType = 'storage'
                this.isShowNPR = true
            },
            confirmNPR(){
                let confirmMessage = '入库将不会通过审核?'
                let flagData = this.checkCurrentSelection(true)
                let dispatchStr = 'pass_audit_stroage'
                if(flagData.curSelection.length > 0){
                    this.confirmNPRLoading = true
                    this.$confirm(confirmMessage, '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.invokePassAudit(flagData, 2, dispatchStr)
                    }).catch((e) => {
                        this.confirmNPRLoading = false
                        this.$message({ type: 'warning', message: '已取消审核' })         
                    })
                } else {
                    this.$message({ type:'warning', message:'请选择最少一条' })
                }
            },
            cancelNPR(){
                this.isShowNPR = false
            }
        }
    }
</script>
<style scoped></style>