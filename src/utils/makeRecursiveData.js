export function makeRecursiveData(data, root) {
  var t = {};
  data.forEach((o) => {
    Object.assign((t[o.id] = t[o.id] || {}), o);
    t[o.parent] = t[o.parent] || {};
    t[o.parent].children = t[o.parent].children || [];
    t[o.parent].children.push(t[o.id]);
  });
  return t[root].children;
}
