module.exports = (statusInfo, storage) => {
  const chooseValue = (key) => statusInfo.state[key] || storage[key];

  return (key) => {
    return new Promise((resolve) => setTimeout(() => resolve(key ? chooseValue(key) : statusInfo.state), 0));
  }
}
