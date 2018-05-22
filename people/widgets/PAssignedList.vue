<template>
    <div>
        <el-dialog class="dialog-task-list" :title="headerTitle" :visible.sync="isShow">
            <p-search search-type="assigned"></p-search>
            <div class="innernav-wrapper">
                <div style="float:left">
                    <el-button type="primary" @click="removePeopleFromTask()" size="mini">删除人员</el-button>
                </div>
            </div>
            <p-table list-type="assigned"></p-table>
        </el-dialog>
    </div>
</template>

<script scoped>
    import pTable from '../widgets/PAssignedTable.vue'
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
                headerTitle:'已分配人员',
                setDispatchStr:'set_assigned_people_list'
            }
        },
        computed: {
            isShow:{
                get(){
                    return this.$store.getters.getIsShowAssigned
                },
                set(val){
                    this.$store.commit('set_assigned_au', false)
                }
            }
        },
        methods: {
            checkCurrentSelection(){
                let curSelection = this.$store.getters.getCurrentSelection
                let flag = true
                if(curSelection.length > 1 || curSelection.length == 0){
                    flag = false
                }
                return {flag:flag, curSelection:curSelection}
            },
            invokeRemovePeopleFromTask(flagData){
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
                    taskid: parseInt(this.$store.getters.getCurrentTaskId),
                    list: peopleArr
                }
                this.$store.dispatch('del_people_intask', obj).then((data)=>{
                    let type = 'error'
                    if(data.code == 200){
                        type = 'success'
                        let pobj = { 
                            limit:this.pageLimit, 
                            page:this.$store.getters.getCurrentPage,
                            taskid: parseInt(this.$store.getters.getCurrentTaskId)
                        }
                        this.$store.dispatch('get_people_assigned_list', pobj).then((data)=>{
                            this.$store.commit(this.setDispatchStr, data)
                        })
                    }
                    this.$message({ type: type, message: data.message }) 
                })
            },
            removePeopleFromTask() {
                let flagData = this.checkCurrentSelection()
                if(flagData.curSelection.length > 0){
                    this.$confirm('确定要删除吗?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                       this.invokeRemovePeopleFromTask(flagData)
                    }).catch(() => {
                        this.$message({ type: 'warning', message: '已取消删除' })         
                    })
                } else {
                    this.$message({ type:'warning', message:'请选择最少一条' })
                }
            }
        }
    }
</script>
<style scoped></style>