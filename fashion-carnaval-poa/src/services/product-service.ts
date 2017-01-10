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
export class ProductService {

    constructor(public api: Api, public storage: StorageService, public globalService: GlobalVariables, public basketService: BasketService) {

    }

    searchProduct(searchKey: string) {
        let currentPriceTypeId = this.globalService.getCCurrentUserPriceTypeId();
        let brandId = this.globalService.getCurrentBrandId();
        let apiCall = this.api.get("/Product?manufactureCode=" + searchKey + "&PriceTypeId=" + currentPriceTypeId + "&brandId=" + brandId).map(res => res.json());
        return apiCall;
    };
}