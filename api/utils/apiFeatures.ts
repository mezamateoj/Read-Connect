class ApiFeature {
	// not ideal tu use any, but it's the only way i found to make it work
	queryString: any;
	query: any;
	queryOptions: any;
	page: number;
	limit: number;

	constructor(query: any, queryString: any) {
		this.query = query;
		this.queryString = queryString;
		// since prisma doesn't allow chainable methods, we need to create a queryOptions object
		this.queryOptions = {};
		this.page = 1;
		this.limit = 10;
	}

	filter() {
		const queryObj = { ...this.queryString };
		const excludedFields = ['page', 'sort', 'limit', 'fields'];
		excludedFields.forEach((el) => delete queryObj[el]);

		// Handle array fields
		if (queryObj.authors) {
			queryObj.authors = { has: queryObj.authors };
		}
		if (queryObj.categories) {
			queryObj.categories = { has: queryObj.categories };
		}

		// Handle pageCount queries
		if (queryObj.pageCount) {
			const operators = Object.keys(queryObj.pageCount);
			operators.forEach((operator) => {
				queryObj.pageCount[operator] = Number(
					queryObj.pageCount[operator]
				);
			});
		}

		// Handle date range queries
		if (queryObj.year) {
			const year = Number(queryObj.year);
			const startDate = new Date(year, 0, 1); // Start of the year
			const endDate = new Date(year + 1, 0, 1); // Start of the next year

			queryObj.publishedDate = {
				gte: startDate,
				lt: endDate,
			};

			delete queryObj.year; // Remove publishedYear from queryObj
		}

		this.queryOptions.where = queryObj;

		return this;
	}

	sort() {
		// ! fix this
		if (this.queryString.sort) {
			const sortBy = this.queryString.sort
				.split(',')
				.reduce((sortObj: any, item: any) => {
					return { ...sortObj, [item]: 'asc' };
				}, {});

			this.queryOptions.orderBy = sortBy;
		}

		return this;
	}

	limitFields() {
		if (this.queryString.fields) {
			const fields = this.queryString.fields
				.split(',')
				.reduce((fieldObj: any, item: any) => {
					return { ...fieldObj, [item]: true };
				}, {});

			this.queryOptions.select = fields;
		}

		return this;
	}

	paginate() {
		const page =
			this.queryString.page * 1 ? Number(this.queryString.page) : 1;
		const limit =
			this.queryString.limit * 1 ? Number(this.queryString.limit) : 10;
		const skip = (page - 1) * limit;

		this.limit = limit;
		this.page = page;
		this.queryOptions.skip = skip;
		this.queryOptions.take = limit;

		return this;
	}

	async execute() {
		return this.query.findMany(this.queryOptions);
	}
}

export default ApiFeature;
