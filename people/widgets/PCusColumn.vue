<template>
    <div class="cc-wrapper">
        <el-checkbox-group size="mini" class="custom-column" v-model="sizeForm.types">
            <el-checkbox border class="ccitem" :checked="customColumnsObj.name" label="name" >姓名</el-checkbox>
            <el-checkbox border class="ccitem" :checked="customColumnsObj.identify" label="identify">身份证</el-checkbox>
            <el-checkbox border class="ccitem" :checked="customColumnsObj.gender" label="gender">性别</el-checkbox>
            <el-checkbox border class="ccitem" :checked="customColumnsObj.passportNumber" label="passportNumber">护照号</el-checkbox>
            <el-checkbox border class="ccitem" :checked="customColumnsObj.classify" label="classify">归类</el-checkbox>
            <el-checkbox border class="ccitem" :checked="customColumnsObj.masterDepartment" label="masterDepartment">主管部门</el-checkbox>
            <el-checkbox border class="ccitem" :checked="customColumnsObj.leadPolice" label="leadPolice">牵头警种</el-checkbox>
            <el-checkbox border class="ccitem" :checked="customColumnsObj.personnelCategory" label="personnelCategory">人员类别</el-checkbox>
            <el-checkbox border class="ccitem" :checked="customColumnsObj.relatedClass" label="relatedClass">涉事细类</el-checkbox>
            <el-checkbox border class="ccitem" :checked="customColumnsObj.cooperatePolice" label="cooperatePolice">配合警种</el-checkbox>
            <el-checkbox border class="ccitem" :checked="customColumnsObj.relatedDescription" label="relatedDescription">涉事简述</el-checkbox>

            <el-checkbox border class="ccitem" :checked="customColumnsObj.currentAddress" label="currentAddress">现住址详细地址</el-checkbox>
            <el-checkbox border class="ccitem" :checked="customColumnsObj.phoneNumber" label="phoneNumber">手机号</el-checkbox>
            <el-checkbox border class="ccitem" :checked="customColumnsObj.phoneSerialNumber" label="phoneSerialNumber">手机串号</el-checkbox>
            <el-checkbox border class="ccitem" :checked="customColumnsObj.SIMCard" label="SIMCard">SIM卡码</el-checkbox>
            <el-checkbox border class="ccitem" :checked="customColumnsObj.mobileSignatureCode" label="mobileSignatureCode">手机特征码</el-checkbox>
            <el-checkbox border class="ccitem" :checked="customColumnsObj.QQ" label="QQ">QQ</el-checkbox>
            <el-checkbox border class="ccitem" :checked="customColumnsObj.weChat" label="weChat">微信</el-checkbox>
            <el-checkbox border class="ccitem" :checked="customColumnsObj.bankCard" label="bankCard">银行卡</el-checkbox>

            <el-checkbox border class="ccitem" :checked="customColumnsObj.carPlates" label="carPlates">汽车号牌</el-checkbox>
            <el-checkbox border class="ccitem" :checked="customColumnsObj.keyRelation" label="keyRelation">重点关系人关系</el-checkbox>
            <el-checkbox border class="ccitem" :checked="customColumnsObj.keyRelationName" label="keyRelationName">重点关系人姓名</el-checkbox>
            <el-checkbox border class="ccitem" :checked="customColumnsObj.keyRelationIdentify" label="keyRelationIdentify">重点关系人身份证号</el-checkbox>
            <el-checkbox border class="ccitem" :checked="customColumnsObj.keyRelationPhone" label="keyRelationPhone">重点关系人手机</el-checkbox>
            
            <el-checkbox border class="ccitem" :checked="customColumnsObj.responsibilityPerson" label="responsibilityPerson">责任人</el-checkbox>
            <el-checkbox border class="ccitem" :checked="customColumnsObj.shortNumber" label="shortNumber">短号</el-checkbox>
            <el-checkbox border class="ccitem" :checked="customColumnsObj.messagelongNumber" label="messagelongNumber">短信接收长号</el-checkbox>
            <el-checkbox border class="ccitem" :checked="customColumnsObj.nonPoliceRelation" label="nonPoliceRelation">非公安口布控联系人</el-checkbox>
            <el-checkbox border class="ccitem" :checked="customColumnsObj.nonPoliceRelationPhone" label="nonPoliceRelationPhone">非公安口布控联系人手机号</el-checkbox>
            <el-checkbox border class="ccitem" :checked="customColumnsObj.nonPoliceRelationOffice" label="nonPoliceRelationOffice">非公安口布控单位</el-checkbox>
            <el-checkbox border class="ccitem" :checked="customColumnsObj.taskAssign" label="taskAssign">任务分配</el-checkbox>
            <el-checkbox border class="ccitem" :checked="customColumnsObj.taskDisposalMeasure" label="taskDisposalMeasure">处置措施</el-checkbox>
            <el-checkbox border class="ccitem" :checked="customColumnsObj.selfSetLabel" label="selfSetLabel">录入人自设标签</el-checkbox>
            <el-checkbox border class="ccitem" :checked="customColumnsObj.responsibilityUnit" label="responsibilityUnit">责任单位</el-checkbox>
        </el-checkbox-group>
        <div class="cc-btns">
            <el-button type="primary" :loading="setCCLoading" size="mini" @click="setCC"  >设置字段</el-button>
            <el-button type="info" :loading="setDefaultCCLoading" size="mini" @click="setDefaultCC" >系统默认字段</el-button>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                activeNames: ['1'],
                sizeForm:{
                    types:[]
                },
                setCCLoading:false,
                setDefaultCCLoading:false
            }
        },
        computed: {
            customColumnsObj(){
                return this.$store.getters.getCustomColumns
            }
        },
        methods: {
            processParam(){
                let payload = []
                this.sizeForm.types.forEach((item,index,array)=>{
                    payload.push({
                        name:item
                    })
                })
                return payload
            },
            invokeSetCC(payload){
                this.$store.dispatch('set_custom_columns', payload).then((data)=>{
                    this.setCCLoading = false
                    this.setDefaultCCLoading = false
                    let type = 'error'
                    if(data.code == 200){
                        type = 'success'
                        let tempArr = [...data.result]
                        this.$store.commit('set_custom_column', tempArr)
                        this.sizeForm.types = []
                        let tempArr2 = []
                        tempArr.forEach((item)=>{
                            if(item.name){
                                tempArr2.push(item.key)
                            }
                        })
                        this.sizeForm.types = tempArr2
                        //window.location.reload(true)
                    }
                    this.$message({
                        type: type,
                        message: data.message
                    }) 
                })  
            },
            setCC(){
                this.setCCLoading = true
                this.invokeSetCC(this.processParam())
            },
            setDefaultCC(){
                this.setDefaultCCLoading = true
                this.invokeSetCC(this.$store.getters.getDefaultCC)
            }                                  
        }
    }
</script>
<style scoped>
    .cc-wrapper{
        position: relative;
    }
    .cc-wrapper .custom-column{
        padding:10px;
        width: 100%;
        border:1px solid #cbcbff;
        background-color: white;
        min-height: 175px;
        padding-bottom: 30px;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: flex-start;
        align-items: flex-start;
        align-content:flex-start;
    }
    .cc-wrapper .custom-column .ccitem{
        margin: 5px 10px;
    }
    .cc-wrapper .cc-btns{
        position: absolute;
        bottom: 15px;
        right: 20px;
    }
</style>
