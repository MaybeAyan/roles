import appRoutes from '@/router/routes'

export class UseRouteNames {

	public appRoutes = appRoutes
	public parentsKeys:string[] = []

	private getParentsKeys () {
		this.appRoutes.forEach(item=>(
			this.parentsKeys.push(item.name as string)
		))

		return this.parentsKeys
    
	}

	public getRouteNameMap(){
		const map:Record<string,(string | symbol | undefined)[]|undefined> = {}

		this.appRoutes.forEach(item=>{
			const key = item.children?.map(ite=>ite.name)
			map[item.name as string] = key
		})

		return map
	}

	public getCurParent(routeName:string){
		const map = this.getRouteNameMap()
		let parentName = ''

		Object.entries(map).map(item=>{
			if(item[1]&&(item[1]?.indexOf(routeName)>-1)){
				parentName = item[0]
			}
		})

		return parentName
	}
}

