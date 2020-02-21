const ImmutableProperty = require('./../errors/ImmutableProperty');

/**
 * @class The superclass who represent a basic entity (with his primary key only)
 * @exports
 */
class Entity {
	/**
	 * Create an instance of the entity
	 * 
	 * @constructor
	 * @param {number} id The unique id of the object in the rable
	 */
	constructor(id) {
		this.id = id;
		return new Proxy(this, {
			set: (object, key, value) => {
				// Check if we are trying to modify an object property other than id
				if (key !== 'id') {
					object[key] = value; // Then assign it
					return true;
				}
				throw new ImmutableProperty(); // Throwing an exception
			}
		});
	}
}

module.exports = Entity;
