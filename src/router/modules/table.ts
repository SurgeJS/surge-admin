export default {
  path: '/table',
  component: 'basic',
  name: 'table',
  meta: {
    title: '表格',
    icon: 'ant-design:container-outlined',
    order: 1
  },
  children: [
    {
      path: '/table/multiFunctionalEnquiryForm',
      name: 'table/multiFunctionalEnquiryForm',
      meta: {
        title: '多功能查询表格'
      },
      component: 'submenu'
    }
  ]
} as AppRouteRecordRaw
