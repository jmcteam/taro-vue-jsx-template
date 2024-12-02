import { Container } from '@/components/index'
import { Form, FormItem } from '@nutui/nutui-taro'
import { defineComponent, ref } from 'vue'
import { CheckList } from '@jmcteam/nutui'

export default defineComponent({
	name: 'xxx',
	setup() {
		const cValue = ref([1, 3])

		return () => {
			return (
				<Container class="pages-home-index">
					<Form>
						<FormItem
							prop="status"
							label="车辆状态"
							required
							rules={[{ required: true, message: '请填写姓名' }]}
						>
							<CheckList
								v-model={cValue.value}
								containerClass="flex-end"
								placeholder="请选择"
								showArrowLeft
								data={[
									{ id: 1, name: 'xxx1' },
									{ id: 2, name: 'xxx2' },
									{ id: 3, name: 'xxx3' },
									{ id: 4, name: 'xxx4' },
								]}
							></CheckList>
						</FormItem>
					</Form>
				</Container>
			)
		}
	},
})
