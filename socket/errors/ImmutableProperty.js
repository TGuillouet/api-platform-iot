class ImmutableProperty extends Error {
	constructor() {
		this.name = 'ImmutablePropertyError';
		this.message = 'You cannot update this property';
	}
}
