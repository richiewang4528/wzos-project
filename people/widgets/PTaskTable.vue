<template>
    <div>
        <el-table 
            :data="taskList.result"
            border
            stripe
            size="mini"
            tooltip-effect="dark">
            <el-table-column
                label="序号"
                type="index"
                width="80"></el-table-column>
            <el-table-column
              label="任务名称"
              prop="name"
              :show-overflow-tooltip="true"
              min-width="120"></el-table-column>
            <el-table-column
              prop="createOffice"
              label="创建部门"
              :show-overflow-tooltip="true"
              min-width="150"></el-table-column>
            <el-table-column
              prop="createPerson"
              label="创建人"
              :show-overflow-tooltip="true"
              min-width="120"></el-table-column>
            <el-table-column
              prop="createTime"
              label="创建时间"
              width="170"></el-table-column>
            <el-table-column
              prop="startTime"
              label="任务开始时间"
              width="170"></el-table-column>
            <el-table-column
              prop="description"
              label="任务说明"
              :show-overflow-tooltip="true"
              min-width="180"></el-table-column>
            <el-table-column
              prop="endTime"
              label="任务结束时间"
              width="170"></el-table-column>
            <el-table-column label="操作" width="240">
                <template slot-scope="scope">
                    <el-button  @click="showAssigned(scope.row)" type="success" size="mini">已分配人员</el-button>
                    <el-button  @click="showControlLevel(scope.row)" type="warning" size="mini">补充人员</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="alignItem">
            <el-pagination
              background
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page.sync="currentPage"
              :page-size="pageSize"
              layout="total, prev, pager, next, jumper"
              :total="taskList.total">
            </el-pagination>     
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                pageSize: this.$store.getters.getPageSize,
                currentPage: this.$store.getters.getCurrentPage
            }
        },
        computed: {
            taskList(){
                return this.$store.getters.getTaskList
            }
        },
        mounted(){
            this.initData()
        },
        destroyed(){
            this.$store.commit('set_current_page', 1)
        },
        methods: {
            loadData(payload){
                this.$store.dispatch('get_task_list', payload).then((data)=>{
                    if(data.code !== 200){
                        this.$message({
                            type: 'error',
                            message:  data.message ? data.message : '加载失败'
                        }) 
                    }
                })
            },
            initData(){
                this.loadData({limit: this.$store.getters.getPageLimit, page: this.$store.getters.getCurrentPage})
            },
            handleSizeChange(val) {
                console.log(`每页${val} 条`)
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`)
                this.$store.commit('set_current_page', val)
                let isSearching = this.$store.getters.getIsTaskSearching
                let searchObj = this.$store.getters.getTaskSearchObj
                let payload
                if(isSearching){
                    searchObj.limit = this.$store.getters.getPageLimit
                    searchObj.page = val
                    payload = searchObj
                } else {
                    payload = {
                        limit: this.$store.getters.getPageLimit,
                        page: val
                    }
                }
                this.loadData(payload)
            },
            showControlLevel(item){
                console.log('item.tasktype')
                console.log(item.tasktype)
                this.$store.commit('set_task_type', item.tasktype) 
                this.$store.commit('set_current_taskid', item.id) 
                this.$store.commit('set_show_cl', true)
            },
            showAssigned(item){
                this.$store.commit('set_current_taskid', item.id)
                this.$store.commit('set_assigned_au', true)
            }
        }
    }
</script>
<style scoped></style>