import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { NavController, NavParams } from 'ionic-angular';
import { MultiLanguage } from '../../providers/multi-language'
import { GlobalVariables } from '../../providers/global-variables'
import { BasePage } from '../base-page'
import { CustomerListPage } from '../customer/customer-list'
import { OrderService } from '../../services/order-service'
import { CompanyService } from '../../services/company-service'

@Component({
    selector: 'order-detail',
    templateUrl: 'order-detail.html'
})

export class OrderDetailPage extends BasePage {

    pet = "puppies";
    currentCustomer = {};
    orderData = {
        ProductList: []
    };

    constructor(public navCtrl: NavController, public params: NavParams, public multiLanguage: MultiLanguage, public globalVariables: GlobalVariables, public orderService: OrderService, public customerService: CompanyService) {
        super(multiLanguage, globalVariables);
        let order = params.get("order");
        this.orderData = order;

        this.globalVariables.presentLoading();
        this.orderService.getOrderDetailById(order.Id).subscribe(data => {
            this.orderData.ProductList = data;
            this.globalVariables.dismissLoading();
        }, err => {
            this.globalVariables.dismissLoading();
        });

        this.customerService.getCompanyById(order.CustomerId).subscribe(data => {
            this.currentCustomer = data;
        }, err => {

        })
    }

    formatDate(dateStr) {
        let date = new Date(dateStr);
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        return year + '-' + month + '-' + day;
    }

    removeFromOrder(product) {
        let orderData = this.orderData;
        this.globalVariables.showConfirm(function (aggree) {
            if (aggree) {
                let index = orderData.ProductList.indexOf(product);
                orderData.ProductList.splice(index, 1);
            }
        });
    }


    updateOrder() {
        this.globalVariables.presentLoading();
        this.orderService.updateOrder(this.orderData).subscribe(data => {
            if (data) {
                this.globalVariables.showSuccessAlert();
            } else {
                this.globalVariables.showErrorAlert();
            }

            this.globalVariables.dismissLoading();
        }, err => {
            this.globalVariables.showErrorAlert();
            this.globalVariables.dismissLoading();
        });
    }


}
