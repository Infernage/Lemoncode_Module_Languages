// PART A
const expensiveFunction = () => {
    console.log("Una única llamada");
    return 3.1415;
}

interface IFunction<T> {
    (): T;
    value?: T;
}

// PART B
const memoizeInline = <T>(fn: IFunction<T>): IFunction<T>  => () => fn.value ?? (fn.value = fn());

const memoized = memoizeInline(expensiveFunction);
console.log(memoized()); // Una única llamada // 3.1415
console.log(memoized()); // 3.1415
console.log(memoized()); // 3.1415

// PART C
type TFunctionWithParameters<T, P extends string | number | boolean> = (...args: P[]) => T;
interface IFunctionWithParameters<T, P extends string | number | boolean> {
    (...args: P[]): T;
    values?: T[];
    parameters?: P[][];
}

let count = 0; // Comprobacion de nº de ejecuciones
const repeatText = (repetitions: number, text: string): string =>
    (count++, `${text} `.repeat(repetitions).trim())

const memoize = <T, P extends string | number | boolean>(fn: IFunctionWithParameters<T, P>): TFunctionWithParameters<T, P>  => {
    fn.values = [];
    fn.parameters = [];
    return (...args: P[]): T => {
        for (let i = 0; i < fn.parameters.length; i++) {
            const parameterList = fn.parameters[i];
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
                return fn.values[i];
            }
        }

        fn.parameters.push(args);
        const value = fn(...args);
        fn.values.push(value);
        return value;
    };
};

const memoizedGreet = memoize(repeatText);

console.log(memoizedGreet(1, "pam"));   // pam
console.log(memoizedGreet(3, "chun"));  // chun chun chun
console.log(memoizedGreet(1, "pam"));   // pam
console.log(memoizedGreet(3, "chun"));  // chun chun chun
console.log(count);