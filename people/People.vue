<template>
    <div>
        <div class="header-title">重点人员信息列表</div> 
        <p-search search-type="all"></p-search>
        <p-list></p-list>
    </div>
</template>

<script>
    import pSearch from './widgets/PSearch.vue'
    import pList from './widgets/PList.vue'
    export default {
        components:{
            pSearch,
            pList
        }
    }
</script>
<style scoped></style>
