import { Injectable } from '@angular/core';
import { StorageService } from './storage'
import { AlertController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { MultiLanguage } from './multi-language'
import { Toast } from 'ionic-native';
/**
 * Storage is generic handler offline data.
 */
@Injectable()
export class GlobalVariables {

    loading = null;
    constructor(public storage: StorageService, public alertCtrl: AlertController, public loadingCtrl: LoadingController, public multiLanguage: MultiLanguage) {

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

    setCurrentShowroomId(showroomId) {
        this.storage.set("showroomId", showroomId, false);
    }

    getCurrentShowroomId() {
        return this.storage.get("showroomId");
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
            title: this.multiLanguage.getLabel(title),
            subTitle: this.multiLanguage.getLabel(description),
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

    showToast(message) {
        try {
            Toast.show(message, "short", "top").subscribe(
                toast => {
                }
            ).unsubscribe();
        } catch (ex) {
            alert(message);
        }

    }
    showErrorToast() {
        this.showToast(this.multiLanguage.getLabel("Common.Alert.Error.Description"));
    }

    showSuccessToast() {
        this.showToast(this.multiLanguage.getLabel("Common.Alert.Success.Description"));
    }
    showConfirm(callback) {
        let confirm = this.alertCtrl.create({
            title: this.multiLanguage.getLabel("Common.Confirm.Title"),
            message: this.multiLanguage.getLabel("Common.Confirm.Description"),
            buttons: [
                {
                    text: this.multiLanguage.getLabel("Common.Confirm.Button.Disagree"),
                    handler: () => {
                        callback(false);
                    }
                },
                {
                    text: this.multiLanguage.getLabel("Common.Confirm.Button.Agree"),
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
            duration: 130000,
            dismissOnPageChange: true,

        });

        var loading = this.loading;
        setTimeout(function () {
            loading.present();
        }, 10);
    }

    dismissLoading() {
        this.loading.dismiss();
    }

    getMaxSizeCount() {
        return 8;
    }


    getColorCode(name) {
        var color = this.storage.getAsJson("colorList");
        if (color != null) {
            let length = color.length;
            for (let i = 0; i < length; i++) {
                let currentColor = color[i];
                if (currentColor.Name.toLowerCase() == name.toLowerCase()) {
                    return currentColor.Code;
                }
            }
        }
        return "";
    }

    removeAllLocalData() {
        this.storage.clear();
    }

    isDummyVersion() {
        return this.storage.get("isDummyVersion") == "true" || this.storage.get("isDummyVersion") == "True" || this.storage.get("isDummyVersion") == null;
    }
}
