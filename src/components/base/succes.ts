import { Component } from './Component';
import { ISuccessResponse } from '../../types';
import {EventEmitter} from "../base/events";
import { ElementComponent } from './ElementComponent';

export class Success extends Component<ISuccessResponse> {
    protected _close: ElementComponent<HTMLButtonElement>;
    protected _totalPrice: ElementComponent<HTMLElement>;;
    protected events: EventEmitter;

    constructor(container: HTMLElement, events: EventEmitter) {
        super(container);
        this.events = events;

        this._close = new ElementComponent(this.container, '.order-success__close');
        this._totalPrice = new ElementComponent( this.container,'.order-success__description');
        this._close.addEventListener('click', () => {
            this.events.emit('order:result');
        })
    }

    set total(value: number) {
        this._totalPrice.setText(`Списано ${String(value)} синапсов`);
    }
}