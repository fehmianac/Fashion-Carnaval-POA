import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MultiLanguage } from '../../providers/multi-language'
import { GlobalVariables } from '../../providers/global-variables'
import { BasePage } from '../base-page'
import { OrderCompletedPage } from '../order/order-completed'
import { BasketService } from '../../services/basket-service'

@Component({
    selector: 'update-product-in-basket',
    templateUrl: 'update-product.html'
})


export class UpdateProductInBasket extends BasePage {

    basketData = null;
    currentProduct = null;
    color = null;
    manufactureCode = null;
    constructor(public navCtrl: NavController, public params: NavParams, public multiLanguage: MultiLanguage, public globalVariables: GlobalVariables, public basketService: BasketService) {
        super(multiLanguage, globalVariables);
        this.basketData = this.basketService.getBasketData();
        this.manufactureCode = this.params.get("manufactureCode");
        this.color = this.params.get("color");
        this.currentProduct = this.basketService.findProductInBasket(this.color, this.manufactureCode);
    }

    getSizeValue(index) {
        return this.currentProduct["size" + index];
    }

    changedValue(event, index) {
        let size = "size" + index;
        if (event != "") {
            this.currentProduct[size] = parseInt(event);
        } else {
            this.currentProduct[size] = 0;
        }
    }

    update() {
        this.basketService.saveBasketData(this.basketData);
        alert("ok");
        
    }
}