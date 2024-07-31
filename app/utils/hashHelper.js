const bcrypt = require('bcrypt');

const saltRounds = 12;
const hashSecretKey = process.env.HASH_SECRET;

/**
 * @param {string} nonHashedText
 * @returns {string}
 */
const hashText = (nonHashedText) => {
    return bcrypt.hashSync(`${ hashSecretKey }${ nonHashedText }`, saltRounds)
};

/**
 * @param {string} nonHashedText
 * @param {string} hashedText
 * @returns {boolean}
 */
const compareHashText = (nonHashedText, hashedText) => {
    return bcrypt.compareSync(`${ hashSecretKey }${ nonHashedText }`, hashedText)
};

module.exports = {
    hashText,
    compareHashText
};
