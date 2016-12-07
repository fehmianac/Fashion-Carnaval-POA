import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MultiLanguage } from '../../providers/multi-language'
import { GlobalVariables } from '../../providers/global-variables'
import { BasePage } from '../base-page'
import { OrderCompletedPage } from '../order/order-completed'
import { BasketService } from '../../services/basket-service'

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

    basketValue = 2;
    completeOrder() {
        alert(this.basketValue);
        return;
        //this.navCtrl.setRoot(OrderCompletedPage);
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
}