import { ButtonMap } from './interfaces'

export const buttonSizeMap: ButtonMap = {
  large: 'large',
  default: 'default',
  small: 'small'
}

export const buttonClassMap: ButtonMap = {
  large:
    'h-12 px-6 m-2 text-lg text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg focus:shadow-outline hover:bg-indigo-800',
  default:
    'h-10 px-5 m-2 text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg focus:shadow-outline hover:bg-indigo-800',
  small:
    'h-8 px-4 m-2 text-sm text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg focus:shadow-outline hover:bg-indigo-800'
}
