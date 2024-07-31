module.exports = function TryCatchProxy (superClass) {
    const prototype = superClass.prototype;

    if (Object.getOwnPropertyNames(prototype).length === 0) {
        return superClass;
    }

    for (const property in Object.getOwnPropertyDescriptors(prototype)) {
        if (prototype.hasOwnProperty(property) && typeof prototype[property] === 'function') {
            superClass.prototype[property] = tryCatchHandler(superClass.prototype[property]);
        }
    }

    /**
     * @param {function} method
     * @returns {function}
     * @throws {Error}
     */
    function tryCatchHandler (method) {
        if (method.constructor.name === 'AsyncFunction') {
            return async function () {
                try {
                    return await method.apply(this, arguments);
                } catch (error) {
                    console.log(`Class = ${ superClass.name }\nMethod = ${ method.name }\nStack = ${ error.stack }`);
                }
            };
        }

        return function () {
            try {
                return method.apply(this, arguments);
            } catch (error) {
                console.log(`Class = ${ superClass.name }\nMethod = ${ method.name }\nStack = ${ error.stack }`);
            }
        };
    };

    return superClass;
};