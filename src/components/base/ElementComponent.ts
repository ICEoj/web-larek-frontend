import { ensureElement } from '../../utils/utils';


export class ElementComponent<T extends HTMLElement | HTMLImageElement | HTMLButtonElement> {
	readonly container: T;

	constructor(context: HTMLElement, selector: string) {

		try {
			this.container = ensureElement<T>(selector, context)
		}
		catch (E) {
			
		}
	}

	toggleClassName(className:string, force?:boolean) {
		if (this.container) {
			this.container.classList.toggle(className, force);
		}
	}

	setText(text: string) {
		if (this.container) {
			this.container.innerText = text
		}
	}

	setImage(src: string, alt?: string) {
		if (this.container instanceof HTMLImageElement) {
			this.container.src = src;
			if (alt) {
				this.container.alt = alt;
			}
		}
	}

	replaceChildren(children: HTMLElement[]) {
		this.container.replaceChildren(...children)
	}

	addEventListener(event: string, callback: EventListenerOrEventListenerObject) {
		this.container.addEventListener(event, callback)
	}

	set disabled(value: boolean ) {
		if (this.container instanceof HTMLButtonElement) this.container.disabled = value;
	}
	
	set value(value:string) {
		if( this.container instanceof HTMLInputElement )
		this.container.value = value;
	}
}