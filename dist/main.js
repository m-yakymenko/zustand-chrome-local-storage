const a = (e, o) => Object.fromEntries(
  Object.entries(e).filter(
    ([t, r]) => ![...o || []].includes(t) && typeof r != "function"
  )
), h = () => {
  try {
    return !!(chrome.storage && chrome.storage.local);
  } catch {
    throw new Error(
      "Your extension environment doesn't have chrome.storage.local functionality"
    );
  }
}, i = (e, o) => (t, r, n) => {
  h();
  const s = (...c) => {
    t(...c), chrome.storage.local.set(
      a(n.getState(), o)
    );
  };
  return n.setState = s, chrome.storage.local.get().then((c) => {
    t(c);
  }), e(s, r, n);
}, l = i;
export {
  l as includeChromeStore
};
