<template>
    <div class="wrapper">
        <v-head></v-head>
        <v-sidebar></v-sidebar>
        <div v-if="isShowEWNotification">
            <ew-notification></ew-notification>
        </div>
        <div class="content" v-bind:class="isMenuShow?' content-left':' '">
            <router-view class="content-right"></router-view>
        </div>
    </div>
</template>

<script>
    import vHead from './Header.vue';
    import vSidebar from './Sidebar.vue';
    import ewNotification from '../components/EWNotification.vue'
    export default {
        computed:{
            isMenuShow(){
                return this.$store.getters.getIsShowMenus
            },
            cmode(){
                return ''
            },
            isShowEWNotification(){
                return this.$store.getters.getIsShowEWNotification && this.$store.getters.getIsShowEWNotificationCon
            }
        },
        components:{
            vHead, vSidebar, ewNotification
        }
    }
</script>
<style>
    .wrapper{
        height: 100%;
        background: #f8f8f8;
    }
    .content{
        transition: margin .1s linear;
        margin-left: 85px;
        height: calc(100% - 100px);
        overflow-x: hidden;
        overflow-y:auto;
    }
    .content-left{
        margin-left: 0;
    }
    .content-right{
        width: 100%;
        height: 100%;
        position: relative;
    }
    .psw-dialog .el-dialog{
        width: 600px;
    }
    .psw-dialog .el-dialog__header {
        padding: 1px;
        height: 50px;
        line-height: 50px;
    }
    .psw-dialog .el-dialog__footer{
        padding:5px;
        height: 65px;
        line-height: 15px;
        text-align: center;
    }
    .psw-dialog .el-dialog__body {
        padding: 30px 30px 10px 0;
    }
</style>
