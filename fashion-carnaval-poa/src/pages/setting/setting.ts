import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MultiLanguage } from '../../providers/multi-language'
import { GlobalVariables } from '../../providers/global-variables'
import { BasePage } from '../base-page'
import { HomePage } from '../home/home'
import { AlertController } from 'ionic-angular';
import { UserService } from '../../services/user-service'
import { LoginPage } from '../login/login'

@Component({
    selector: 'setting-page',
    templateUrl: 'setting.html'
})
export class SettingPage extends BasePage {

    selectedLanguage = "";
    languageList = [];
    selectedLanguageSelectBox = "";
    currentUserName = "";
    hideMenu = false;
    constructor(public navCtrl: NavController, public params: NavParams, public multiLanguage: MultiLanguage, public globalVariables: GlobalVariables, public alertCtrl: AlertController, public userService: UserService) {

        super(multiLanguage, globalVariables, true);
        this.hideMenu = params.get("hideMenu") == true;
        this.selectedLanguageSelectBox = this.multiLanguage.getSelectedLanguage();
        this.languageList = multiLanguage.getLanguageList();
        this.currentUserName = this.globalVariables.getCurrentUserName()

    }

    saveSetting() {
        this.globalVariables.presentLoading();
        this.multiLanguage.changeSelectedLanguage(this.selectedLanguageSelectBox);
        this.globalVariables.setCurrentUserName(this.currentUserName);
        this.userService.findUserInLocalData(this.currentUserName).subscribe(data => {
            if (data != null) {
                this.globalVariables.setCurrentUserName(this.currentUserName);
                this.globalVariables.setCurrentUserId(data.Id);
                this.globalVariables.setCurrentUserPriceTypeId(data.PriceTypeId);
                if (this.hideMenu) {
                    this.navCtrl.setRoot(HomePage);
                }
            } else {
                this.globalVariables.showAlert(this.getLabel("Validation.UserName.NotFound.Title"), this.getLabel("Validation.UserName.NotFound.Description"));
            }
        });
        this.globalVariables.dismissLoading();
        this.globalVariables.showAlert(this.getLabel('Alert.SettingSaved.Title'), this.getLabel('Alert.SettingSaved.Description'));
    }

    removeLocalData() {
        this.globalVariables.removeAllLocalData();
        setTimeout(function () {
            location.reload();
        }, 1000);
    }

    logOut() {
        this.globalVariables.setCurrentUserId(null);
        this.navCtrl.setRoot(LoginPage);
    }
}
