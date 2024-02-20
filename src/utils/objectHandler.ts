function removeCircularDependency() {
	const seen = new WeakSet();
	return (key: any, value: any) => {
		const valueNotSeen = !seen.has(value);
		if (typeof value === 'object' && value !== null && valueNotSeen) {
			seen.add(value);
		}
		return typeof value === 'undefined' ? null : value;
	};
}

function objectReplacer(
	objectToReplace: any,
	lookFor: string[],
	stringReplacer: string,
): Record<string, unknown> {
	Object.keys(objectToReplace).forEach(key => {
		if (lookFor.includes(key)) {
			objectToReplace[key] = stringReplacer;
		}
		if (typeof objectToReplace[key] === 'object' && objectToReplace[key] !== null) {
			objectReplacer(objectToReplace[key], lookFor, stringReplacer);
		}
	});
	return objectToReplace;
}

export default function securityObjectFieldCleaner(
	objectTarget: any,
	fieldsToLookFor: string[],
	stringReplacer = '',
): Record<string, unknown> {
	const cleanObject = JSON.parse(JSON.stringify(objectTarget, removeCircularDependency()));
	return objectReplacer(cleanObject, fieldsToLookFor, stringReplacer);
}
