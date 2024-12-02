import { View } from '@tarojs/components'
import {
	getCurrentPages,
	usePageScroll,
	getSystemInfoSync,
	getMenuButtonBoundingClientRect,
	navigateBack,
} from '@tarojs/taro'
import { defineComponent, onMounted, reactive } from 'vue'
import throttle from './throttle.js'
import './index.scss'

const SCROLL_TOP_OFFSET = 240

const { SDKVersion, version } = getSystemInfoSync()
const showBar = versionCompare(SDKVersion, '2.5.2') || versionCompare(version, '7.0.0')

function versionCompare(currVer, targetVer) {
	currVer = currVer || '0.0.0'
	targetVer = targetVer || '0.0.0'

	if (currVer === targetVer) return true

	var currVerArr = currVer.split('.')
	var targetVerArr = targetVer.split('.')
	var len = Math.max(targetVerArr.length, currVerArr.length)
	for (var i = 0; i < len; i++) {
		const curVal = ~~currVerArr[i]
		const tarVal = ~~targetVerArr[i]
		if (curVal > tarVal) {
			return true
		} else if (curVal < tarVal) {
			return false
		}
	}
	return true
}

export default defineComponent({
	name: 'Index',
	props: {
		title: String,
		showBackBtn: {
			type: Boolean,
			value: true,
		},
		isShare: {
			type: Boolean,
			value: false,
		},

		titleGap: {
			//跟象屿一样，有可能居中就挨住胶囊了，所有提供一个gap
			type: Number,
			value: 5,
		},
		opacity: {
			type: Number,
			value: 1, //如果是在图片上的时候就需要传这个0
		},
		//https://developers.weixin.qq.com/miniprogram/dev/api/ui/navigation-bar/wx.setNavigationBarColor.html

		isCustomTitle: {
			type: Boolean,
			value: false,
		},
		frontColor: {
			type: String,
			value: '#fff',
		},
		color: {
			type: String,
			value: '',
		},
		fixed: {
			//是否固定在顶部,非悬浮的使用
			type: Boolean,
			value: true,
		},

		placeholder: {
			//固定在顶部时是否开启占位
			type: Boolean,
			value: true,
		},
		backDesc: {
			type: String,
			value: '',
		},
		triggerEvent: { type: Function },
	},
	setup(props) {
		const state = reactive({
			data: {
				showBack: false,
				showBar: false,
				navHeight: 0,
				titlePaddingTop: 0,
				menuButtonHei: 0,
				menuButtonParams: 0,
				opacity: props.opacity ?? 1,
				frontColor: props.opacity === 1 ? '#000000' : '#ffffff',
			},
		})

		onMounted(() => {
			const pages = getCurrentPages()
			const { showBackBtn, isShare } = props

			const res = getSystemInfoSync()

			let menuButtonObject = getMenuButtonBoundingClientRect()
			let statusBarHeight = res.statusBarHeight

			let navHeight =
				// @ts-ignore
				statusBarHeight + menuButtonObject.height + (menuButtonObject.top - statusBarHeight) * 2
			// @ts-ignore
			let titlePaddingTop = statusBarHeight + (menuButtonObject.top - statusBarHeight)

			let showBack = isShare
			if (pages && pages.length > 1) {
				showBack = showBackBtn
			}
			state.data = {
				...state.data,
				showBack,
				showBar,
				navHeight,
				titlePaddingTop,
				menuButtonHei: menuButtonObject.height,
				menuButtonParams: menuButtonObject.width + (res.windowWidth - menuButtonObject.right),
			}

			props?.triggerEvent?.('attach2Page', navHeight)
		})

		usePageScroll((res) => {
			throttle(handleScroll(res), 300)
		})

		const handleScroll = ({ scrollTop }) => {
			if (scrollTop > SCROLL_TOP_OFFSET && props.opacity === 1) {
				// 不需要再计算
				return
			}
			let opacity = scrollTop / SCROLL_TOP_OFFSET

			if (scrollTop > SCROLL_TOP_OFFSET) {
				opacity = 1
				state.data.frontColor = '#000000'
			} else {
				state.data.frontColor = '#ffffff'
			}
			state.data.opacity = opacity
		}

		const onClickBack = () => {
			const pages = getCurrentPages()
			if (pages && pages.length > 1) {
				navigateBack()
			} else {
				//下面的方法是小游戏的，小程序还没，后面可以跟踪这个
				// wx.restartMiniProgram()
				props?.triggerEvent?.('navBack')
			}
		}

		return () => {
			const {
				navHeight,
				titlePaddingTop,
				menuButtonParams,
				menuButtonHei,
				showBack,
				opacity,
				frontColor,
			} = state.data
			const { backDesc, isCustomTitle, titleGap, title, fixed, color } = props
			return (
				<View
					style={{
						height: `${navHeight}px`,
						paddingTop: `${titlePaddingTop}px`,
						backgroundColor: `rgba(255, 255, 255, ${opacity})`,
					}}
					class={`grident-bar bar ${fixed ? 'bar--fixed' : ''}`}
				>
					<View
						class={`bar__title ${isCustomTitle ? '' : 'pos-rel'}`}
						style={{ height: `${menuButtonHei}px` }}
					>
						{showBack && (
							<View
								class={`back-left ${isCustomTitle ? '' : 'bac-left-abs'}`}
								onClick={onClickBack}
							>
								<View class="rt_pos"></View>
								<text class="back-info">{backDesc}</text>
							</View>
						)}

						<View
							class="title-wrap"
							style={{
								marginRight: `${!isCustomTitle ? 0 : menuButtonParams + titleGap!}px`,
								justifyContent: `${isCustomTitle ? 'flex-end' : 'center'}`,
							}}
						>
							{!isCustomTitle && (
								<View class="title_content" style={{ color: color || frontColor }}>
									{title}
								</View>
							)}
						</View>
					</View>
				</View>
			)
		}
	},
})

definePageConfig({
	navigationBarTitleText: '车辆操作',
})
