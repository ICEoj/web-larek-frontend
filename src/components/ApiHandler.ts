import { ApiResponseList, IOrder, IOrderResult } from "../types";
import { IProduct } from "../types";
import { Api } from "./base/api";


export interface ILarekApi {
	getProduct: (id: string) => Promise<ApiResponseList<IProduct>>;
	getProducts: () => Promise<ApiResponseList<IProduct>>;
}

export class ApiHandler extends Api implements ILarekApi {

    readonly cdn:string;

	constructor(cdn: string,baseUrl: string, options?: RequestInit) {
		super(baseUrl, options);
        this.cdn = cdn;
	}
	getProduct(id: string): Promise<ApiResponseList<IProduct>> {
		return this.get(`/product/${id}`).then();
	}
	getProducts(): Promise<ApiResponseList<IProduct>> {
		return this.get(`/product`).then();
	}
	orderProducts(order: IOrder): Promise<IOrderResult> {
        return this.post(`/order`, order).then(
            (data: IOrderResult) => data
        );
	}
}