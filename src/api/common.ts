import { createRequest } from '@/utils/request'

export const queryAttachUrls = createRequest<any, any>({
	url: `/xxxxxx/common/xxxxxxxx`,
	method: 'POST',
	useLoading: false,
})
