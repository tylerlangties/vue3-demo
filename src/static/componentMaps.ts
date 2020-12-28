import { ButtonMap } from './interfaces'

export const buttonSizeMap: ButtonMap = {
  large: 'large',
  default: 'default',
  small: 'small'
}

export const buttonClassMap: ButtonMap = {
  large:
    'h-12 px-6 text-lg text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded focus:shadow-outline hover:bg-indigo-800',
  default:
    'py-2 px-3 text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded focus:shadow-outline hover:bg-indigo-800',
  small:
    'h-8 px-4 text-sm text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded focus:shadow-outline hover:bg-indigo-800'
}
