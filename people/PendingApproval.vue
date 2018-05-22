<template>
    <div>
        <div class="header-title">待审批人员信息列表</div> 
        <p-search search-type="approval"></p-search>
        <p-approvalList></p-approvalList>
    </div>
</template>

<script>
    import pSearch from './widgets/PSearch.vue'
    import pApprovalList from './widgets/PApprovalList.vue'
    export default {
        components:{
            pSearch,
            pApprovalList
        }
    }
</script>
<style scoped></style>
