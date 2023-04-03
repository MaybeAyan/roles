import * as Icons from '@ant-design/icons-vue'

export const useIconInstall = (app:any) =>{
	for( const i in Icons ) {
		app.component(i,(Icons as any )[i])
	}
}
