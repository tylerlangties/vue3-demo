import { getCurrentInstance } from 'vue'

export default function useGlobalProperties() {
  //this property is ONLY available during setup and lifecyle hooks
  //to use in a template, you must first set to a ref during setup and return it
  const internalInstance = getCurrentInstance()
  return internalInstance.appContext.config.globalProperties
}
