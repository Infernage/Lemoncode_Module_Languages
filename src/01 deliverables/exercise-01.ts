console.log("************** DELIVERABLE 01 *********************");
export const head = (array = []) => {
    if (!array?.length) {
        return null;
    }

    const [first] = array ?? null;
    return first;
}

export const tail = (array = []) => {
    if (!array?.length) {
        return null;
    }

    const [_, ...rest] = array ?? null;
    return rest;
}

export const init = (array = []) => {
    if (!array?.length) {
        return null;
    }

    return array?.slice(0, array.length - 1);
}

export const last = (array = []) => {
    if (!array?.length) {
        return null;
    }

    return array?.[array.length - 1];
}