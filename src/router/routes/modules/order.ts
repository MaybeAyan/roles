export default {
	path: 'order',
	name: 'order',
	redirect: '/order/list',
	component: () => import('@/views/order/index.vue'),
	meta: {
		title: '订单管理',
		icon: 'CalendarTwoTone',
		order: 10,
		roles: ['admin'],
	},
	children: [
		{
			path: '/order/list',
			name: 'gameQuery',
			component: () => import('@/views/order/list/index.vue'),
			meta: {
				title: '订单查询',
				icon: 'icon-user',
				noAffix:false,
				order:0,
			},
		},
	],
}
