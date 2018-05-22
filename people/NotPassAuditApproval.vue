<template>
    <div>
        <div class="header-title">审核/审批未通过人员信息列表</div> 
        <p-search search-type="noAuditApproval"></p-search>
        <p-notAuditApprovalList></p-notAuditApprovalList>
    </div>
</template>

<script>
    import pSearch from './widgets/PSearch.vue'
    import pNotAuditApprovalList from './widgets/PNotAuditApprovalList.vue'
    export default {
        components:{
            pSearch,
            pNotAuditApprovalList
        }
    }
</script>
<style scoped></style>
