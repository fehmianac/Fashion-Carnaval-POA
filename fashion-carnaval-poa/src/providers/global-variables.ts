import { Injectable } from '@angular/core';
import { Storage } from './storage'
import { AlertController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { MultiLanguage } from './multi-language'
/**
 * Storage is generic handler offline data.
 */
@Injectable()
export class GlobalVariables {

    loading = null;
    constructor(public storage: Storage, public alertCtrl: AlertController, public loadingCtrl: LoadingController, public multiLanguage: MultiLanguage) {

    }
    setCurrentUserName(userName: string) {
        this.storage.set("currentUserName", userName, false);
    }

    getCurrentUserName() {
        return this.storage.get("currentUserName");
    }
    setCurrentUserId(userId: string) {
        this.storage.set("currentUserId", userId, false);
    }
    getCurrentUserId() {
        return this.storage.get("currentUserId");
    }
    setCurrentCustomerId(customerId: string) {
        this.storage.set("currentCustomerId", customerId, false);
    }
    getCurrentCustomerId() {
        return this.storage.get("currentCustomerId");
    }
    setCurrentUserPriceTypeId(priceTypeId: string) {
        this.storage.set("currentUserPriceTypeId", priceTypeId, false);
    }
    getCCurrentUserPriceTypeId() {
        return this.storage.get("currentUserPriceTypeId");
    }
    setCurrentBrandId(brandId: number) {
        this.storage.set("currentBrandId", brandId, false);
    }

    getCurrentBrandId() {
        return this.storage.get("currentBrandId");
    }

    getGuid() {
        function guid() {
            function s4() {
                return Math.floor((1 + Math.random()) * 0x10000)
                    .toString(16)
                    .substring(1);
            }
            return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                s4() + '-' + s4() + s4() + s4();
        }
        return guid();
    }
    showAlert(title: string, description: string) {
        let alert = this.alertCtrl.create({
            title: title,
            subTitle: description,
            buttons: ['OK']
        });
        return alert.present();
    }

    showErrorAlert() {
        this.showAlert(this.multiLanguage.getLabel("Common.Alert.Error.Title"), this.multiLanguage.getLabel("Common.Alert.Error.Description"));
    }

    showSuccessAlert() {
        this.showAlert(this.multiLanguage.getLabel("Common.Alert.Success.Title"), this.multiLanguage.getLabel("Common.Alert.Success.Description"));
    }

    showConfirm(callback) {
        let confirm = this.alertCtrl.create({
            title: 'Confirmation',
            message: 'Do you agree to use this lightsaber to do good across the intergalactic galaxy?',
            buttons: [
                {
                    text: 'Disagree',
                    handler: () => {
                        callback(false);
                    }
                },
                {
                    text: 'Agree',
                    handler: () => {
                        callback(true);
                    }
                }
            ]
        });
        confirm.present();
    }


    presentLoading() {
        this.loading = this.loadingCtrl.create({
            content: this.multiLanguage.getLabel("Common.LoadingLabel"),
            duration: 3000,
            dismissOnPageChange: true
        });
        this.loading.present();
    }

    dismissLoading() {
        this.loading.dismiss();
    }
}
