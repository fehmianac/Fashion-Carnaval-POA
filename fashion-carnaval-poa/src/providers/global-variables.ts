import { Injectable } from '@angular/core';
import { Storage } from './storage'
import { AlertController } from 'ionic-angular';
/**
 * Storage is generic handler offline data.
 */
@Injectable()
export class GlobalVariables {

    constructor(public storage: Storage, public alertCtrl: AlertController) {

    }
    setCurrentUserName(userName: string) {
        this.storage.set("currentUserName", userName, false);
    }

    getCurrentUserName() {
        return this.storage.get("currentUserName");
    }

    showAlert(title: string, description:string){
         let alert = this.alertCtrl.create({
            title: title,
            subTitle: description,
            buttons: ['OK']
        });
        alert.present();
    }
}
