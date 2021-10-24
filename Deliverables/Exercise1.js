const head = (array = []) => {
    if (!array?.length) {
        return null;
    }

    const [first] = array ?? null;
    return first;
}

const tail = (array = []) => {
    if (!array?.length) {
        return null;
    }

    const [_, ...rest] = array ?? null;
    return rest;
}

const init = (array = []) => {
  if (!array?.length) {
      return null;
  }

  return array?.slice(0, array.length - 1);
}

const last = (array = []) => {
  if (!array?.length) {
      return null;
  }

  return array?.[array.length - 1];
}