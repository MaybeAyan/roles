export default {
	path: '/goods',
	name: 'goods',
	redirect:'/goods/list',
	component: () => import('@/views/goods/index.vue'),
	meta: {
		title: '商品审核',
		icon: 'appstore-two-tone',
		order: 10,
		roles: ['admin'],
	},
	children: [
		{
			path: '/goods/list',
			name: 'goodsList',
			component: () => import('@/views/goods/list/index.vue'),
			meta: {
				title: '商品列表',
				icon: 'icon-user',
				noAffix:false,
				order:1
			},
		},
	],
}
