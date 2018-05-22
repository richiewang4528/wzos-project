<template>
    <div class="search-wrapper">
        <el-form :inline="true" 
            size="mini"  
            :label-position="labelPosition" 
            :model="searchObj">
            <el-form-item prop="name" label="任务名称">
                <el-input v-model="searchObj.name"></el-input>
            </el-form-item>
            <el-form-item prop="createPerson" label="创建人">
                <el-input v-model="searchObj.createPerson"></el-input>
            </el-form-item>
            <wz-datetime labelstr="创建时间" v-on:getDuringtime="getCreateDateTime"></wz-datetime>
            <wz-datetime labelstr="任务开始时间" v-on:getDuringtime="getTaskStartDateTime"></wz-datetime>
            <wz-datetime labelstr="任务结束时间" v-on:getDuringtime="getTaskEndDateTime"></wz-datetime>
        </el-form>
        <div class="search-btns">
            <el-button @click="searchTaskList" :loading="searchTaskListLoading" class="sitem-btn" round size="mini">搜索</el-button>
            <el-button @click="clearSearchObj" :loading="clearSearchObjLoading" class="sitem-btn" round size="mini">重置</el-button>
        </div>
    </div>
</template>

<script>
    import wzDatetime from '../../../components/DateTimeDuring.vue'
    export default {
        components: { 
            wzDatetime
        },
        data(){
            return{
                currentPage: this.$store.getters.getCurrentPage,
                labelPosition:'right',
                createOffices:[],
                searchTaskListLoading: false,
                clearSearchObjLoading: false,
                
                searchObj:{
                    name:'',                
                    createOffice:'',                
                    createPerson:'',                
                    createTimeStr:'',               
                    startTimeStr: '',
                    endTimeStr: '',
                    limit: this.$store.getters.getPageLimit,
                    page:1               
                }
            }
        },
        methods: {
            getCreateDateTime(val){
                this.searchObj.createTimeStr = val
            },
            getTaskStartDateTime(val){
                this.searchObj.startTimeStr = val
            },
            getTaskEndDateTime(val){
                this.searchObj.endTimeStr = val
            },
            processData(){
                let tempParam = this.searchObj
                let payload = Object.assign({}, this.searchObj)
                if(tempParam.createTimeStr){
                    payload.createTimeStr = new Date(tempParam.createTimeStr[0]).getTime() + ',' + new Date(tempParam.createTimeStr[1]).getTime() 
                }
                if(tempParam.startTimeStr){
                    payload.startTimeStr = new Date(tempParam.startTimeStr[0]).getTime() + ',' + new Date(tempParam.startTimeStr[1]).getTime() 
                }
                if(tempParam.endTimeStr){
                    payload.endTimeStr = new Date(tempParam.endTimeStr[0]).getTime() + ',' + new Date(tempParam.endTimeStr[1]).getTime() 
                }

                return payload
            },
            loadDataCallback(data, cflag){
                if(data.code == 200){
                    let blean = true
                    if(cflag){
                        blean = false
                    }
                    this.$store.commit('set_people_tsearchobj', this.processData()) 
                    this.$store.commit('set_people_tsearching', blean) 
                } else {
                    this.$message({
                        type: 'error',
                        message:  data.message ? data.message : '加载失败'
                    })
                }
            },
            searchTaskList(){
                let payload = this.processData()
                this.searchTaskListLoading = true
                this.$store.dispatch('get_task_list', payload).then((data)=>{
                    this.searchTaskListLoading = false
                    this.loadDataCallback(data, false)
                })
            },
            clearSearchObj(){
                this.searchObj = {
                    name:'',                
                    createOffice:'',                
                    createPerson:'',                
                    createTimeStr:'',               
                    startTimeStr: '',
                    endTimeStr: '',
                    limit: this.$store.getters.getPageLimit,
                    page: 1 
                }
                this.clearSearchObjLoading = true
                this.$store.dispatch('get_task_list', this.searchObj).then((data)=>{
                    this.clearSearchObjLoading = true
                    this.loadDataCallback(data, true)
                })
            }
        }
    }
</script>
<style scoped></style>
