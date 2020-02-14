import vueEasyAdminComponents from 'vue-easy-admin-components'
export default {
  init ({ Vue, router, store, Element, request, navs,loading }) {
    //修改菜单
    navs.registerDealNavs(function (navs) {
      navs[0].icon = 'message'
    })
    //添加组件库
    Vue.use(vueEasyAdminComponents)
  },
  iass: {
    language: {
      defalut: 'en',
      list: [
        {
          label: '中文',
          value: 'zh-CN'
        },
        {
          label: 'English',
          value: 'en'
        }
      ],
      messages: {
        loading: {
          'zh-CN': '加载中',
          en: 'loading'
        }
      }
    },
    request: {
      create: {
        baseURL: process.env.NODE_ENV === 'development' ? '/' : '',
        timeout: 5000
      },
      format: {
        codeKey: 'code',
        successCode: 200,
        msgKey: 'message',
        dataKey: 'data'
      }
    },
    router: {
      indexPage () {
        return '/local/page1'
      },
      nProgress: { showSpinner: false }
    },
    store: {
      state: {},
      mutations: {}
    }
  },
  sass: {
    permission: {
      getUserInfo (request) {
        return request.net('get:/v1/apis/userInfo')
      },
      getPermission (request) {
        return request.net('get:/v1/apis/permission')
      },
      whitePages: ['full/401'],
      loginUrl: '/full/login',
      headerKey: 'token',
      token: {
        refresh () {
          return Promise.resolve('XXXXXX')
          // return request.get('/resetToken').then(d => d.code)
        },
        get () {
          return localStorage.token
        },
        set (token) {
          return (localStorage.token = token)
        },
        remove () {
          localStorage.removeItem('token')
        },
        overCode: 4001,
        overMsg: {
          en:
            'You have signed out, you can cancel to stay on this page, or confirm to sign in again',
          'zh-CN': '您已注销，您可以取消以停留在此页，或确定重新登录'
        }
      }
    },
    loading: {
      timeout: 15000 // 最长loading时长
    },
    theme: {
      defalut: 'blue',
      list: [
        {
          label: '蓝色主题',
          value: 'blue'
        },
        {
          label: '黄色主题',
          value: 'yellow'
        }
      ]
    },
    layout: {
      sidebar: {
        logo: {
          title: {
            en: 'VUE ADMIN',
            'zh-CN': 'VUE后台管理'
          },
          logo: 'public/logo.png',
          link: '/',
          collapse: false,
          showLogo: true
        },
        menu: {
          backgroundColor: '#545c64',
          textColor: '#fff',
          activeTextColor: '#ffd04b'
        }
      },
      header: {
        affixHeader: true,
        tagsView: true
      },
      setting: {
        show: true,
        list: []
      }
    }
  }
}
