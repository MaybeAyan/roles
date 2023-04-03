import axios from 'axios'
import { UrlEnum } from './enums/url'

interface pmsI {
  site_id: number;
}

export function getPmsInfo(params: pmsI) {
	return axios.post(UrlEnum.PMS_INFO, params)
}
