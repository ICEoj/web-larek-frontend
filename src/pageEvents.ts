import { IContactsForm, IOrder, IPaymentForm, IProduct } from './types';
import { Card } from './components/card';
import { cloneTemplate, ensureElement } from './utils/utils';
import { EventEmitter } from './components/base/events';
import { Page } from './components/Page';
import { DataStore } from './DataStore';
import { Modal } from './components/Modal';
import { Basket } from './components/basket';
import { ContactForm, PaymentForm } from './components/order';
import { ApiHandler } from './components/ApiHandler';
import { Success } from './components/base/succes';

const cardTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const basketItem = ensureElement<HTMLTemplateElement>('#card-basket')

export function addEvents(events: EventEmitter, page: Page, dataStore: DataStore, modal: Modal, basket: Basket, paymentForm : PaymentForm, contactsForm: ContactForm, api: ApiHandler, succes: Success) {

	events.on('catalog:change', (items: IProduct[]) => {
		page.catalog = items.map(item => {
			const card = new Card(cloneTemplate(cardTemplate), {
				onClick: () => {
					events.emit('card:select', item);
				}
			})
			return card.render(item)
		})
	})

	events.on('card:select', (item: IProduct) => {
		dataStore.setPreview(item);
	});

	events.on('modal:open', () => {
		page.locked = true;
	});

	events.on('modal:close', () => {
		page.locked = false;
	});


	events.on('preview:change', (item: IProduct) => {
		const card = new Card(cloneTemplate(cardPreviewTemplate), {
			onClick: () => {
				if(dataStore.inBasket(item)) {
					dataStore.removeBasket(item.id);
					card.buttonTitle = 'В корзину';
				} else {
					dataStore.addBasket(item);
					card.buttonTitle = 'Убрать из корзины';
				}
			}
		})

		card.buttonTitle = dataStore.inBasket(item) ? 'Убрать из корзины' : 'В корзину';

		modal.render({
			contentElement: [card.render(item)]
		});
	});

	events.on('basket:open', () => {
		modal.render({
			contentElement: [basket.render()]
		})
	})

	events.on('basket:change', () => {
		page.counter = dataStore.basket.items.length
		basket.valid = dataStore.basket.items.length == 0 ? false : true;
		basket.listItems = dataStore.basket.items.map((id, index) => {
			const card = new Card(cloneTemplate(basketItem), {
				onClick: () => {
					dataStore.removeBasket(id)
				}
			})
			const data: IProduct = dataStore._catalog.find((item:IProduct) => item.id == id )
			return card.render({...data, index:index+1})
		})
		basket.price = dataStore.basket.totalAmount;
	})

	events.on('order:open', () => {
		modal.render({
			contentElement: [paymentForm.render({
				payment: 'online',
				address: '',
				isValid: false,
				error: '',
			})],
		});
	});
	events.on('order:submit', () => {
		modal.render({
			contentElement: [contactsForm.render({
				email: '',
				phone: '',
				isValid: false,
				error: '',
			})],
		});
	});

	events.on('formErrors:change', (errors: Partial<IOrder>) => {
		const { email, phone, address, payment } = errors;
		paymentForm.isValid = !address && !payment;
		contactsForm.isValid = !email && !phone;
		paymentForm.error = Object.values({ address, payment })
			.filter((i) => !!i)
			.join('; ');
		contactsForm.error = Object.values({ phone, email })
			.filter((i) => !!i)
			.join('; ');
	});

	events.on(/^order\..*:change/, (data: { field: keyof IPaymentForm; value: string }) => {
		dataStore.setOrderField(data.field, data.value);
	});

	events.on(/^contacts\..*:change/, (data: { field: keyof IContactsForm; value: string }) => {
			dataStore.setOrderField(data.field, data.value);
		}
	);



	events.on('contacts:submit', () => {
		api.orderProducts(dataStore.order)
			.then(result => {
				modal.render({
					contentElement: [succes.render({
						total: result.total,
					})]
				});
				dataStore.clearBasket();
			})
			.catch(err => console.log(err))
	})

	events.on('order:result', () => {
		dataStore.clearBasket();
		modal.close();
	})
}