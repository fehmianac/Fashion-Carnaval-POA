import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MultiLanguage } from '../../providers/multi-language'
import { GlobalVariables } from '../../providers/global-variables'
import { BasePage } from '../base-page'
import { OrderCompletedPage } from '../order/order-completed'
import { BasketService } from '../../services/basket-service'
import { CompanyService } from '../../services/company-service'
import { UpdateProductInBasket } from './update-product'
import { HomePage } from '../home/home'

@Component({
    selector: 'basket',
    templateUrl: 'basket.html'
})


export class BasketPage extends BasePage {

    basketData = null;
    today = null;
    endDate = null;
    currentCustomer = {};
    pet: string = "customerDetail";
    isBasketEmpty = false;
    totalPriceInBaset = "0";

    constructor(public navCtrl: NavController, public multiLanguage: MultiLanguage, public globalVariables: GlobalVariables, public basketService: BasketService, public companyService: CompanyService) {
        super(multiLanguage, globalVariables);
        this.basketData = this.basketService.getBasketData();
        this.isBasketEmpty = this.basketData.productList.length == 0;
        this.totalPriceInBaset = this.basketService.getBasketPrice();
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        this.today = year + '-' + month + '-' + day;
        if (this.basketData.shippingDateStart == "") {
            this.basketData.shippingDateStart = this.today;
        }

        let year1 = date.getFullYear() + 2;
        let month1 = date.getMonth() + 1;
        let day1 = date.getDate();
        this.endDate = year1 + '-' + month1 + '-' + day1;

        this.companyService.getCompanyById(this.basketData.customerId).subscribe(data => {
            this.currentCustomer = data;
        }, error => {

        });
    }

    removeFromBasket(product) {
        this.globalVariables.showConfirm(function(result) {
            if (result) {
                let basketData = this.basketData;
                let basketService = this.basketService;
                this.globalVariables.showConfirm(function(aggree) {
                    if (aggree) {
                        let index = basketData.productList.indexOf(product);
                        basketData.productList.splice(index, 1);
                        basketService.saveBasketData(basketData);
                    }
                });
            }
        });
    }

    completeOrder() {
        this.basketService.saveBasketData(this.basketData);
        this.globalVariables.presentLoading();
        let call = this.basketService.basketToOrder(this.basketData);
        call.subscribe(data => {
            if (data.text() == "true") {
                let orderKey = this.basketData.orderKey;
                this.basketService.clearBasket();
                let navCtrl = this.navCtrl;
                this.globalVariables.showAlert("BasketPage.BasketToOrder.Success.Title", "BasketPage.BasketToOrder.Success.Description").then(function() {

                    navCtrl.setRoot(OrderCompletedPage, { orderKey: orderKey })
                });
            } else {
                this.globalVariables.showAlert("BasketPage.BasketToOrder.Error.Title", "BasketPage.BasketToOrder.Error.Description");
            }
            this.globalVariables.dismissLoading();
        }, err => {
            this.globalVariables.showAlert("BasketPage.BasketToOrder.Error.Title", "BasketPage.BasketToOrder.Error.Description");
            this.globalVariables.dismissLoading();
        });
    }

    edit(product) {
        this.navCtrl.push(UpdateProductInBasket, { manufactureCode: product.manufactureCode, color: product.color });
    }

    clearBasket() {
        let basketService = this.basketService;
        let navCtrl = this.navCtrl;
        let globalVariables = this.globalVariables;
        this.globalVariables.showConfirm(function(result) {
            if (result) {
                basketService.clearBasket();
                globalVariables.showAlert("Basket.ClearData.PopUp.Title", "Basket.ClearData.PopUp.Description").then(function() {
                    navCtrl.setRoot(HomePage);

                });
            }
        });
    }

    getSizeValueLabel(product) {
        let result = "";

        if (product["size2"] == null) {
            return "STD: " + product["size1"];
        }
        if (product["size5"] == null) {
            let result = "";
            if (product["size1"] > 0)
                result += " Size I: " + product["size1"];

            if (product["size2"] > 0)
                result += " Size II: " + product["size2"];

            if (product["size3"] > 0)
                result += " Size III: " + product["size3"];

            if (product["size4"] > 0)
                result += " Size IV: " + product["size4"];

            return result;
        }

        for (let i = 1; i <= this.globalVariables.getMaxSizeCount(); i++) {
            let size = "size" + i;
            let value = product[size];
            if ((value != null && value != "")) {
                result += " Size " + i;
                result += ": ";
                result += value;
                if (i < 9) {
                    result += ", ";
                }
            }

        }
        return result;
    }
}