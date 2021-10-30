// PART A
const expensiveFunction = () => {
    console.log("Una única llamada");
    return 3.1415;
}

type TFunction<T> = () => T;
interface IFunction<T> {
    (): T;
    value: T;
}

// PART B
const memoizeInline = <T>(fn: TFunction<T>): IFunction<T>  => {
    const fun: IFunction<T> = () => fun.value ?? fn();
    return (fun.value = undefined, fun);
};

const memoized = memoizeInline(expensiveFunction);
console.log(memoized()); // Una única llamada // 3.1415
console.log(memoized()); // 3.1415
console.log(memoized()); // 3.1415

// PART C
type TFunctionWithParameters<T, P extends string | number | boolean> = (...args: P[]) => T;
interface IFunctionWithParameters<T, P extends string | number | boolean> {
    (...args: P[]): T;
    values: T[];
    parameters: P[][];
}

let count = 0; // Comprobacion de nº de ejecuciones
const repeatText = (repetitions: number, text: string): string =>
    (count++, `${text} `.repeat(repetitions).trim())

const memoize = <T, P extends string | number | boolean>(fn: TFunctionWithParameters<T, P>): IFunctionWithParameters<T, P>  => {
    const fun: IFunctionWithParameters<T, P> = (...args: P[]): T => {
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

console.log(memoizedGreet(1, "pam"));   // pam
console.log(memoizedGreet(3, "chun"));  // chun chun chun
console.log(memoizedGreet(1, "pam"));   // pam
console.log(memoizedGreet(3, "chun"));  // chun chun chun
console.log(count);