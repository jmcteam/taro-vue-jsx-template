import { createPinia } from 'pinia'
import { useMainStore } from './main'

const PiniaInstance = createPinia()

export { PiniaInstance, useMainStore }
