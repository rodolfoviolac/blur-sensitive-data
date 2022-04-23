function removeCircularDependency() {
    const seen = new WeakSet();
    return (key: any, value: any) => {
        const valueNotSeen = !seen.has(value);
        if (typeof value === 'object' && value !== null && valueNotSeen) {
            seen.add(value);
        }
        return value;
    };
}

function objectReplacer(objectToReplace: any, lookFor: string[], stringReplacer: string): object {
    for (const [key] of Object.entries(objectToReplace)) {
        if(lookFor.includes(key)){
            objectToReplace[key] = stringReplacer;
        }
        if(typeof objectToReplace[key] === 'object'){
            objectReplacer(objectToReplace[key], lookFor, stringReplacer)
        }
    }
    return objectToReplace;
}


export function securityObjectFieldCleaner(objectTarget: any, fieldsToLookFor: string[], stringReplacer: string = ''): object {
    const cleanObject = JSON.parse(JSON.stringify(objectTarget, removeCircularDependency()));
    return objectReplacer(cleanObject, fieldsToLookFor, stringReplacer);
}
