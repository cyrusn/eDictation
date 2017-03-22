function addPrefix (prefix) {
  return (obj) => {
    obj.path = prefix + obj.path;
    return obj;
  };
}

module.exports = {
  addPrefix
};
