import './scss/styles.scss';

import { Page } from './components/Page';
import { API_URL, CDN_URL } from './utils/constants'
import { ApiResponseList, IProduct } from './types/index';
import { ApiHandler } from './components/ApiHandler'
import { EventEmitter } from './components/base/events';
import { DataStore } from './components/DataStore';
import { addEvents } from './pageEvents';
import { Modal } from './components/Modal';
import { ensureElement, cloneTemplate } from './utils/utils';
import { Basket } from './components/basket';
import { ContactForm, PaymentForm } from './components/order';
import { Success } from './components/base/succes';

const events = new EventEmitter();
const api = new ApiHandler(CDN_URL,API_URL);

const dataStore = new DataStore(events);
const page = new Page(document.body, events);
const modal = new Modal(ensureElement<HTMLElement>('#modal-container'), events)
const basket = new Basket(cloneTemplate(ensureElement<HTMLTemplateElement>('#basket')), events)
const paymentForm = new PaymentForm(cloneTemplate(ensureElement<HTMLTemplateElement>('#order')), events)
const contactsForm = new ContactForm(cloneTemplate(ensureElement<HTMLTemplateElement>('#contacts')), events)
const succes = new Success(cloneTemplate(ensureElement<HTMLTemplateElement>('#success')), events)




addEvents(events, page, dataStore, modal, basket, paymentForm, contactsForm, api, succes);

api.getProducts().then((result: ApiResponseList<IProduct>) => dataStore.catalog = result.items).catch(console.error);