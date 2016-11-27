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

    showAlert(title: string, description: string) {
        let alert = this.alertCtrl.create({
            title: title,
            subTitle: description,
            buttons: ['OK']
        });
        alert.present();
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
