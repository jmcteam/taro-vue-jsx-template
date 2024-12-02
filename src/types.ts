/** 公共分页请求 */
export type IPageParams<P> = {
	/**
	 * 实体上的查询条件
	 */
	criteria?: P
	/**
	 * 当前为第几页
	 */
	current?: number
	optimizeCountSql?: boolean
	optimizeJoinOfCountSql?: boolean
	/**
	 * 总共有多少页：平时不需要
	 */
	pages?: number
	/**
	 * 是否进行count查询：默认true
	 */
	searchCount?: boolean
	/**
	 * 每页记录条数
	 */
	size?: number
	/**
	 * 记录总数：平时不需要；不进行count查询时，必须手工输入
	 */
	total?: number
	[property: string]: any
}

/** 公共分页返回的result */
export type IPageResult<D> = {
	/**
	 * countId
	 */
	countId?: string
	/**
	 * 当前页
	 */
	current?: number
	/**
	 * 单页分页条数限制
	 */
	maxLimit?: number
	/**
	 * 自动优化 COUNT SQL
	 */
	optimizeCountSql?: boolean
	/**
	 * {@link #optimizeJoinOfCountSql()}
	 */
	optimizeJoinOfCountSql?: boolean
	otherObject?: { [key: string]: any }
	/**
	 * 查询数据列表
	 */
	records?: D[]
	/**
	 * 是否进行 count 查询
	 */
	searchCount?: boolean
	/**
	 * 每页显示条数，默认 10
	 */
	size?: number
	/**
	 * 总数
	 */
	total?: number
	[property: string]: any
}
