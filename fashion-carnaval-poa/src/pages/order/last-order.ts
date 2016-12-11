import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { NavController } from 'ionic-angular';
import { MultiLanguage } from '../../providers/multi-language'
import { GlobalVariables } from '../../providers/global-variables'
import { BasePage } from '../base-page'
import { OrderDetailPage } from './order-detail'
import { OrderService } from '../../services/order-service'

@Component({
    selector: 'last-order',
    templateUrl: 'last-order.html'
})
export class LastOrderPage extends BasePage {

    orderList = [];
    filteredOrderList = [];
    orderStatus = {
        "0": "Waiting",
        "1": "Approved",
        "2": "Canceled"
    }
    constructor(public navCtrl: NavController, public multiLanguage: MultiLanguage, public globalVariables: GlobalVariables, public orderService: OrderService) {
        super(multiLanguage, globalVariables);
        this.globalVariables.presentLoading();
        this.orderService.getOrderList().subscribe(data => {
            let length = data.length;
            for (let i = 0; i < length; i++) {
                let currentOrder = data[i];
                this.orderList.push({ "Id": currentOrder.Id, "Status": currentOrder.Status, "Name": "Deneme1", "City": "İstanbul", CreatedDate: currentOrder.CreatedDate });
            }
            this.globalVariables.dismissLoading();
        }, err => {
            this.globalVariables.dismissLoading();
        });
        this.filteredOrderList = this.orderList;
    }

    searchLastOrder(event: any) {

    }

    getOrderDate(order) {
        let date = new Date(order.CreatedDate);
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        return day + "-" + month + "-" + year;
    }
    openOrderDetail(orderId: string) {
        this.navCtrl.push(OrderDetailPage, { orderId: orderId });
    }
}
