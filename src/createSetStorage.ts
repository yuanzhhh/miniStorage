function timeRegister(key, time) {
  if (!time || time < 0) {
    return;
  }

  setTimeout(() => key, time);
};

function setLocal(statusInfo, storage, key, value) {
  statusInfo.state = Object.assign({}, statusInfo.state, statusInfo.memoryStorage, value);

  const valueStr = JSON.stringify(statusInfo.state);

  statusInfo.memoryStorage = {};

  storage[key] = valueStr;
};

const delaybuffer = (statusInfo, storage) => (key, value, timeout) => () => {
  if (statusInfo.lockNumber) {
    --statusInfo.lockNumber;

    if (statusInfo.lockNumber) {
      statusInfo.memoryStorage = Object.assign({}, statusInfo.memoryStorage, value);

      return;
    }
  }

  setLocal(statusInfo, storage, key, value);

  timeRegister(key, timeout);
};

/**
   setStorage
 */

module.exports = (statusInfo, storage) => (key, value, timeout) => {
  if (typeof value !== 'object') {
    throw new Error('storageValue is not object!');

    return;
  }

  ++statusInfo.lockNumber;

  const setDelayBuffer = delaybuffer(statusInfo, storage);

  setTimeout(setDelayBuffer(key, value, timeout || 0), 0);
};

