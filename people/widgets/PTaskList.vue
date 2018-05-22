<template>
    <div class="tasklist-wrapper">
        <p-taskTable></p-taskTable>
        <transition name="fade">
            <el-dialog class="control-level" @open="openCL" title="任务处置措施(必须)" :visible.sync="isShowControllevel">
                <el-form>
                    <el-form-item>
                        <el-radio :disabled="attentionDisable" v-model="controlLevel" label="2">关注</el-radio>
                        <el-radio :disabled="interceptDisable" v-model="controlLevel" label="1">拦截</el-radio>
                    </el-form-item>
                </el-form>
                <el-card>
                    <span class="tlt-header">请牢记以下操作步骤</span>
                    <ul class="task-level-tip">
                        <li class="tlt-item">当选择<span class="tlt-txt">关注</span>时，要前往当前页面 <span class="tlt-txt">待审核人员</span> 菜单，完成<span class="tlt-txt">入库和任务审核</span>，方能成功。</li>
                        <li class="tlt-item">当选择<span class="tlt-txt">拦截</span>时，要前往当前页面 <span class="tlt-txt">待审核人员</span> 菜单，完成<span class="tlt-txt">入库和任务审核</span>，然后要前往当前页面 <span class="tlt-txt">待审批人员</span> 菜单，同时完成<span class="tlt-txt">审批</span>操作，方能成功。</li>
                    </ul>
                </el-card>
                <div class="cl-footer">
                    <el-button  @click="confirmCl()" type="primary">确定</el-button>
                    <el-button  @click="cancelCl()" type="info">取消</el-button>
                </div>
            </el-dialog>
        </transition>
        <p-assignedList v-if="isShowAssigned"></p-assignedList>
        <p-assignList v-if="isShowAssignPeo"></p-assignList>
    </div>
</template>

<script>
    import pTaskTable from '../widgets/PTaskTable.vue'
    import pAssignedList from '../widgets/PAssignedList.vue'
    import pAssignList from '../widgets/PAssignList.vue'
    export default {
        data(){
            return {
                controlLevel: '',
                attentionDisable:false,
                interceptDisable:true
            }
        },
        components: {
            pTaskTable,
            pAssignedList,
            pAssignList
        },
        computed: {
            isShowAssigned(){
                return this.$store.getters.getIsShowAssigned
            },
            isShowAssignPeo(){
                return this.$store.getters.getIsShowAssignPeo
            },
            isShowControllevel:{
                get(){
                    return this.$store.getters.getIsShowCL
                },
                set(){ 
                    console.log('set_show_cl')
                }
            }
        },
        mounted(){
            this.initData();
        },
        methods: {
            openCL(){
                let taskType = parseInt(this.$store.getters.getTaskType)
                if(taskType == 1){
                    this.attentionDisable = true
                    this.interceptDisable = false
                    this.controlLevel = '1'
                }else if(taskType == 2){
                    this.attentionDisable = false
                    this.interceptDisable = true
                    this.controlLevel = '2'
                } else {
                    this.attentionDisable = false
                    this.interceptDisable = false
                    this.controlLevel = ''
                }
            },
            initData(){
                this.controlLevel = ''
            },
            confirmCl(){
                if(this.controlLevel){
                    this.$store.commit('set_control_level', this.controlLevel)
                    this.$store.commit('set_show_cl', false)
                    this.$store.commit('set_assignpeo_au', true)
                } else {
                    this.$message({
                        type: 'warning',
                        message: '请选择拦截或者关注'
                    })
                }
            },
            cancelCl(){
                this.$store.commit('set_show_cl', false)
            }
        }
    }
</script>
<style scoped>
    .cl-footer{
        margin-top: 10px;
    }
    .tlt-header{
        height: 40px;
        line-height: 40px;
        color:green;
        font-weight: 600;
        font-size: 14px;
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
        font-size: 14px;
        font-weight: 800;
    }
</style>