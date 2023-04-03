import type { Router } from 'vue-router'
import { useRouter } from 'vue-router'
import { unref } from 'vue'
import { REDIRECT_NAME } from '@/enums/pageEnum'

/**
 * @description: 刷新当前页面
 */
export const useRedo = (_router?: Router) => {
	const { replace, currentRoute } = _router || useRouter()
	const { query, params = {}, name, fullPath } = unref(currentRoute.value)
	function redo(): Promise<boolean> {
		return new Promise((resolve) => {
			if (name === REDIRECT_NAME) {
				resolve(false)
				return
			}
			if (name && Object.keys(params).length > 0) {
				params['_redirect_type'] = 'name'
				params['path'] = String(name)
			} else {
				params['_redirect_type'] = 'path'
				params['path'] = fullPath
			}
			replace({ name:REDIRECT_NAME, params, query }).then(() => resolve(true))
		})
	}
	return redo
}