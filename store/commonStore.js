import * as LoginoutService from '../service/loginoutService.js'
import * as EarlyWarningService from '../service/earlywarningService.js'  
export default {
    state: { 
        loginForm:{
            userName:'',
            passWord:''
        },
        isMenuShow: false,
        isShowDialog:false,

        // 分页相关
        currentPage: 1,
        pageLimit:20,
        pageSize:20,

        slider:[ 
            {
                icon: 'dashboard',
                index: 'dashboard',
                title: '重点概况'
            },
            {
                icon: 'earlywarning',
                index: 'earlywarning',
                title: '预警管控'
            },
            {
                icon: 'people',
                index: 'people',
                title: '人员管理'
            },
            {
                icon: 'statistics',
                index: 'statistics',
                title: '报表统计'
            },
            {
                icon: 'timespace',
                index: 'timespace',
                title: '时空分析'
            },
            {
                icon: 'admin',
                index: 'admin',
                title: '系统管理'
            }
        ]
    },
    mutations: {
        set_menu_show(state){
            state.isMenuShow = !state.isMenuShow
        },
        set_current_page(state, data){
            state.currentPage = data
        },
        set_show_dialog(state, data){
            state.isShowDialog = data
        }
    },
    actions: {
        async login({commit}, payload){
            let res = await LoginoutService.login(payload)
            return res
        },
        async logout({commit}, payload){
            let res = await LoginoutService.logout(payload)
            return res
        },
        async changePassword({commit}, payload){
            let res = await LoginoutService.changePassword(payload)
            return res
        }
    },
    getters: {
        getMenuSlides(state){
            return state.slider
        },
        getCurrentPage(state){
            return state.currentPage
        },
        getPageLimit(state){
            return state.pageLimit
        },
        getPageSize(state){
            return state.pageSize
        },
        getIsShowMenus(state){
            return state.isMenuShow
        },
        getIsShowDialog(state){
            return state.isShowDialog
        }
    }
}