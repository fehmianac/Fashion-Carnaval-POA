import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { NavController, NavParams } from 'ionic-angular';
import { MultiLanguage } from '../../providers/multi-language'
import { GlobalVariables } from '../../providers/global-variables'
import { BasePage } from '../base-page'
import { CustomerListPage } from '../customer/customer-list'
import { OrderService } from '../../services/order-service'

@Component({
    selector: 'order-detail',
    templateUrl: 'order-detail.html'
})
export class OrderDetailPage extends BasePage {

    constructor(public navCtrl: NavController, public params: NavParams, public multiLanguage: MultiLanguage, public globalVariables: GlobalVariables, public orderService: OrderService) {
        super(multiLanguage, globalVariables);
        let orderId = params.get("orderId");

        this.globalVariables.presentLoading();
        this.orderService.getOrderDetailById(orderId).subscribe(data => {

            this.globalVariables.dismissLoading();
        }, err => {
            this.globalVariables.dismissLoading();
        });
    }


}
