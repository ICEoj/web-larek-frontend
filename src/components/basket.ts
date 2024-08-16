import { Component } from './base/Component';
import { IBasket } from '../types';
import { ElementComponent } from './base/ElementComponent';
import { EventEmitter } from './base/events';



export class Basket extends Component<IBasket> {
    _listItems : ElementComponent<HTMLLIElement>;
    _price : ElementComponent<HTMLElement>;
    _button: ElementComponent<HTMLButtonElement>
    events: EventEmitter;

    constructor(container: HTMLElement, events: EventEmitter) {
        super(container)
        this.events  = events;
        this._listItems = new ElementComponent<HTMLLIElement>(this.container, ".basket__list")
        this._price = new ElementComponent<HTMLElement>(this.container, ".basket__price")
        this._button = new ElementComponent<HTMLButtonElement>(this.container, ".basket__button")
        this._button.addEventListener('click', () => {
            events.emit('order:open')
        })
        this.valid = false;
    }

    set price(value: number) {
        this._price.setText(String(value) + ' синапсов')
    }

    set listItems(items: HTMLElement[]) {
        this._listItems.replaceChildren(items)       
    }

    
    set valid(value: boolean) {
        this._button.disabled = !value;
    }
}