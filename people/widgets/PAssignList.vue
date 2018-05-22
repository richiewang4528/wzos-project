<template>
    <div>
      <el-dialog class="dialog-task-list" :title="headerTitle" :visible.sync="isShow">
          <p-search search-type="nonAssigned"></p-search>
          <div class="innernav-wrapper">
            <div style="float:left">
               <el-button  @click="addPeopleToTask()" type="primary" size="mini">添加到此任务</el-button>
            </div>
          </div>
          <p-table list-type="nonAssigned"></p-table>
      </el-dialog>
    </div>
</template>

<script>
    import pTable from '../widgets/PAssignTable.vue'
    import pSearch from '../widgets/PSearch.vue'
    export default {
        components:{
            pTable,
            pSearch
        },
        data(){
            return {
                pageLimit: this.$store.getters.getPageLimit,
                currentPage: this.$store.getters.getCurrentPage,
                headerTitle:'添加人员',
                controlLevel: this.$store.getters.getControlLevel,
                setDispatchStr:'set_assign_people_list'
            }
        },
        computed: {
            isShow:{
                get(){
                    return this.$store.getters.getIsShowAssignPeo
                },
                set(val){
                    this.$store.commit('set_assignpeo_au', false)
                }
            }
        },
        mounted(){
            this.initData();
        },
        methods: {
            initData(){
                this.$store.dispatch('get_assigned_list')
            },
            invokeAddPeopleToTask(flagData){
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
                    controlLevel: parseInt(this.$store.getters.getControlLevel),
                    taskid: parseInt(this.$store.getters.getCurrentTaskId),
                    list: peopleArr
                }
                this.$store.dispatch('add_people_totask', obj).then((data)=>{
                    let type = 'error'
                    if(data.code == 200){
                        type = 'success'
                        let pobj = { 
                            limit:this.pageLimit, 
                            page:this.$store.getters.getCurrentPage,
                            taskid: parseInt(this.$store.getters.getCurrentTaskId)
                        }
                        this.$store.dispatch('get_people_nonAssigned_list', pobj).then((data)=>{
                            this.$store.commit(this.setDispatchStr, data)
                        })
                    }
                    this.$message({ type: type, message: data.message }) 
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
            addPeopleToTask() {
                let flagData = this.checkCurrentSelection()
                if(flagData.curSelection.length > 0){
                    this.$confirm('确定要添加吗?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.invokeAddPeopleToTask(flagData)
                    }).catch(() => {
                        this.$message({ type: 'warning', message: '已取消添加' })         
                    })
                } else {
                    this.$message({ type:'warning', message:'请选择最少一条' })
                }
            }
        }
    }
</script>
<style scoped></style>