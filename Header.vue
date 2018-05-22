<template>
    <div class="header">
        <img class="badge logo-lg" src="../assets/images/1.png">
        <div class="el-icon-menu menu-toggle" @click="menuToggle">
            涉稳人员超感预警平台
        </div>
        <div class="user-info">
            <el-dropdown trigger="click" @command="handleCommand">
                <div class="item name">姓名: {{username}}</div>
                <div class="item" title="修改个人信息" style="width:105px;" @click="changePassword()"><i style="font-size:16px;" class="el-icon-setting"></i>个人信息</div>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="loginout">退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
        <div class="psw-dialog">
            <el-dialog :title="headerTitle" :visible.sync="dialogVisible">
                <el-form :model="pswObj" :rules="rules"
                    size="mini"
                    ref="pswForm"
                    :inline="true"
                    label-width="120px">
                    <el-form-item label="原密码" prop="originPsw">
                        <el-input v-model="pswObj.originPsw"  maxlength="20" placeholder="请输入原始密码" type="password"></el-input>
                    </el-form-item>
                    <el-form-item label="新密码" prop="passWord">
                        <el-input v-model="pswObj.passWord" maxlength="20" placeholder="请输入新密码" type="password"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码" prop="confirmPsw">
                        <el-input v-model="pswObj.confirmPsw" maxlength="20" placeholder="请再次确认新密码" type="password"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号" prop="phoneNum">
                        <el-input v-model="pswObj.phoneNum"  placeholder="请修改原有手机号" ></el-input>
                    </el-form-item>
                    <el-form-item label="警号" prop="policeNum">
                        <el-input v-model="pswObj.policeNum"  placeholder="请修改原有警号" type=""></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer">
                    <el-button size="mini" type="primary" @click="submitForm('pswForm')">确定</el-button>
                    <el-button size="mini" @click="cancel()">取消</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>
