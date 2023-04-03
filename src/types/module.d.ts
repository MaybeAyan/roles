declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const Component: DefineComponent<unknown, unknown, any>
  export default Component
}