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
    pet: string = "puppies";
    constructor(public navCtrl: NavController, public multiLanguage: MultiLanguage, public globalVariables: GlobalVariables, public basketService: BasketService, public companyService: CompanyService) {
        super(multiLanguage, globalVariables);
        this.basketData = this.basketService.getBasketData();

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
        let basketData = this.basketData;
        let basketService = this.basketService;
        this.globalVariables.showConfirm(function (aggree) {
            if (aggree) {
                let index = basketData.productList.indexOf(product);
                basketData.productList.splice(index, 1);
                basketService.saveBasketData(basketData);
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
                this.globalVariables.showAlert("BasketPage.BasketToOrder.Success.Title", "BasketPage.BasketToOrder.Success.Description").then(function () {

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
        this.basketService.clearBasket();

        let navCtrl = this.navCtrl;
        this.globalVariables.showAlert("Basket.ClearData.PopUp.Title", "Basket.ClearData.PopUp.Description").then(function () {
            navCtrl.setRoot(HomePage);

        });
    }

    getSizeValueLabel(product) {
        let result = "";
        for (let i = 1; i <= 9; i++) {
            let size = "size" + i;
            let value = product[size];
            if ((value != null && value != "") || value == 0) {
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