<template>
    <div>
        <p-table list-type="noAuditApproval"></p-table>
        <transition name="fade">
            <el-dialog class="control-level" title="请输入不通过的原因" :visible.sync="isShowReason">
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
    import pTable from '../widgets/PNotAuditApprovalTable.vue'
    export default {
        components:{
            pTable
        },
        data(){
            return {
                currentPage: this.$store.getters.getCurrentPage,
                notPassReason:'',
                confirmNPRLoading:false,
                setDispatchStr:'set_auditapproval_people_list',
            }
        },
        computed: {
            isShowReason:{
                get(){
                    return this.$store.getters.getIsShowReason
                },
                set(){ 
                    console.log('set_show_cl')
                }
            }
        },
        mounted(){
        },
        methods: {
            cancelNPR(){
                this.$store.commit('set_show_reason', false)
            },
            confirmNPR() {
                let curSelection = this.$store.getters.getCurrentSelection
                let item = curSelection[0]
                let obj = {
                    id: parseInt(item.id),
                    reason: this.notPassReason
                }
                this.confirmNPRLoading = true
                this.$store.dispatch('change_notpass_reason', obj).then((data)=>{
                    this.confirmNPRLoading = false
                    let type = 'error'
                    if(data.code == 200){
                        type = 'success'
                        this.$store.dispatch('get_people_noAuditApproval_list',  { limit:this.$store.getters.getPageLimit, page:this.$store.getters.getCurrentPage}).then((data)=>{
                            this.$store.commit(this.setDispatchStr, data)
                        })
                        this.$store.commit('set_show_reason', false)
                    }
                    this.$message({
                        type: type,
                        message: data.message
                    }) 
                })

            }
        }
    }
</script>
<style scoped></style>