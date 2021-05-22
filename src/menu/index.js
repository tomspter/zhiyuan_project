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
  {
    title: '录取数据',
    icon: 'table',
    path: '/zhiyuan'
  },
  {
    title: '预约信息管理',
    icon: 'list-alt',
    path: '/yuyuexinxi'
  },
  {
    title: '考生咨询任务',
    icon: 'link',
    path: '/zixunrenwu'
  },
])

export const menuAside = supplementPath([
  { path: '/index', title: '首页', icon: 'home' },
  {
    title: '录取数据',
    icon: 'outdent',
    path: '/zhiyuan'
  },
  {
    title: '考生咨询管理',
    icon: 'outdent',
    children: [
      { path: '/yuyuexinxi', title: '预约信息管理', icon: 'list-alt' },
      { path: '/zixunrenwu', title: '考生咨询任务', icon: 'link' }
    ]
  }
])
