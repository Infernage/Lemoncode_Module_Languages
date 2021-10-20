function isObject(obj) {
    return obj?.constructor === Object && obj instanceof Object;
}

function clone(source) {
    if (!isObject(source)) {
        return {};
    }

    return merge(source, {});
}

function merge(source, target) {
    if (!isObject(source) && !isObject(target)) {
        return {};
    }

    if (!isObject(source)) {
        return clone(target);
    }

    if (!isObject(target)) {
        return clone(source);
    }

    let result = {};
    for (const property of new Set(Object.keys(source).concat(Object.keys(target)))) {
        const sourceValue = source[property];
        const targetValue = target[property];
        result[property] = isObject(sourceValue) ? merge(sourceValue, targetValue) : sourceValue ?? targetValue;
    }

    return result;
}