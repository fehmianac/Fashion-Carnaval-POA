import { Injectable } from '@angular/core';
import { Api } from '../providers/api'
import { Storage } from '../providers/storage'
import { Observable } from 'rxjs/Observable';
import { GlobalVariables } from '../providers/global-variables'

/**
 * Storage is generic handler offline data.
 */
@Injectable()
export class BasketService {

    basketData = null;
    constructor(public api: Api, public storage: Storage, public globalService: GlobalVariables) {
        let basketData = this.storage.getAsJson("basket");
        if (basketData == null) {
            this.basketData = {
                productList: [],
                orderKey: this.globalService.getGuid(),
                shippingDateStart: "",
                shippingDateEnd: "",
                customerNote: "",
                adminNote: "",
                status: 0,
                userId: this.globalService.getCurrentUserId(),
                customerId: this.globalService.getCurrentCustomerId()
            };
        } else {
            this.basketData = basketData;
        }
    }


    getBasketProductCount() {
        return this.basketData.productList.length;
    }

    getBasketData(){
        return this.basketData;
    }

    findProductInBasket(color, manufactureCode) {
        let length = this.basketData.productList.length;
        for (let i = 0; i < length; i++) {
            let product = this.basketData.productList[i];
            if (product.color == color && product.manufactureCode == manufactureCode) {
                return product;
            }
        }
        return null;
    }

    saveBasketData(basketData){
         this.storage.set("basket", this.basketData);
    }
     
    addToBasket(product: any) {
        if (product.ColorData != null && product.ColorData.length > 0) {
            let length = product.ColorData.length;
            for (let i = 0; i < length; i++) {
                let colorData = product.ColorData[i];
                let productInBasket = this.findProductInBasket(colorData.color, product.ManufactureCode);
                if (productInBasket != null) {
                    productInBasket.size1 += colorData.size1;
                    productInBasket.size2 += colorData.size2;
                    productInBasket.size3 += colorData.size3;
                    productInBasket.size4 += colorData.size4;
                    productInBasket.size5 += colorData.size5;
                    productInBasket.size6 += colorData.size6;
                    productInBasket.size7 += colorData.size7;
                    productInBasket.size8 += colorData.size8;
                    productInBasket.size9 += colorData.size9;
                } else {
                    let productModel = {
                        manufactureCode: product.ManufactureCode,
                        color: colorData.color,
                        size1: colorData.size1,
                        size2: colorData.size2,
                        size3: colorData.size3,
                        size4: colorData.size4,
                        size5: colorData.size5,
                        size6: colorData.size6,
                        size7: colorData.size7,
                        size8: colorData.size8,
                        size9: colorData.size9
                    };
                    this.basketData.productList.push(productModel);
                }
            }
        }
        this.storage.set("basket", this.basketData);
    }
}