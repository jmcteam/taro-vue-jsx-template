import { View } from '@tarojs/components'
import { useMainStore } from '../../store/index'
import { computed, defineComponent, ref, watch } from 'vue'
import { Button, Watermark } from '@nutui/nutui-taro'
import { reloadPage } from '@/utils/utils'
import { useDidHide, useDidShow, showLoading, hideLoading } from '@tarojs/taro'

// import CustomTabBar from '../customTabBar'

import './index.scss'
import cache, { UserInfo } from '@/cache'
import { Image } from '@tarojs/components'
import { COMMON_PAGE_ERROR_ICON } from '@/images/oss'

// TODO 定义头部导航栏NavBar和底部TabBar栏
export default defineComponent({
	name: 'container',
	props: {
		conatinerClass: String,
		loading: Boolean,
	},
	setup(props, ots) {
		const { setPageErrorInfo, clearLoading } = useMainStore()
		const { slots } = ots
		const userInfo = ref<UserInfo | null>()

		const handleReload = () => {
			reloadPage()
		}

		useDidShow(() => {
			userInfo.value = cache.getUserInfo()
			clearLoading()
			setPageErrorInfo({
				hasError: false,
				errorCode: undefined,
				errorMessage: '',
			})
		})

		useDidHide(() => {
			clearLoading()
			setPageErrorInfo({
				hasError: false,
				errorCode: undefined,
				errorMessage: '',
			})
		})

		watch(
			() => {
				const { loadingInfo } = useMainStore()
				const lastLoading = computed(() => {
					const keys = Object.keys(loadingInfo)
					let l = false
					if (keys?.length) {
						l = keys.map((it) => loadingInfo[it]).some((it) => !!it)
					}

					return l || props.loading
				})

				return lastLoading
			},
			(v) => {
				if (v.value) {
					showLoading({
						title: '加载中',
					})
				} else {
					hideLoading()
				}
			}
		)

		return () => {
			const { pageErrorInfo } = useMainStore()
			const children = slots['default']?.()

			return (
				<View class={`common-components-container ${props.conatinerClass}`}>
					{pageErrorInfo.hasError && (
						<View class="error-info">
							<Image src={COMMON_PAGE_ERROR_ICON} />
							<View class="error-title">很抱歉，页面出现错误了</View>
							<View class="error-detail">
								{pageErrorInfo.errorMessage?.slice?.(0, 50) || '程序异常'}
							</View>
							<Button onClick={handleReload}>重新加载</Button>
						</View>
					)}
					{!pageErrorInfo.hasError && <View class="page-main">{children}</View>}

					{userInfo.value?.userCode && (
						<Watermark
							content={`JMC-${userInfo.value?.userCode}-${userInfo.value?.userId}`}
							imageHeight={40}
							imageWidth={23}
							zIndex={999}
							fontColor="#333"
							style="opacity: 0.1"
						></Watermark>
					)}
					{/* <CustomTabBar /> */}
				</View>
			)
		}
	},
})
