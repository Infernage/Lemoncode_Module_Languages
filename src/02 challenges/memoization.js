// PART A
const expensiveFunction = () => {
    console.log("Una única llamada");
    return 3.1415;
};
// PART B
const memoizeInline = (fn) => {
    const fun = () => fun.value ?? fn();
    return (fun.value = undefined, fun);
};
const memoized = memoizeInline(expensiveFunction);
console.log(memoized()); // Una única llamada // 3.1415
console.log(memoized()); // 3.1415
console.log(memoized()); // 3.1415
let count = 0; // Comprobacion de nº de ejecuciones
const repeatText = (repetitions, text) => (count++, `${text} `.repeat(repetitions).trim());
const memoize = (fn) => {
    const fun = (...args) => {
        for (let i = 0; i < fun.parameters.length; i++) {
            const parameterList = fun.parameters[i];
            if (args.length !== parameterList.length) {
                continue;
            }
            let equals = true;
            for (let j = 0; j < args.length; j++) {
                if (args[j] !== parameterList[j]) {
                    equals = false;
                    break;
                }
            }
            if (equals) {
                return fun.values[i];
            }
        }
        fun.parameters.push(args);
        const value = fn(...args);
        fun.values.push(value);
        return value;
    };
    return (fun.values = [], fun.parameters = [], fun);
};
const memoizedGreet = memoize(repeatText);
console.log(memoizedGreet(1, "pam")); // pam
console.log(memoizedGreet(3, "chun")); // chun chun chun
console.log(memoizedGreet(1, "pam")); // pam
console.log(memoizedGreet(3, "chun")); // chun chun chun
console.log(count);
//# sourceMappingURL=memoization.js.map