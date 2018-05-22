<template>
    <div>
        <div class="header-title">安保任务列表</div> 
        <p-taskSearch></p-taskSearch>
        <p-taskList></p-taskList>
    </div>
</template>

<script>
    import pTaskSearch from './widgets/PTaskSearch.vue'
    import pTaskList from './widgets/PTaskList.vue'
    export default {
        components:{
            pTaskSearch,
            pTaskList
        }
    }
</script>
<style scoped></style>
