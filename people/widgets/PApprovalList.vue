<template>
    <div >
        <div class="innernav-wrapper">
            <div style="float:left">
               <el-button @click="passApproval()" type="primary" size="mini">审批通过</el-button>
               <el-button @click="notPassApproval()" type="danger" size="mini">审批不通过</el-button>
            </div>
        </div>
        <p-table list-type="approval"></p-table>
        <transition name="fade">
            <el-dialog class="control-level" title="请输入不通过的原因" :visible.sync="isShowNPR">
                <el-form>
                    <el-form-item>
                        <el-input type="textarea" v-model="notPassReason"></el-input>
                    </el-form-item>
                </el-form>
                <div class="cl-footer">
                    <el-button  @click="confirmNPR()" :loading="confirmNPRloading" type="primary">确定</el-button>
                    <el-button  @click="cancelNPR()" type="info">取消</el-button>
                </div>
            </el-dialog>
        </transition>
    </div>
</template>

<script>
    import pTable from '../widgets/PApprovalTable.vue'
    export default {
        components:{
            pTable
        },
        data(){
            return {
                notPassReason:'',
                isShowNPR:false,
                setDispatchStr:'set_approval_people_list',
                confirmNPRloading:false
            }
        },
        computed: {
        },
        mounted(){
        },
        methods: {
            invokeApproval(flagData, passedNum){
                let fcObj = flagData.curSelection
                let peopleArr = []
                fcObj.forEach((item, index, array) => {
                    let peopleObj = {
                        identify: item.identify,
                        responsibilityUnit: parseInt(item.responsibilityUnitID),
                        responsibilityPolice: parseInt(item.responsibilityPoliceID),
                        taskid: parseInt(item.taskid),
                        tasktype: parseInt(item.tasktype)
                    }
                    peopleArr.push(peopleObj)
                })
                let obj = {
                    passed: passedNum,
                    reason: this.notPassReason,
                    list: peopleArr
                }
                this.$store.dispatch('pass_approval_people', obj).then((data)=>{
                    let type = 'error'
                    if(passedNum == 1){
                        this.passStorageAuditLoading = false
                    } else {
                        this.confirmNPRLoading = false
                    }
                    if(data.code == 200){
                        type = 'success'
                        if(passedNum == 2){
                            this.isShowNPR = false
                        }
                        this.$store.dispatch('get_people_approval_list', { limit:this.$store.getters.getPageLimit, page:this.$store.getters.getCurrentPage}).then((data)=>{
                                    this.$store.commit(this.setDispatchStr, data)
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
            checkCurrentSelection(){
                let curSelection = this.$store.getters.getCurrentSelection
                let flag = true
                if(curSelection.length > 1 || curSelection.length == 0){
                    flag = false
                }
                return {flag:flag, curSelection:curSelection}
            },
            passApproval() {
                let flagData = this.checkCurrentSelection()
                if(flagData.curSelection.length > 0){
                    this.passStorageAuditLoading = true
                    this.$confirm('此操作将会通过审批?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.invokeApproval(flagData, 1)
                    }).catch(() => {
                        this.passStorageAuditLoading = false
                        this.$message({
                            type: 'warning',
                            message: '已取消审批'
                        })         
                    })
                } else {
                    this.$message({
                        type:'warning',
                        message:'请选择最少一条'
                    })
                }
            },
            notPassApproval() {
                this.isShowNPR = true
            },
            confirmNPR(){
                let flagData = this.checkCurrentSelection()
                if(flagData.curSelection.length > 0){
                    this.confirmNPRLoading = true
                    this.invokeApproval(flagData, 2)
                } else {
                    this.$message({
                        type:'warning',
                        message:'请选择最少一条'
                    })
                }
            },
            cancelNPR(){
                this.isShowNPR = false
            }
        }
    }
</script>
<style scoped></style>