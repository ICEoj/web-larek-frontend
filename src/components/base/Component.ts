export abstract class Component<DataT, ContainerT = HTMLElement> {
	readonly container: ContainerT;

	constructor(container: ContainerT) {
		this.container = container
	}

	render(data?: DataT) : ContainerT {
		Object.assign(this, data ?? {})
		return this.container
	}
}