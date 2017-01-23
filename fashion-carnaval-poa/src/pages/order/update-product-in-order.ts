import { OrderService } from '../../services/order-service';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MultiLanguage } from '../../providers/multi-language'
import { GlobalVariables } from '../../providers/global-variables'
import { BasePage } from '../base-page'
import { BasketPage } from './basket'
import { OrderCompletedPage } from '../order/order-completed'

@Component({
    selector: 'update-product-in-order',
    templateUrl: 'update-product-in-order.html'
})


export class UpdateProductInOrder extends BasePage {

    basketData = null;
    currentProduct = null;
    tempProduct = {};
    color = null;
    manufactureCode = null;
    sizeArray = [];

    constructor(public navCtrl: NavController, public params: NavParams, public multiLanguage: MultiLanguage, public globalVariables: GlobalVariables, public orderService: OrderService) {

        super(multiLanguage, globalVariables);
        this.tempProduct = this.params.get("product");
        this.currentProduct = JSON.parse(JSON.stringify(this.tempProduct));
        for (let i = 1; i <= this.globalVariables.getMaxSizeCount(); i++) {
            let size = "Size" + i;
            let value = this.currentProduct[size];
            if ((value != null && value != "")) {
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
        return this.currentProduct["Size" + index];
    }

    getSizeLabel(index) {
        if (this.sizeArray.length == 4) {
            switch (index) {
                case 2: return "Size I";
                case 3: return "Size II";
                case 4: return "Size III";
                case 5: return "Size IV";
            }
        }
        if (this.sizeArray.length == 1) {
            return "STD";
        }
        return "Size " + (index - 1);
    }

    changedValue(event, index) {
        let size = "Size" + index;
        if (event != "") {
            this.currentProduct[size] = parseInt(event);
        } else {
            this.currentProduct[size] = 0;
        }
    }

    update() {
        for (let i = 0; i <= this.globalVariables.getMaxSizeCount(); i++) {
            this.tempProduct["Size" + i] = this.currentProduct["Size" + i];
        }
        this.navCtrl.pop();
    }
}