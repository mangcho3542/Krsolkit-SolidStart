interface I {
  [k: string]: any;
}

export function getPropsFromTag(str: string) {
  let obj: I = {};

  const regex = /(\S+)=["']?((?:.(?!["']?\s+(?:\S+)=|\s*\/?>))*.)["']?/g;
  const matches = str.matchAll(regex);

  for (const match of matches) {
    const key = match[1].trim().replaceAll(/['"]/g, "");
    const value = match[2].trim().replaceAll(/['"]/g, "");
    obj[`${key}`] = `${value}`;
  }

  return obj;
}

