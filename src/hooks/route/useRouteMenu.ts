import appRoutes from '@/router/routes'

const getAsyncMenus = async() => {
	// const permissionStore = usePermissionStore()
	//递归过滤所有隐藏的菜单
	const menuFilter = (items:any) => {
		return items.filter((item:any) => {
			const show = !item.meta?.hideMenu && !item.hideMenu
			if (show && item.children) {
				item.children = menuFilter(item.children)
			}
			return show
		})
	}

	return menuFilter(appRoutes)
}

export const getMenus = async (): Promise<any[]> => {
	const menus = await getAsyncMenus()
	return menus
}


