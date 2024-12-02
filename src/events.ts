import { Events } from '@tarojs/taro'

const event = new Events()

type EventsName = 'XXX_PAGE_BACK'

const registerEvent = (name: EventsName, func: (...args: any[]) => void, once?: boolean) => {
	if (!once) {
		event.on(name, func)
	} else {
		event.once(name, func)
	}
}

const unRegisterEvent = (name: EventsName, func: (...args: any[]) => void) => {
	event.off(name, func)
}

const triggerEvent = (name: EventsName) => {
	event.trigger(name)
}

export { registerEvent, unRegisterEvent, triggerEvent }
