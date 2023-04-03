import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    path?: string;
    roles?: string[]; // 可见角色
    requiresAuth?: boolean; // 鉴权
    icon?: string;
    locale?: string; // title
    hideMenu?: boolean;
    order?: number; 
    ignoreCache?: boolean; // 是否缓存
    carryParam?:string; //是否携带参数
  }
}


