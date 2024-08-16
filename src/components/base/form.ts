import { IFormState } from "../../types";
import { Component } from "./Component";
import { ElementComponent } from "./ElementComponent";
import { EventEmitter } from "./events";

export class Form<T> extends Component<IFormState, HTMLFormElement> {
    _submit : ElementComponent<HTMLButtonElement>
    _errors : ElementComponent<HTMLElement>
    events: EventEmitter
    constructor(container: HTMLFormElement, events: EventEmitter) {
        super(container)
        this.events = events

        this._submit = new ElementComponent<HTMLButtonElement>(this.container, 'button[type=submit]',);
        this._errors = new ElementComponent<HTMLElement>(this.container, '.form__errors');

        this.container.addEventListener('input', (e: Event) => {
            const target = e.target as HTMLInputElement;
            const field = target.name as keyof T;
            const value = target.value;
            this.onInputChange(field, value);
        });
        
        this.container.addEventListener('submit', (e: Event) => {
            e.preventDefault();
            this.events.emit(`${this.container.name}:submit`);
        });
    }

    onInputChange(field: keyof T, value: string) {
        this.events.emit(`${this.container.name}.${String(field)}:change`, {
            field,
            value,
        });
    }

    set isValid(value: boolean) {
        this._submit.disabled = !value;
    }

    set error(value: string) {
        this._errors.setText(value);
    }

    render(state: Partial<T> & IFormState) {
        const { isValid, error, ...inputs } = state;
        super.render({ isValid, error });
        Object.assign(this, inputs);
        return this.container;
    }
}