import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MultiLanguage } from '../../providers/multi-language'
import { GlobalVariables } from '../../providers/global-variables'
import { BasePage } from '../base-page'
import { OrderCompletedPage } from '../order/order-completed'

@Component({
    selector: 'basket',
    templateUrl: 'basket.html'
})


export class BasketPage extends BasePage {

    constructor(public navCtrl: NavController, public multiLanguage: MultiLanguage, public globalVariables: GlobalVariables) {
        super(multiLanguage, globalVariables);
    }

    basketValue = 2;
    completeOrder() {
        alert(this.basketValue);
        return;
        //this.navCtrl.setRoot(OrderCompletedPage);
    }

    changedValue(event){
        this.basketValue = parseInt(event);
    }
}