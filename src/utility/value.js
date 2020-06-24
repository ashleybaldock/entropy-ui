export const hasValue = (v) => v !== null && v !== undefined;

export const valueOrDefault = (v, def) => (hasValue(v) ? v : def);

export const identity = (v) => v;
