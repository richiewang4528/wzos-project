<template>
    <div class="login-body">
        <div class="login-wrap">
            <div class="login-header">
                <div class="loader-ring"></div>
                <div class="circle1"></div>
                <img class="badge" src="../assets/images/logo.png" />
            </div>

            <div class="title">涉稳人员超感预警平台</div>

            <el-form size="mini" :model="loginForm" :inline="true" :rules="rules" ref="ruleForm">
                <el-form-item prop="userName" label="身份证号">
                    <el-input placeholder="请输入身份证号" v-model="loginForm.userName"></el-input>
                </el-form-item>
                <el-form-item prop="passWord" label="密码">
                    <el-input  placeholder="请输入密码"  type="password"  v-model="loginForm.passWord" @keyup.enter.native="submitForm('ruleForm')"></el-input>
                </el-form-item>
                <el-form-item label=" ">
                    <el-button class="submit"  type="primary" @click="submitForm('ruleForm')">用户登录</el-button>
                </el-form-item>
            </el-form>

        </div>
    </div>
</template>

<script>
    import { mapState} from 'vuex'
    export default {
        computed: {
           ...mapState({
                title: state => state.common.title,
                loginForm: state => state.common.loginForm
            })
        },
        data: function(){
            return {
                rules: {
                    userName: [
                        { min: 1, max: 25, message: '长度在 3 到 25 个字符'},
                        { required: true, message: '请输入用户名', trigger: 'change' }
                    ],
                    passWord: [
                        { required: true, message: '请输入密码', trigger: 'change' },
                        { min: 3, max: 25, message: '长度在 3 到 25 个字符'},
                        { pattern:/^\S+$/, message: '不能包含空格'}
                    ]
                }
            }
        },
        mounted(){
            this.init()
        },
        methods: {
            init(){
                let flag = localStorage.getItem('wz_user')
                let flag2 = sessionStorage.getItem('wz_role')
                let user = JSON.parse(flag)
                let role = JSON.parse(flag2)
                if(flag && flag2){
                    this.$store.dispatch('login', {
                        userName:user.username,
                        passWord:window.atob(role.rolexm)
                    }).then((data)=>{
                        if(data.code == 200){
                            localStorage.setItem('wz_user', flag)
                            sessionStorage.setItem('wz_role', flag2)
                            this.$router.push('/dashboard')
                        } else{
                            localStorage.removeItem('wz_user')
                            sessionStorage.removeItem('wz_role')
                            this.$message({ type: 'error',  message: '用户失效请重新登录' })
                            this.$router.push('/login')
                        }
                    })
                } else {
                    localStorage.removeItem('wz_user')
                }
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$store.dispatch('login', this.loginForm).then((data)=>{
                            let type = 'error'
                            if(data.code == 200){
                                type = 'success'
                                let userrole
                                if(data.result && data.result.manager == '是'){
                                    userrole = 'isadmin'
                                } else {
                                    userrole = 'isnadmin'
                                }
                                let localInformation = {
                                    userxm: data.result.xm,
                                    username: data.result.userName,
                                    roleid: data.result.jsid,
                                    responunitid: data.result.zrdwid,
                                    phoneNum: data.result.phoneNum,
                                    policeNum: data.result.policeNum,
                                    auth: data.result.auth
                                }
                                let sessionInformation = {
                                    rolexm: window.btoa(this.loginForm.passWord),
                                    roletype: userrole
                                }
                                localStorage.setItem('wz_user', JSON.stringify(localInformation))
                                sessionStorage.setItem('wz_role', JSON.stringify(sessionInformation))

                                this.$message({  type: 'success',  message: '登录成功' })
                                this.$router.push('/dashboard')
                            } else{
                                this.$message({ type: 'error', message: data.message ? data.message : '失败' })
                            }
                        })
                    } else {
                        this.$message({ type:'error', message:'请输入正确的用户名和密码' })
                    }
                });
            }
        }
    }
</script>

<style>
    .login-body .circle1{
        position: absolute;
        z-index: 50;
        width: 80px;
        height: 80px;
        border: 1px solid #7CBCDD;
        border-radius: 122px;
        top: calc(50% - 230px);
        left: calc(50% - 163px);
    }
    .login-body .loader-ring {
        top: calc(50% - 230px);
        left: calc(50% - 123px);
        pointer-events: none;
        position: absolute;
        z-index:3;
        height: 41px;
        width: 41px;
        border-radius: 0 100% 0 0;
        border: 1px solid #FFF300;
        border-width: 0px 3px 0px 0px;
        box-shadow: 3px 1px 3px -3px #FFF300, inset -3px 1px 3px -3px #FFF300;
        transform-origin: 0px 100%;
        animation: rotate 1.3s linear infinite;
    }
    .login-body .loader-ring:after {
        position: absolute;
        height: 1px;
        width: 1px;
        top: 100%;
        left: calc(100% + 1px);
        border-radius: 100%;
        border-width: 0;
        background: #FFF300;
        box-shadow: 0px 0 1px 2px #FFF300;
        content: '';
    }
    .login-body .login-header .badge{
        width: 300px;
        position: absolute;
        top: -115px;
        left: -25px;
    }
    .login-body{
        width: 100%;
        height: 100vh;
        min-width: 1360px;
        position: relative;
        background-image: url(../assets/images/backgroundlg.jpg);
        background-size: cover;
        background-position: center;
        font-family: PingFangSC-Medium;
        overflow: hidden;
    }
    .login-body .login-header{
        height: 250px;
        width: 500px;
        left: 50%;
        text-align: center;
        margin-left: -250px;
        top: 120px;
        position: absolute;
    }
    .login-body .title{
        position: absolute;
        height: 35px;
        width: 100%;
        line-height: 35px;
        text-align: center;
        font-size: 20px;
        color: #FFFFFF;
        letter-spacing: 8px;
        top: 35px;
        text-shadow: #2196f3 0 1px 0;
        left: 70px;
    }
    .login-body .login-wrap{
        position: absolute;
        width: 860px;
        height: 450px;
        left:50%;
        margin-left: -430px;
        top:50%;
        margin-top: -225px;
        background-image: url(../assets/images/login.png);
        background-size: cover;
        background-position: center;
    }
    .login-body label{
        color: white;
    }
    .login-body form{
        position: absolute;
        height: 170px;
        width: 280px;
        left:50%;
        margin-left: -140px;
        top:50%;
        margin-top: -65px;
    }
    .login-body .submit{
        letter-spacing: 10px;
        text-align: center;
        border-radius: 0;
        border: 1px solid rgba(219,229,238,0.63);
        box-shadow: inset 0 1px 3px 0 rgba(255,255,255,0.14);
    }
    .login-body .el-form-item__label{
        min-width: 85px;
        color:white;
        text-align: right;
    }
    .login-body  .el-input__inner{
        min-width: 120px;
    }
    .login-body .el-form-item {
        min-width: 310px;
    }
</style>
