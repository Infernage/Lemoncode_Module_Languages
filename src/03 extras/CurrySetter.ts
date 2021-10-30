console.log("************** EXTRA CURRY SETTER *********************");
type TUser = {
    name: string;
    surname: string;
    age: number;
};

export const set1 = <T>(obj: T, key: keyof T, property: T[keyof T]): T => {
    const clone = {...obj};
    clone[key] = property;
    return clone;
}

// OPTIONAL

type TCurriedFunc<T> = (obj: T, propertyValue: T[keyof T]) => T;

export const set2 = <T>(property: keyof T): TCurriedFunc<T> => {
    return (obj, propertyValue) => {
        const clone = {...obj};
        clone[property] = propertyValue;
        return clone;
    }
}