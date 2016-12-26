import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { NavController, NavParams } from 'ionic-angular';
import { MultiLanguage } from '../../providers/multi-language'
import { GlobalVariables } from '../../providers/global-variables'
import { CustomerListPage } from '../customer/customer-list'
import { BasePage } from '../base-page'
import { ExportService } from '../../services/export-service'
import { ActionSheetController } from 'ionic-angular';
import { LastOrderPage } from '../order/last-order'

@Component({
    selector: 'order-completed',
    templateUrl: 'order-completed.html'
})
export class OrderCompletedPage extends BasePage {

    orderId = null;
    orderNo = null;
    constructor(public navCtrl: NavController, public params: NavParams, public multiLanguage: MultiLanguage, public globalVariables: GlobalVariables, public actionSheetCtrl: ActionSheetController, public exportService: ExportService) {
        super(multiLanguage, globalVariables);
        this.orderId = params.get("orderKey");
        this.orderNo = params.get("OrderNo");
    }

    presentActionSheet() {
        let exportService = this.exportService;
        let buttons = [];

        buttons.push({
            text: this.getLabel('OrderDetail.SendEmail'),
            handler: () => {
                exportService.sendToEmail(this.orderId).subscribe(data => {
                    this.globalVariables.showSuccessAlert();
                }, error => {
                    this.globalVariables.showErrorAlert();
                });
                console.log('Send Email');
            }
        });
        buttons.push({
            text: this.getLabel('OrderDetail.ExportPdf'),
            handler: () => {
                exportService.exportPdf(this.orderId);
                console.log('Export PDF');
            }
        });

        buttons.push({
            text: this.getLabel('OrderCompleted.GotoOrderList'),
            handler: () => {
                this.navCtrl.setRoot(LastOrderPage);
                console.log('Send Email');
            }
        });
        buttons.push({
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
                console.log('Cancel clicked');
            }
        });
        let actionSheet = this.actionSheetCtrl.create({
            title: this.getLabel('OrderDetail.SelectYourAction'),
            buttons: buttons
        });
        actionSheet.present();
    }

}
