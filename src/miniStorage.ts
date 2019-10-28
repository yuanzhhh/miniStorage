const createSetStorage = require('./createSetStorage.ts');
const createGetStorage = require('./createGetStorage.ts');

/**
   init
*/
function initState({
  storageOrigin
}) {
  const storage = storageOrigin || {};
  const statusInfo = {
    state: {},
    lockNumber: 0,
    memoryStorage: {},
  };

  statusInfo.state = Object.keys(storage).reduce((creatStore, localKey) => {
    creatStore[localKey] = storage[localKey];

    return creatStore;
  }, {});

  const setStorage = createSetStorage(statusInfo, storage);
  const getStorage = createGetStorage(statusInfo, storage);

  return {
    setStorage,
    getStorage,
  }
};

module.exports = initState;
