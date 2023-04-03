import { createRouter,createWebHashHistory,RouteRecordRaw } from 'vue-router'
import appRoutes from './routes'
import { createRouteGuard } from './guard'
import DefaultLayout from '@/layout/default-layout.vue'
import { REDIRECT_NAME } from '@/enums/pageEnum'

export const routes: Array<RouteRecordRaw> = [
	{
		name: 'root',
		path: '/',
		// 默认layout
		component: DefaultLayout,
		children: appRoutes,
		redirect:'/goods/list'
	},
	{
		path: '/redirect',
		component: DefaultLayout,
		name: 'RedirectTo',
		meta: {
			title: REDIRECT_NAME,
			hideBreadcrumb: true,
			hideMenu: true,
		},
		children: [
			{
				path: '/redirect/:path(.*)',
				name: REDIRECT_NAME,
				component: () => import('@/views/redirect/index.vue'),
				meta: {
					title: REDIRECT_NAME,
					hideBreadcrumb: true,
					hideMenu: true,
				},
			},
		],
	}
]

export const router = createRouter({
	history: createWebHashHistory(import.meta.env.BASE_URL),
	routes,
})

createRouteGuard(router)
