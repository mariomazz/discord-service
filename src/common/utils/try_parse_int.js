function tryParseInt(v) {
	try {
		const numberValue = parseInt(v);
		if (!numberValue) {
			return null;
		} else {
			return numberValue;
		}
	} catch (error) {
		return null;
	}
}

module.exports = {
	tryParseInt: tryParseInt,
};
