import { Injectable } from '@angular/core';
import { Api } from '../providers/api'
import { Storage } from '../providers/storage'
import { Observable } from 'rxjs/Observable';
import { GlobalVariables } from '../providers/global-variables'
import { BasketService } from './basket-service'

/**
 * Storage is generic handler offline data.
 */
@Injectable()
export class ProductService {
   
    constructor(public api: Api, public storage: Storage, public globalService: GlobalVariables, public basketService: BasketService) {
      
    }

    searchProduct(searchKey: string) {
        this.globalService.presentLoading();
        let currentPriceTypeId = this.globalService.getCCurrentUserPriceTypeId();
        let apiCall = this.api.get("/Product?manufactureCode=" + searchKey + "&PriceTypeId=" + currentPriceTypeId).map(res => res.json());
        return apiCall;
    };
}