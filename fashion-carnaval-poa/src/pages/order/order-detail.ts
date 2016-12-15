import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { NavController, NavParams } from 'ionic-angular';
import { MultiLanguage } from '../../providers/multi-language'
import { GlobalVariables } from '../../providers/global-variables'
import { BasePage } from '../base-page'
import { CustomerListPage } from '../customer/customer-list'
import { OrderService } from '../../services/order-service'
import { CompanyService } from '../../services/company-service'
import { ActionSheetController } from 'ionic-angular';

@Component({
    selector: 'order-detail',
    templateUrl: 'order-detail.html'
})

export class OrderDetailPage extends BasePage {

    pet = "puppies";
    currentCustomer = {};
    orderData = {
        ProductList: [],
        StatuId: ""
    };

    constructor(public navCtrl: NavController, public params: NavParams, public multiLanguage: MultiLanguage, public globalVariables: GlobalVariables, public actionSheetCtrl: ActionSheetController, public orderService: OrderService, public customerService: CompanyService) {
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

    getSizeValueLabel(product) {
        let result = "";
        if (product["Size2"] == null || product["Size2"] == null) {
            return "STD: " + product["Size1"];
        }
        if (product["Size5"] == null || product["Size5"] == "") {
            let result = "";
            if (product["Size1"] > 0)
                result += " Size I: " + product["Size1"];

            if (product["size2"] > 0)
                result += " Size II: " + product["Size2"];

            if (product["Size3"] > 0)
                result += " Size III: " + product["Size3"];

            if (product["Size4"] > 0)
                result += " Size IV: " + product["Size4"];

            return result;
        }

        for (let i = 1; i <= this.globalVariables.getMaxSizeCount(); i++) {
            let size = "size" + i;
            let value = product[size];
            if ((value != null && value != "")) {
                result += " Size " + i;
                result += ": ";
                result += value;
                if (i < 9) {
                    result += ", ";
                }
            }

        }
        return result;
    }

    presentActionSheet() {
        let buttons = [
            {
                text: 'Send Email',
                handler: () => {
                    console.log('Send Email');
                }
            }, {
                text: 'Export PDF ',
                handler: () => {
                    console.log('Export PDF');
                }
            }, {
                text: 'Cancel',
                role: 'cancel',
                handler: () => {
                    console.log('Cancel clicked');
                }
            }
        ];

        if (this.orderData.StatuId == "0") {
            buttons.push({
                text: 'Send Order To Company',
                handler: () => {
                    console.log('Send Order To Company');
                }
            });

            buttons.push({
                text: 'Cancel Order',
                role: 'destructive',
                handler: () => {
                    console.log('Cancel order');
                }
            });
        }
        if (this.orderData.StatuId == "1") {

            buttons.push({
                text: 'Cancel Order',
                role: 'destructive',
                handler: () => {
                    console.log('Cancel order');
                }
            });
        }
        let actionSheet = this.actionSheetCtrl.create({
            title: 'Select Your Action',
            buttons: buttons
        });
        actionSheet.present();
    }
}
