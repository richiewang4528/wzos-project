<template>
    <div>
        <div class="people-contain common-container">
            <sub-menu ref="submenuel" :submenu-type="type"></sub-menu>
            <transition mode="out-in">
                <router-view></router-view>
            </transition>
        </div>
    </div>
</template>

<script>
    import subMenu from '../../components/Submenu.vue'
    export default {
        components:{
            subMenu, 
        },
        data(){
            return {
                type:'people'
            }
        },
        mounted(){
            this.$store.commit('set_show_ewNotification_con', true)
        }
    }
</script>
<style>
    .people-contain .control-level .el-dialog{
       width: 19.8% !important;
       min-width: 380px;
       text-align: center;
    }
    .people-contain .control-level .el-table thead th{
        background: white;
    }
    .people-contain .control-level .el-dialog__headerbtn .el-dialog__close{
        display: none;
    }
    .people-contain .el-table__body tr.current-row>td, 
    .people-contain .el-table__body tr.hover-row.current-row>td, 
    .people-contain .el-table__body tr.hover-row.el-table__row--striped.current-row>td{
        background-color: #406DBC;
        color:white;
    }
    .people-contain .addupdate-wrapper .el-dialog{ 
        width: 1300px;
        height: 95%;
        max-height: 700px;
    }
    .people-contain .addupdate-wrapper .el-dialog__body{
        width: 100%;
        max-height: 620px;
        overflow-y: auto;
        overflow-x: hidden;
    }
    .people-contain .addupdate-wrapper .el-dialog__footer{
        background-color: white;
    }
</style>
