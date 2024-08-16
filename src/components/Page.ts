import {ensureElement} from "../utils/utils";
import {EventEmitter} from "./base/events";
import { ElementComponent } from './base/ElementComponent';

export class Page{
		events: EventEmitter;

		_container: HTMLElement;
    _counter: ElementComponent<HTMLElement>;
    _catalog: ElementComponent<HTMLElement>;
    _wrapper: ElementComponent<HTMLElement>;
    _basket: ElementComponent<HTMLElement>;

    constructor(container: HTMLElement, events: EventEmitter) {
		this.events  = events;
        this._container = container
        this._counter = new ElementComponent<HTMLElement>(container, '.header__basket-counter');
        this._catalog = new ElementComponent<HTMLElement>(container, '.gallery');
        this._wrapper = new ElementComponent<HTMLElement>(container, '.page__wrapper');
        this._basket = new ElementComponent<HTMLElement>(container, '.header__basket');
        this._basket.addEventListener('click', () => {
            this.events.emit('basket:open');
        })
    }

    set catalog(items: HTMLElement[]) {
        this._catalog.replaceChildren(items);
    }

    set counter(value: number) {
        this._counter.setText(String(value));
    }

    set locked(value: boolean) {
        this._wrapper.toggleClassName('page__wrapper_locked', value);
    }
}