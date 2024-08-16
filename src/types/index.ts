export type ApiResponseList<T> = {
    totalCount: number;
    items: T[];
};

export type FormValidationErrors = Partial<Record<keyof IOrder, string>>;

export type ApiHtppMethods = 'POST' | 'PUT' | 'DELETE';

export type PaymentMethod = 'cash' | 'online';

export type ProductId = Omit<IProduct, 'id'>;

export type OrderForm = Omit<IOrder, 'total' | 'items'>;

export interface IEventManager {
    on<T extends object>(eventName: string, callback: (data: T) => void): void;
    emit<T extends object>(eventName: string, data?: T): void;
    trigger<T extends object>(eventName: string, context?: Partial<T>): (data: T) => void;
}

export interface IFormState {
    isValid: boolean;
    error: string;
}

export interface IProduct {
    name: string;
    id: string;
    category: string;
    image: string;
    description: string;
    price: number | null;
    index: number | null;
}

export interface IPaymentForm {
    address: string;
    payment: PaymentMethod;
}

export interface IContactsForm {
    phone: string;
    email: string;
}

export interface IOrder extends IPaymentForm, IContactsForm {
    total: number;
    items: string[];
}

export interface IBasket {
    totalAmount: number;
    items: string[];
}

export interface IModalContent {
    contentElement: HTMLElement[];
}

export interface IActionHandlers {
    onClick: () => void;
}

export interface ISuccessResponse {
    total: number;
}

export interface IOrderResult {
    orderId: string;
    total: number | null;
}

export interface IPageState {
    isLocked: boolean;
    itemCount: number;
    productCatalog: HTMLElement[];
}

export interface ILarekAPI {
    getProductList: () => Promise<IProduct[]>;
    getProductDetails: (productId: string) => Promise<IProduct>;
    placeOrder: (order: IOrder) => Promise<IOrderResult>;
}

