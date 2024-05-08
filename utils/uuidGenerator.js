const { v4: uuidv4 } = require('uuid');

/**
 * @returns {string}
 */
const uuidGenerator = () => {
    return uuidv4();
};
  
module.exports = uuidGenerator;
