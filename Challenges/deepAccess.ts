// PART A
const myObjectA = {
    a: 1,
    b: {
        c: null,
        d: {
            e: 3,
            f: {
                g: "bingo",
            }
        }
    }
};

const deepGet = (obj, ...propKeys) => {
    let currentObj = obj;
    for (const propKey of propKeys) {
        currentObj = currentObj[propKey];
        if (!currentObj) {
            return currentObj;
        }
    }

    return currentObj;
}

console.log(deepGet(myObjectA, "x")); // undefined
console.log(deepGet(myObjectA, "a")); // 1
console.log(deepGet(myObjectA, "b")); // { c: null, d: {....}}
console.log(deepGet(myObjectA, "b", "c")); // null
console.log(deepGet(myObjectA, "b", "d", "f", "g")); // bingo
console.log(deepGet(myObjectA));  // {a: 1, b: {...}}

// PART B
const myObjectB = {};

const deepSet = (value, obj, ...accessors) => {
    let currentObj = obj;
    for (let i = 0; i < accessors.length - 1; i++) {
        const accessor = accessors[i];
        currentObj[accessor] = currentObj[accessor] ?? {};
        currentObj = currentObj[accessor];
    }

    if (accessors.slice(-1).length) {
        currentObj[accessors.slice(-1)[0]] = value;
    }
}

deepSet(1, myObjectB, "a", "b");
console.log(JSON.stringify(myObjectB));  // {a: { b: 1}}
deepSet(2, myObjectB, "a", "c");
console.log(JSON.stringify(myObjectB));  // {a: { b: 1, c: 2}}
deepSet(3, myObjectB, "a");
console.log(JSON.stringify(myObjectB));  // {a: 3}
deepSet(4, myObjectB);
console.log(JSON.stringify(myObjectB));  // Do nothing // {a: 3}
