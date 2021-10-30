const set1 = (obj, key, property) => {
    const clone = { ...obj };
    clone[key] = property;
    return clone;
};
const set2 = (property) => {
    return (obj, propertyValue) => {
        const clone = { ...obj };
        clone[property] = propertyValue;
        return clone;
    };
};
//# sourceMappingURL=CurrySetter.js.map