<script>
    import {
        getUsers,
        addUser,
        getDepartment,
        deleteUser,
        updateUser,
        getRole,
        getPass,
        getUserName,
        getPoliceNumber
    } from '../service/userSettingService.js'
    export default {
        data() {
            return {
                name: 'admin',
                headerTitle:'修改密码',
                dialogVisible:false,
                pswObj:{
                    originPsw:'',
                    passWord:'',
                    confirmPsw:'',
                    userName:'',
                    phoneNum:'',
                    policeNum:'',
                    isPoNum:'0'
                },
                rules: {
                    originPsw: [
                        { required: false, message: '请输入原密码'},
                        { min: 6, max: 20, message: '密码长度在6到20位', trigger: 'blur' },
                        { validator: (rule, value, callback) => {
                            if(value !== ''){
                                this.rules.originPsw[0].required = true
                                this.rules.passWord[0].required = true
                                this.rules.confirmPsw[0].required = true
                            } else {
                                this.rules.passWord[0].required = false
                                this.rules.confirmPsw[0].required = false
                                this.rules.originPsw[0].required = false
                                callback()
                            }
                        }, trigger: 'blur' }

                    ],
                    passWord: [
                        { required: false, message: '请输入新密码'},
                        { min: 6, max: 20, message: '密码长度在6到20位', trigger: 'blur' },
                        { validator: (rule, value, callback) => {
                            if(this.pswObj.originPsw == ''&& value != ''){
                                this.rules.originPsw[0].required = true
                                this.rules.passWord[0].required = true
                                this.rules.confirmPsw[0].required = true
                                callback(new Error('请输入原密码'))
                            } else {
                                callback()
                            }
                        }, trigger: 'blur' }
                    ],
                    confirmPsw: [
                        { required: false, message: '请再次确认修改密码'},
                        { min: 6, max: 20, message: '密码长度在6到20位', trigger: 'blur' },
                        { validator: (rule, value, callback) => {
                            if(this.pswObj.originPsw == '' && value != ''){
                                this.rules.originPsw[0].required = true
                                this.rules.passWord[0].required = true
                                this.rules.confirmPsw[0].required = true
                                callback(new Error('请输入原密码'))
                            } else if(value !== this.pswObj.passWord){
                                callback(new Error('两次输入不同'))
                            } else {
                                callback()
                            }
                        }, trigger: 'blur' }
                    ],
                    phoneNum: [
                        { validator: (rule, value, callback) => {
                            let pattern = /^(1[34578]\d{9}\s*[,|，]\s*)*(1[34578]\d{9})*$/g
                            if(!pattern.test(value) && value != ''&&value != undefined){
                                callback(new Error('请按正确的格式输入手机号'))
                            } else {
                                callback()
                            }
                        }, trigger: 'change' }
                    ],
                    policeNum: [
                        { required: false, message: '请输入6位警号'},
                        { validator: (rule, value, callback) => {
                            if (value!= ''&&value!=undefined&&value.length!=6) {
                                return callback(new Error('请输入6位警号'))
                            }else if(value == this.pswObj.policeNum){
                                this.pswObj.isPoNum = '1'
                            }else{
                                this.pswObj.isPoNum = '0'
                                getPoliceNumber(value).then((data)=>{
                                    if(data.code !== 200){
                                        callback(new Error(data.message ? data.message : '失败'))
                                    } else {
                                        callback()
                                    }
                                })
                            }

                        }, trigger: 'change' }
                    ],
                }
            }
        },
        computed:{
            username(){
                const flag = localStorage.getItem('wz_user')
                let user = JSON.parse(flag)
                let username = user.userxm
                return username ? username : this.name
            }
        },
        methods:{
            changePassword(){
                this.dialogVisible = true
                let loginInfo = eval('(' + localStorage.getItem('wz_user') + ')')
                this.pswObj.phoneNum = loginInfo.phoneNum
                this.pswObj.policeNum = loginInfo.policeNum

            },
            cancel(){
                this.$refs['pswForm'].resetFields()
                this.rules.passWord[0].required = false
                this.rules.confirmPsw[0].required = false
                this.rules.originPsw[0].required = false

                this.dialogVisible = false
            },
            isMenuShow(){
                this.$store.commit('set_menu_show')
            },
            menuToggle(){
                this.isMenuShow()
            },
            handleCommand(command) {
                if(command == 'loginout'){
                    this.$store.dispatch('logout', this.loginForm).then((data)=>{
                        let type = 'error'
                        if(data.code == 200){
                            type = 'success'
                            localStorage.removeItem('wz_user')
                            sessionStorage.removeItem('wz_role')
                            this.$message({ type: 'success', message: '退出成功' })
                            this.$router.push('/login')
                        }
                        this.$message({ type: type, message: data.message })
                    })
                }
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let flag = localStorage.getItem('wz_user')
                        let user = JSON.parse(flag)
                        this.pswObj.userName = user.username
                        this.$store.dispatch('changePassword', this.pswObj).then((data)=>{
                            let type = 'error'
                            if(data.code == 200){
                                type = 'success'

                                let flag2 = sessionStorage.getItem('wz_role')
                                let role = JSON.parse(flag2)
                                let sessionInformation = {
                                    rolexm: window.btoa(this.pswObj.passWord),
                                    roletype: role.roletype
                                }
                                sessionStorage.setItem('wz_role', JSON.stringify(sessionInformation))

                                this.$message({ type: 'success', message: '修改成功' })
                                this.dialogVisible = false
                            } else{
                                this.$message({ type: 'error',  message: data.message ? data.message : '失败' })
                            }
                        })
                    } else {
                        this.$message({ type:'error', message:'请输入正确的密码' })
                    }
                });
            }
        }
    }
</script>
<style scoped>
    .header {
        width: 100%;
        height: 90px;
        line-height: 80px;
        background: #406DBC;
        background-image: url(../assets/images/background.jpg);
        background-size: cover;
        background-position: center;
        border-bottom: 10px solid #5E5F61;
    }
    .header .badge{
        margin-top: 13px;
        margin-left: 20px;
        height:50px;
        float: left;
        transition: width .3s ease-in-out;
    }
    .menu-toggle{
        color: #fff;
        padding: 13px;
        font-size: 22px;
        width: 310px;
        letter-spacing: 2px;
        margin: 0 auto;
    }
    .menu-toggle:hover{
        cursor: pointer;
    }
    .user-info {
        float: right;
        padding-right: 20px;
        font-size: 14px;
        color: #fff;
    }
    .user-info .el-dropdown-link{
        position: relative;
        display: inline-block;
        padding-left: 50px;
        color: #fff;
        cursor: pointer;
        vertical-align: middle;
    }
    .user-info .item{
        width: 50px;
        height: 50px;
        float: right;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        color: white;
        font-size: 12px;
        cursor: pointer;
    }
    .user-info .name{
        width: 120px;
    }
</style>
