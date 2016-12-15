import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MultiLanguage } from '../../providers/multi-language'
import { GlobalVariables } from '../../providers/global-variables'
import { BasePage } from '../base-page'
import { BasketPage } from './basket'
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
    sizeArray = [];

    constructor(public navCtrl: NavController, public params: NavParams, public multiLanguage: MultiLanguage, public globalVariables: GlobalVariables, public basketService: BasketService) {
        super(multiLanguage, globalVariables);
        this.basketData = this.basketService.getBasketData();
        this.manufactureCode = this.params.get("manufactureCode");
        this.color = this.params.get("color");
        this.currentProduct = this.basketService.findProductInBasket(this.color, this.manufactureCode);
        for (let i = 1; i <= this.globalVariables.getMaxSizeCount(); i++) {
            let size = "size" + i;
            let value = this.currentProduct[size];
            if ((value != null && value != "") || value == 0) {
                if (this.sizeArray.length < i) {
                    this.sizeArray.push(i);
                }
            }
        }
    }

    getSizeValue(index) {
        if (index == null)
            return 0;
        if (this.currentProduct == null)
            return 0;
        return this.currentProduct["size" + index];
    }

    getSizeLabel(index) {
        if (this.sizeArray.length == 4) {
            switch (index) {
                case 1: return "Size I";
                case 2: return "Size II";
                case 3: return "Size III";
                case 4: return "Size IV";
            }
        }
        if (this.sizeArray.length == 1) {
            return "STD";
        }
        return "Size " + (index - 1);
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
        let navCtrl = this.navCtrl;
        this.globalVariables.showAlert("UpdateProductInBasket.Update.Success.Title", "UpdateProductInBasket.Update.Success.Description").then(function () {
            navCtrl.setRoot(BasketPage);
        });

    }
}