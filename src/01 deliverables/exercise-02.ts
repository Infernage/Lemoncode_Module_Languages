console.log("************** DELIVERABLE 02 *********************");
const concat = (...arrays) => {
    let result = [];

    for (const array of arrays) {
        if (!array?.length) {
            continue;
        }

        result = [...result, ...array];
    }

    return result;
}