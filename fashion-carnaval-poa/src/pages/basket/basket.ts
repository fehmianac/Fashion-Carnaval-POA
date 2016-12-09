import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MultiLanguage } from '../../providers/multi-language'
import { GlobalVariables } from '../../providers/global-variables'
import { BasePage } from '../base-page'
import { OrderCompletedPage } from '../order/order-completed'
import { BasketService } from '../../services/basket-service'
import { UpdateProductInBasket } from './update-product'
import { HomePage } from '../home/home'

@Component({
    selector: 'basket',
    templateUrl: 'basket.html'
})


export class BasketPage extends BasePage {

    basketData = null;
    pet: string = "puppies";
    constructor(public navCtrl: NavController, public multiLanguage: MultiLanguage, public globalVariables: GlobalVariables, public basketService: BasketService) {
        super(multiLanguage, globalVariables);
        this.basketData = this.basketService.getBasketData();
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
}