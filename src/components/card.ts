import { IActionHandlers, IProduct } from '../types';
import { Component } from './base/Component';
import { ElementComponent } from './base/ElementComponent';

export class Card extends Component<IProduct> {
	_title : ElementComponent<HTMLElement>;
	_price: ElementComponent<HTMLElement>;
	_image?: ElementComponent<HTMLImageElement>;
	_description?: ElementComponent<HTMLElement>;
	_button?: ElementComponent<HTMLButtonElement>;
	_category?: ElementComponent<HTMLElement>;
	_index?: ElementComponent<HTMLElement>;

	constructor(container: HTMLElement, actions: IActionHandlers) {
		super(container);

		this._title = new ElementComponent<HTMLElement>(this.container, ".card__title");
		this._price = new ElementComponent<HTMLElement>(this.container, ".card__price");
		this._image = new ElementComponent<HTMLImageElement>(this.container, ".card__image");
		this._button = new ElementComponent<HTMLButtonElement>(this.container, ".card__button");
		this._description = new ElementComponent<HTMLElement>(this.container, ".card__text");
		this._category = new ElementComponent<HTMLElement>(this.container, ".card__category");
		this._index = new ElementComponent<HTMLElement>(this.container, ".basket__item-index");

		if (actions?.onClick) {
			if (this._button.container) {
				this._button.addEventListener('click', actions.onClick);
			} else {
				container.addEventListener('click', actions.onClick);
			}
		}

	}

	set title(value: string) {
		this._title.setText(value)
	}
	set price(value: number | null) {
		this._price.setText((value) ? `${value.toString()} синапсов` : 'Бесценно')
	}
	set category(value: string) { 
		if (!this._category) return;
		this._category.setText(value);
		switch (value) {
			case 'другое':
				this._category.toggleClassName('card__category_other');
				break;
			case 'софт-скил':
				this._category.toggleClassName('card__category_soft');
				break;
			case 'хард-скил':
				this._category.toggleClassName('card__category_hard');
				break;
			case 'дополнительное':
				this._category.toggleClassName('card__category_additional');
				break;
			case 'кнопка':
				this._category.toggleClassName('card__category_button');
				break;
		}
	}

	set buttonTitle(value: string) {
		if (this._button) {
			this._button.container.textContent = value;
		}
	}

	set description(value: string) {
		this._description.setText(value)
	}
	set image(src: string) {
		this._image.setImage(src)
	}
	set index(value: number) {
		this._index.setText(String(value))
	}
	set disabled(value: boolean) {
        this._button.disabled = value;
    }

}
