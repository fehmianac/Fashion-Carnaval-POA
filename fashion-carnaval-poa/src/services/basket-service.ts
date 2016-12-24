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
                customerId: this.globalService.getCurrentCustomerId(),
                brandId: this.globalService.getCurrentBrandId()
            };
        } else {
            this.basketData = basketData;
        }
    }
    getBasketProductCount() {
        let count = 0;
        for (let i = 0; i < this.basketData.productList.length; i++) {
            for (let j = 1; j <= 9; j++) {
                let size = "size" + j;
                let value = this.basketData.productList[i][size];
                if (value != null && value != "" && value != 0) {
                    count += parseInt(value);
                }
            }
        }
        return count;
    }


    getBasketPrice() {
        let price = 0;
        let currency = "";
        for (let i = 0; i < this.basketData.productList.length; i++) {
            for (let j = 1; j <= 9; j++) {
                let size = "size" + j;
                let product = this.basketData.productList[i];
                let value = product[size];
                if (value != null && value != "" && value != 0) {
                    price += product.price * value;
                    currency = product.currency;
                }
            }
        }
        if (currency == "$") {
            return '$ ' + price.toFixed(2);
        }
        return price.toFixed(2) + " " + currency;
    };

    getBasketData() {
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

    saveBasketData(basketData) {
        this.storage.set("basket", this.basketData);
    }

    addToBasket(product: any) {
        if (product.ColorData != null && product.ColorData.length > 0) {
            let length = product.ColorData.length;
            for (let i = 0; i < length; i++) {
                let colorData = product.ColorData[i];
                let totalColorItemCount = colorData.size1 + colorData.size2 + colorData.size3 + colorData.size4 + colorData.size5 + colorData.size6 + colorData.size7 + colorData.size8 + colorData.size9;
                if (totalColorItemCount == 0) {
                    //eğer bir renkten hiç eklenmediyse sepete ekleme
                    continue;
                }

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
                        groupName: product.GroupName,
                        id: product.Id,
                        color: colorData.color,
                        size1: colorData.size1,
                        size2: colorData.size2,
                        size3: colorData.size3,
                        size4: colorData.size4,
                        size5: colorData.size5,
                        size6: colorData.size6,
                        size7: colorData.size7,
                        size8: colorData.size8,
                        size9: colorData.size9,
                        price: colorData.price,
                        currency: colorData.currency
                    };
                    this.basketData.productList.push(productModel);
                }
            }
        }
        this.storage.set("basket", this.basketData);
    }

    basketToOrder(basketData) {
        let orderModel = {
            "OrderKey": basketData.orderKey,
            "ShipmentStartDate": basketData.shippingDateStart.replace("-", ".").replace("-", "."),
            "ShipmentEndDate": basketData.shippingDateEnd.replace("-", ".").replace("-", "."),
            "CustomerNote": basketData.customerNote,
            "AdminNote": basketData.adminNote,
            "StatuId": 0,
            "UserId": basketData.userId,
            "CustomerId": basketData.customerId,
            "ProductList": [],
            "Id": basketData.orderKey,
            "CreatedDate": "2016.12.12",
            "LastModifiedDate": "2016.12.12",
            "Total": this.getBasketPrice()
        }
        let length = basketData.productList.length;
        for (let i = 0; i < length; i++) {
            let product = basketData.productList[i];
            orderModel.ProductList.push({
                "Id": product.id,
                "GroupName": product.groupName,
                "ManufactureName": product.manufactureCode,
                "Color": product.color,
                "Std": "1",
                "Size1": product.size1,
                "Size2": product.size2,
                "Size3": product.size3,
                "Size4": product.size4,
                "Size5": product.size5,
                "Size6": product.size6,
                "Size7": product.size7,
                "Size8": product.size8,
                "OrderId": basketData.orderKey
            });
        }
        console.log(JSON.stringify(orderModel));
        return this.api.post("/Basket", orderModel);
    }
    clearBasket() {
        this.storage.delete("basket");
        let basketData = {
            productList: [],
            orderKey: this.globalService.getGuid(),
            shippingDateStart: "",
            shippingDateEnd: "",
            customerNote: "",
            adminNote: "",
            status: 0,
            userId: this.globalService.getCurrentUserId(),
            customerId: this.globalService.getCurrentCustomerId(),
            brandId: this.globalService.getCurrentBrandId()
        };
        this.basketData = basketData;
        this.saveBasketData(basketData);
    }
}