import { uniqueId } from 'lodash'

/**
 * @description 给菜单数据补充上 path 字段
 * @description https://github.com/d2-projects/d2-admin/issues/209
 * @param {Array} menu 原始的菜单数据
 */
function supplementPath (menu) {
  return menu.map(e => ({
    ...e,
    path: e.path || uniqueId('d2-menu-empty-'),
    ...e.children ? {
      children: supplementPath(e.children)
    } : {}
  }))
}

export const menuHeader = supplementPath([
  { path: '/index', title: '首页', icon: 'home' },
  // {
  //   title: '页面',
  //   icon: 'folder-o',
  //   children: [
  //     { path: '/page1', title: '页面 1' },
  //     { path: '/page2', title: '页面 2' },
  //     { path: '/page3', title: '页面 3' }
  //   ]
  // }
  {
    title: '全国基本情况',
    icon: 'database',
    path: '/income_expenditure_info'
  }
])

export const menuAside = supplementPath([
  { path: '/index', title: '首页', icon: 'home' },
  // {
  //   title: '页面',
  //   icon: 'folder-o',
  //   children: [
  //     { path: '/page1', title: '页面 1' },
  //     { path: '/page2', title: '页面 2' },
  //     { path: '/page3', title: '页面 3' }
  //   ]
  // },
  {
    title: '全国基本情况',
    icon: 'database',
    path: '/income_expenditure_info'
  },
  {
    title: '地域划分',
    icon: 'map',
    children: [
      { path: '/nationwide_income_expenditure', title: '全国居民人均收支', icon: 'car' },
      { path: '/town_income_expenditure', title: '城镇居民人均收支', icon: 'train' }
    ]
  },
  {
    title: '收入及恩格尔系数',
    icon: 'codepen',
    children: [
      { path: '/residents_income', title: '居民人均可支配', icon: 'car' },
      { path: '/urban_income', title: '城乡居民家庭人均', icon: 'train' }
    ]
  },
  {
    title: '储蓄存款',
    icon: 'rmb',
    path: '/savings_balance'
  },
  {
    title: '测试',
    icon: 'table',
    path: '/test-table'
  }
])
