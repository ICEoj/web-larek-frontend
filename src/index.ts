import './scss/styles.scss';

import { Page } from './components/Page';
import { API_URL, CDN_URL } from './utils/constants'
import { ApiResponseList, IProduct } from './types/index';
import { ApiHandler } from './components/ApiHandler'
import { EventEmitter } from './components/base/events';
import { DataStore } from './DataStore';
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
// const order = new 
// const cardTemplate = ensureElement<HTMLTemplateElement>('#card-preview');

addEvents(events, page, dataStore, modal, basket, paymentForm, contactsForm, api, succes);

api.getProducts().then((result: ApiResponseList<IProduct>) => dataStore.catalog = result.items);

//
// test.getProducts().then((result: ApiResponseList<IProduct>) => result.items.map((item) => {
// 	const card = new Card(cloneTemplate(cardTemplate))
// 	const node = card.render({
// 		...item, image: CDN_URL + item.image,
//     })
//     mainEl.appendChild(node)
//
// }))
// test.getProduct('854cef69-976d-4c2a-a18c-2aa45046c390').then((result) => console.log(result))





// const data = {
// 	"id": "854cef69-976d-4c2a-a18c-2aa45046c390",
// 	"description": "Если планируете решать задачи в тренажёре, берите два.",
// 	"image": "https://larek-api.nomoreparties.co/content/weblarek/5_Dots.svg",
// 	"title": "+1 час в сутках",
// 	"category": "софт-скил",
// 	"price": null as number
//
// }
// card.render(data)
// console.log(card)

// const tp = document.getElementById("card-catalog") as HTMLTemplateElement
// const n = tp.content.firstElementChild.cloneNode(true)
// const res = mainEl.appendChild(n)
// console.log(n)
// abstract class AbstractHuyna {
//     constructor( data: any) {
//         Object.assign(this, data)
//     }
// }
//
// class Huyna extends AbstractHuyna{
//     _dolbayob: string;
//     constructor(data: any) {
//         super(data)
//     }
//
//     set dolbayob(value: string) {
//         console.log("Придорасы изменили долбаёба")
//         this._dolbayob = value
//     }
// }
//
// const data = {
//     dolbayob: "Пидорас",
//     pole: "pole"
// }
//
// const huyna = new Huyna(data)
//
// console.log(huyna)
// // huyna.dolbayob = "dsdsf"