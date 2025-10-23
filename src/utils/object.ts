export function pick<T extends Record<string, any>, K extends keyof T>(
    obj: T,
    keys: K[]
  ): Pick<T, K> {
    let res = {} as Pick<T, K>;
    for (let key of keys) {
      if (Object.hasOwn(obj, key)) res[key] = obj[key];
    }
  
    return res;
}

export function omit<T extends Record<string, any>, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> {
    let res = obj;
    for(let key of keys) {
        delete res[key];
    }

    return res as Omit<T, K>;
}