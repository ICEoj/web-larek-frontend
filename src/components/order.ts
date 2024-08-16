import { IContactsForm, IPaymentForm, PaymentMethod } from "../types";
import { ElementComponent } from "./base/ElementComponent";
import { EventEmitter } from "./base/events";
import { Form } from "./base/form";


export class PaymentForm extends Form<IPaymentForm> {
    _paymentCard : ElementComponent<HTMLButtonElement>
    _paymentCash : ElementComponent<HTMLButtonElement>
    _address : ElementComponent<HTMLInputElement>

    constructor(container: HTMLFormElement, events: EventEmitter) {
        super(container, events)

        this._paymentCard = new ElementComponent(this.container,'.button_alt[name=card]')
        this._paymentCash = new ElementComponent(this.container,'.button_alt[name=cash]')
        this._address = new ElementComponent(this.container,'.form__input[name=address]')
        


        this._paymentCard.addEventListener('click', () => {
            this.payment = 'online';
            this.onInputChange('payment', 'online')
        })
        this._paymentCash.addEventListener('click', () => {
            this.payment = 'cash';
            this.onInputChange('payment', 'cash')
        })

    }

    set payment(value: PaymentMethod) {
        this._paymentCard.toggleClassName('button_alt-active', value === 'online');
        this._paymentCash.toggleClassName('button_alt-active', value === 'cash');
    }

    set address(value: string) {
        this._address.value = value;
    }


}

export class ContactForm extends Form<IContactsForm> {
    _phoneNumber : ElementComponent<HTMLInputElement>
    _email : ElementComponent<HTMLInputElement>
    
    constructor(container: HTMLFormElement, events: EventEmitter) {
        super(container, events);

        this._phoneNumber = new ElementComponent(this.container,'.form__input[name=phone]')
        this._email = new ElementComponent(this.container,'.form__input[name=email]')

    }

    set phone(value: string) {
        this._phoneNumber.value = value
    }

    set email(value: string) {
        this._email.value = value
    }
}