export default {
  path: '/table',
  component: 'basic',
  meta: {
    title: '表格',
    icon: 'ant-design:container-outlined',
    order: 1
  },
  children: [
    {
      path: '/table/multiFunctionalEnquiryForm',
      meta: {
        title: '多功能查询表格'
      },
      component: 'submenu'
    }
  ]
} satisfies AppRouteRecordRaw
