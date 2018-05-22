<template>
    <div>
        <div class="header-title">待入库审核人员列表</div> 
        <p-search search-type="storage"></p-search>
        <p-storageList></p-storageList>
    </div>
</template>

<script>
    import pSearch from './widgets/PSearch.vue'
    import pStorageList from './widgets/PStorageList.vue'
    export default {
        components:{
            pSearch,
            pStorageList
        }
    }
</script>
<style scoped></style>
