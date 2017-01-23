import { Injectable } from '@angular/core';
import { Api } from '../providers/api'
import { StorageService } from '../providers/storage'
import { Observable } from 'rxjs/Observable';
import { GlobalVariables } from '../providers/global-variables'
import { BasketService } from './basket-service'

/**
 * Storage is generic handler offline data.
 */
@Injectable()
export class OrderService {

    constructor(public api: Api, public storage: StorageService, public globalService: GlobalVariables, public basketService: BasketService) {

    }

    getOrderList() {
        let currentUserId = this.globalService.getCurrentUserId();
        let apiCall = this.api.get("Order?UserId=" + currentUserId).map(res => res.json());
        return apiCall;
    };

    getOrderDetailById(orderId) {
        let currentPriceTypeId = this.globalService.getCCurrentUserPriceTypeId();
        let apiCall = this.api.get("Order?orderId=" + orderId + "&priceTypeId=" + currentPriceTypeId).map(res => res.json());
        return apiCall;
    };

    updateOrder(order) {
        console.log(JSON.stringify(order));
        let apiCall = this.api.post("Order", order).map(res => res.json());
        return apiCall;
    };

    changeOrderStatu(orderId, statuId) {
        let apiCall = this.api.get("Order/" + orderId + "?statuId=" + statuId).map(res => res.json());
        return apiCall;
    }


    saveOrderProductDataToLocal(orderProductData) {
        this.storage.set("orderProductData", orderProductData);
    }

    getOrderProcutDataFromLocal() {
        return this.storage.getAsJson("orderProductData");
    }
}