import type { RouteLocationRaw, Router } from 'vue-router'
import { useRouter } from 'vue-router'

export type PathAsPageEnum<T> = T extends { path: string } ? T & { path: PageEnum } : T;
export type RouteLocationRawEx = PathAsPageEnum<RouteLocationRaw>;

function handleError(e: Error) {
	console.error(e)
}

enum PageEnum {
    // basic login path
    BASE_LOGIN = '/login',
    // basic home path
    BASE_HOME = '/',
}

export function useGo(_router?: Router) {
	const { push, replace } = _router || useRouter()
	function go(opt: RouteLocationRawEx = PageEnum.BASE_HOME, isReplace = false) {
		if (!opt) {
			return
		}
		isReplace ? replace(opt).catch(handleError) : push(opt).catch(handleError)
	}
	return go
}