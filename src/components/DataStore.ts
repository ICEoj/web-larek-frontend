import { IProduct, IBasket, IOrder, OrderForm, PaymentMethod, FormValidationErrors } from '../types';
import { EventEmitter } from './base/events';
import { CDN_URL } from '../utils/constants';


export class DataStore {
	_catalog: IProduct[]
	_events: EventEmitter

	basket: IBasket = {
		items: [],
		totalAmount: 0
	};
	order: IOrder = {
		address: '',
		payment: 'online',
		email: '',
		phone: '',
		items: [],
		total: 0
    }
	formErrors: FormValidationErrors = {};

	constructor(events: EventEmitter) {
		this._events = events
	}

	set catalog(newCatalog: IProduct[]) {
		this._catalog = newCatalog
		this._catalog.forEach((item) => item.image = CDN_URL + item.image)

		this._events.emit("catalog:change", this._catalog)
	}

	setPreview(item: IProduct) {
		this._events.emit('preview:change', item);
	}

	inBasket(item: IProduct): boolean {
		return this.basket.items.includes(item.id);
	}

	addBasket(item: IProduct) {
		this.basket.items.push(item.id);
		this.basket.totalAmount += item.price;
		this._events.emit('basket:change', this.basket);
	}

	removeBasket(id: string) {
		const removableItem = this._catalog.find((item) => item.id == id)
		this.basket.items = this.basket.items.filter(id => id !== removableItem.id);
		this.basket.totalAmount -= removableItem.price;
		this._events.emit('basket:change', this.basket);
	}

	clearBasket() {
        this.basket.items = [];
        this.basket.totalAmount = 0;
        this._events.emit('basket:change', this.basket);
    }

	setOrderField(field: keyof OrderForm, value: string) {
        if (field === 'payment') {
            this.order.payment = value as PaymentMethod;
        } else {
            this.order[field] = value;
        }

        if (this.order.payment && this.validationField()) {
            this.order.items = this.basket.items;
            this.order.total = this.basket.totalAmount;
            this._events.emit('order:ready', this.order);
        }
    }

    validationField(): boolean {
        const errors: typeof this.formErrors = {};
        if(!this.order.address) {
            errors.address = 'Необходимо указать адрес'
        }
        if (!this.order.email) {
            errors.email = 'Необходимо указать email';
        }
        if (!this.order.phone) {
            errors.phone = 'Необходимо указать телефон';
        }
        this.formErrors = errors;
        this._events.emit('formErrors:change', this.formErrors);
        return Object.keys(errors).length === 0;
    }

	findProduct(id: string) {return this._catalog.find((item:IProduct) => item.id == id )}

}