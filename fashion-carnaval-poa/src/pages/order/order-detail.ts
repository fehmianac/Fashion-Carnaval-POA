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
import { UpdateProductInOrder } from './update-product-in-order'
import { ExportService } from '../../services/export-service'

@Component({
    selector: 'order-detail',
    templateUrl: 'order-detail.html'
})

export class OrderDetailPage extends BasePage {

    pet = "puppies";
    currentCustomer = {};
    orderData = {
        ProductList: [],
        StatuId: 0,
        Id: ""
    };
    isEditable = false;

    constructor(public navCtrl: NavController, public params: NavParams, public multiLanguage: MultiLanguage, public globalVariables: GlobalVariables, public actionSheetCtrl: ActionSheetController, public orderService: OrderService, public customerService: CompanyService, public exportService: ExportService) {
        super(multiLanguage, globalVariables);
        this.pet = "customerDetail";
        let order = params.get("order");
        this.orderData = order;

        this.globalVariables.presentLoading();
        this.orderService.getOrderDetailById(order.Id).subscribe(data => {
            this.orderData.ProductList = data;
            this.orderService.saveOrderProductDataToLocal(this.orderData.ProductList);
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
        if (product["Size2"] == null || product["Size2"].toString() == null) {
            return "STD: " + product["Size1"];
        }
        if (product["Size5"] == null || product["Size5"].toString() == "") {
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
            let size = "Size" + i;
            let value = product[size];
            if ((value != null && value.toString() != "" && value.toString() != "0")) {
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
    changeOrderStatus(statuId) {
        let globalVariables = this.globalVariables;
        let orderService = this.orderService;
        let orderData = this.orderData;
        this.globalVariables.showConfirm(function (result) {
            if (result) {
                globalVariables.presentLoading();
                orderService.changeOrderStatu(orderData.Id, statuId).subscribe(data => {
                    orderData.StatuId = statuId;
                    globalVariables.dismissLoading();
                }, error => {
                    globalVariables.dismissLoading();
                });
            }
        });
    };

    edit(product) {
        this.navCtrl.push(UpdateProductInOrder, { product: product });
    }

    presentActionSheet() {
        let orderData = this.orderData;
        let exportService = this.exportService;
        let buttons = [];

        if (this.orderData.StatuId == 0) {
            let that = this;
            buttons.push(
                {
                    text: that.getLabel('OrderDetail.SendToCenter'),
                    handler: () => {
                        that.changeOrderStatus(1);
                    }
                }
            );
            buttons.push(
                {
                    text: that.getLabel('OrderDetail.CancelOrder'),
                      role: "destructive",
                    handler: () => {
                        that.changeOrderStatus(2);
                    }
                }
            );
        }
        buttons.push({
            text: this.getLabel('OrderDetail.SendEmail'),
            handler: () => {
                console.log('Send Email');
            }
        });
        buttons.push({
            text: this.getLabel('OrderDetail.ExportPdf'),
            handler: () => {
                exportService.exportPdf(orderData.Id);
                console.log('Export PDF');
            }
        });
        buttons.push({
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
                console.log('Cancel clicked');
            }
        });
        if (this.orderData.StatuId == 1) {
            let that = this;
            buttons.push(
                {
                    text: that.getLabel('OrderDetail.CancelOrder'),
                    role: "destructive",
                    handler: () => {
                        that.changeOrderStatus(2);
                    }
                }
            );
        }

        let actionSheet = this.actionSheetCtrl.create({
            title: this.getLabel('OrderDetail.SelectYourAction'),
            buttons: buttons
        });
        actionSheet.present();
    }

    getTotalPriceInOrder() {
        let currency = "";
        let price = 0;
        if (this.orderData.ProductList == undefined) {
            return price.toFixed(2);
        }
        for (let i = 0; i < this.orderData.ProductList.length; i++) {
            for (let j = 1; j <= this.globalVariables.getMaxSizeCount(); j++) {
                let size = "Size" + j;
                let product = this.orderData.ProductList[i];
                let value = product[size];
                if (value != null && value != "" && value != 0) {
                    price += product.Price * value;
                    currency = product.Symbol;
                }
            }
        }
        if (currency == "$") {
            return '$ ' + price.toFixed(2);
        }
    }
}
