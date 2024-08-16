import { IModalContent } from "../types";
import { Component } from "./base/Component";
import { ElementComponent } from './base/ElementComponent';
import { EventEmitter } from './base/events';

export class Modal extends Component<IModalContent> {
    _closeButton: ElementComponent<HTMLButtonElement>;
    _content: ElementComponent<HTMLElement>
    events: EventEmitter;

    constructor(container: HTMLElement, events: EventEmitter) {
        super(container)

        this.events  = events;
        this._closeButton = new ElementComponent<HTMLButtonElement>(this.container, '.modal__close');
        this._content = new ElementComponent<HTMLElement>(this.container, '.modal__content');

        this._closeButton.addEventListener('click', this.close.bind(this));
        this.container.addEventListener('click', this.close.bind(this));
        this._content.addEventListener('click', (event) => event.stopPropagation());
    }

    open() {
        this.container.classList.add('modal_active');
        this.events.emit('modal:open');
    }

    close() {
        this.container.classList.remove('modal_active');
        this.contentElement = [null];
        this.events.emit('modal:close');
    }

    set contentElement(value: HTMLElement[]) {
        this._content.replaceChildren(value);
    }

    render(data: IModalContent): HTMLElement {
        super.render(data);
        this.open();
        return this.container;
    }
}