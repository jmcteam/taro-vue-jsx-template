import { createApp } from 'vue'
import { getUpdateManager, showModal } from '@tarojs/taro'
import { PiniaInstance } from './store/index'
import '@nutui/nutui-taro/dist/style.css'
import '@jmcteam/nutui/lib/index.css'
import '@jmcteam/nutui/lib/style/iconfont.css'
import './iconfont/iconfont.css'
import './app.scss'

// 版本更新
const updateManager = () => {
	const updateManager = getUpdateManager()
	updateManager.onCheckForUpdate((res) => {
		res.hasUpdate && console.log('当前存在有新版本！')
		updateManager.onUpdateReady(() => {
			showModal({
				title: '更新提示',
				content: '新版本已经准备好，是否重启应用？',
				showCancel: false,
				success: ({ confirm }) => confirm && updateManager.applyUpdate(),
			})
		})
		updateManager.onUpdateFailed(function () {
			showModal({
				title: '已经有新版本了哟~',
				content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~',
			})
		})
	})
}

const App = createApp({
	onLaunch() {
		// 更新版本
		if (process.env.TARO_ENV !== 'h5') updateManager()
	},

	onShow() {},
	// 入口组件不需要实现 render 方法，即使实现了也会被 taro 所覆盖
})
App.use(PiniaInstance)

export default App
