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
        "0": this.getLabel("OrderStatus.Waiting"),
        "1": this.getLabel("OrderStatus.Sent"),
        "2": this.getLabel("OrderStatus.Canceled"),
        "3": this.getLabel("OrderStatus.Approved")
    }
    constructor(public navCtrl: NavController, public multiLanguage: MultiLanguage, public globalVariables: GlobalVariables, public orderService: OrderService) {
        super(multiLanguage, globalVariables);
        
    }

    ionViewWillEnter() {
        this.getOrderList();
    }
    getOrderList() {
        this.orderList = [];
        this.globalVariables.presentLoading();
        this.orderService.getOrderList().subscribe(data => {
            this.globalVariables.dismissLoading();
            let length = data.length;
            for (let i = 0; i < length; i++) {
                let currentOrder = data[i];
                currentOrder.StatusText = this.orderStatus[currentOrder.StatuId.toString()];
                this.orderList.push(currentOrder);
            }

        }, err => {
            this.globalVariables.dismissLoading();
        });
        this.filteredOrderList =[];
        this.filteredOrderList = this.orderList;
    }
    searchLastOrder(event: any) {
        this.filteredOrderList =[];
        let searchKey = event.target.value;
        if (searchKey == null) {
            this.filteredOrderList = this.orderList;
            return;
        }

        let tempOrderList = [];
        let addedId = [];
        let length = this.orderList.length;
        for (let i = 0; i < length; i++) {
            let currentOrder = this.orderList[i];
            if (addedId.indexOf(currentOrder.OrderNo) > -1) {
                continue;
            }
            if (currentOrder.CustomerBasicDto.Name.toLowerCase().indexOf(searchKey.toLowerCase()) > -1) {
                tempOrderList.push(currentOrder);
                addedId.push(currentOrder.OrderNo);
                continue;
            }
            let statusText = this.orderStatus[currentOrder.StatuId.toString()];
            if (statusText.toLowerCase().indexOf(searchKey.toLowerCase()) > -1) {
                tempOrderList.push(currentOrder);
                addedId.push(currentOrder.OrderNo);
                continue;
            }

            if (currentOrder.OrderNo.toString().toLowerCase().indexOf(searchKey.toLowerCase()) > -1) {
                tempOrderList.push(currentOrder);
                addedId.push(currentOrder.OrderNo);
                continue;
            }

        }
        this.filteredOrderList = tempOrderList;
    }

    getOrderDate(order) {
        let date = new Date(order.CreatedDate);
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        return day + "-" + month + "-" + year;
    }
    openOrderDetail(order) {
        this.navCtrl.push(OrderDetailPage, { order: order });
    }
}
