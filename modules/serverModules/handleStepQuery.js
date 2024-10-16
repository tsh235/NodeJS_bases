export const handleStepQuery = (res, quotesData, queryStep) => {
	const step = parseInt(queryStep);
	if (step && step > 0) {
		const lastValuesData = {};

		Object.keys(quotesData).forEach(tiker => {
			const values = quotesData[tiker];
			const slicedValues = values.slice(-step);
			lastValuesData[tiker] =step < values.length ? slicedValues : values;
		});

		res.end(JSON.stringify(lastValuesData));
		return;
	}
	res.end(JSON.stringify(quotesData));
};
