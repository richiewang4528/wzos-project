<template>
    <div>
        <div class="header-title">待审核人员信息列表</div> 
        <p-search search-type="audit"></p-search>
        <p-auditList></p-auditList>
    </div>
</template>

<script>
    import pSearch from './widgets/PSearch.vue'
    import pAuditList from './widgets/PAuditList.vue'
    export default {
        components:{
            pSearch,
            pAuditList
        }
    }
</script>
<style scoped></style>
