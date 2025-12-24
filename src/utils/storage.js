const KEY = "xtream_account";

export const saveAccount = (d) =>
  localStorage.setItem(KEY, JSON.stringify(d));

export const loadAccount = () => {
  const r = localStorage.getItem(KEY);
  return r ? JSON.parse(r) : null;
};

export const clearAccount = () => localStorage.removeItem(KEY);
