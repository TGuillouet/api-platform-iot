/**
 * @class Error when trying to change an immutable value
 */
class ImmutableProperty extends Error {
	/**
	 * Create an error
	 * 
	 * @constructor
	 */
	constructor() {
		this.name = 'ImmutablePropertyError';
		this.message = 'You cannot update this property';
	}
}
