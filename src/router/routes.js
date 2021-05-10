import layoutHeaderAside from '@/layout/header-aside'

// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

/**
 * 在主框架内显示
 */
const frameIn = [
  {
    path: '/',
    redirect: { name: 'index' },
    component: layoutHeaderAside,
    children: [
      // 首页
      {
        path: 'index',
        name: 'index',
        meta: {
          auth: true
        },
        component: _import('system/index')
      },
      // 演示页面
      {
        path: 'page1',
        name: 'page1',
        meta: {
          title: '页面 1',
          auth: true
        },
        component: _import('demo/page1')
      },
      {
        path: 'page2',
        name: 'page2',
        meta: {
          title: '页面 2',
          auth: true
        },
        component: _import('demo/page2')
      },
      {
        path: 'page3',
        name: 'page3',
        meta: {
          title: '页面 3',
          auth: true
        },
        component: _import('demo/page3')
      },
      {
        path: 'test-table',
        name: 'test-table',
        meta: {
          title: '3D测试',
          auth: false
        },
        component: _import('test_table')
      },
      {
        path: 'income_expenditure_info',
        name: 'income_expenditure_info',
        meta: {
          title: '全国基本情况',
          auth: false
        },
        component: _import('income_expenditure_info')
      },
      {
        path: 'nationwide_income_expenditure',
        name: 'nationwide_income_expenditure',
        meta: {
          title: '全国居民人均收支',
          auth: false
        },
        component: _import('nationwide_income_expenditure')
      },
      {
        path: 'town_income_expenditure',
        name: 'town_income_expenditure',
        meta: {
          title: '城镇居民人均收支',
          auth: false
        },
        component: _import('town_income_expenditure')
      },
      {
        path: 'residents_income',
        name: 'residents_income',
        meta: {
          title: '居民人均可支配',
          auth: false
        },
        component: _import('residents_income')
      },
      {
        path: 'urban_income',
        name: 'urban_income',
        meta: {
          title: '城乡居民家庭人均',
          auth: false
        },
        component: _import('urban_income')
      },
      {
        path: 'savings_balance',
        name: 'savings_balance',
        meta: {
          title: '储蓄存款',
          auth: false
        },
        component: _import('savings_balance')
      },
      // 系统 前端日志
      {
        path: 'log',
        name: 'log',
        meta: {
          title: '前端日志',
          auth: true
        },
        component: _import('system/log')
      },
      // 刷新页面 必须保留
      {
        path: 'refresh',
        name: 'refresh',
        hidden: true,
        component: _import('system/function/refresh')
      },
      // 页面重定向 必须保留
      {
        path: 'redirect/:route*',
        name: 'redirect',
        hidden: true,
        component: _import('system/function/redirect')
      }
    ]
  }
]

/**
 * 在主框架之外显示
 */
const frameOut = [
  // 登录
  {
    path: '/login',
    name: 'login',
    component: _import('system/login')
  }
]

/**
 * 错误页面
 */
const errorPage = [
  {
    path: '*',
    name: '404',
    component: _import('system/error/404')
  }
]

// 导出需要显示菜单的
export const frameInRoutes = frameIn

// 重新组织后导出
export default [
  ...frameIn,
  ...frameOut,
  ...errorPage
]
