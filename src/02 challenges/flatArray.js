const flatArray = (multiDimensionalArray) => {
    let flattenArray = [];
    for (const element of multiDimensionalArray) {
        if (element instanceof Array) {
            flattenArray.push(...flatArray(element));
        }
        else {
            flattenArray.push(element);
        }
    }
    return flattenArray;
};
const sample = [1, [2, 3], [[4], [5, 6, [7, 8, [9]]]]];
console.log(flatArray(sample));
//# sourceMappingURL=flatArray.js.map