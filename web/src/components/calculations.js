const flattenJson = (data) => {
	let result = {};
	function recurse(cur, prop) {
		if (Object(cur) !== cur) {
			result[prop] = cur;
		} else if (Array.isArray(cur)) {
			for (var i = 0, len = cur.length; i < len; i++) recurse(cur[i], prop + "[" + i + "]");
			if (len === 0) result[prop] = [];
		} else {
			let isEmpty = true;
			for (var p in cur) {
				isEmpty = false;
				recurse(cur[p], prop ? prop + "." + p : p);
			}
			if (isEmpty && prop) result[prop] = {};
		}
	}
	recurse(data, "");
	return result;
};

const isSafeNumberValue = (value) => {
	let newValue = Number(value);
	if (!isNaN(newValue) || value === "") {
		return true;
	}
	return false;
};

export const getSafeNumber = (textFieldValue) => {
	return isSafeNumberValue(textFieldValue) ? Math.trunc(Number(textFieldValue)) : 0;
};

const values = {
	checkboxesNumbered: {
		quarterly: 45,
		semiAnnual: 25,
		annual: 10,
		none: 0,
	},
	checkboxesLettered: {
		twentyPercent: 20,
		fifteenPercent: 15,
		tenPercent: 10,
		fivePercent: 5,
		zeroPercent: 0,
	},
};

export const calculateCredit = (data) => {
	const flatAid = flattenJson(data);
	const flatValues = flattenJson(values);

	let totalCredit = getSafeNumber(data.customCredit);

	for (let key of Object.keys(flatAid)) {
		if (flatAid[key] === true) {
			if (key in flatValues) {
				totalCredit += flatValues[key];
			}
		}
	}

	return totalCredit;
};
