import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { NavController } from 'ionic-angular';
import { MultiLanguage } from '../../providers/multi-language'
import { GlobalVariables } from '../../providers/global-variables'
import { BasePage } from '../base-page'
import { HomePage } from '../home/home'
import { BrandServices } from '../../services/brand-service'
import { ApplicationService } from '../../services/application-service'
import { UserService } from '../../services/user-service'
import { CommonService } from '../../services/common-service'

@Component({
    selector: 'page-login',
    templateUrl: 'login.html'
})
export class LoginPage extends BasePage {

    selectedLanguage = "";
    brandList = [];
    homeImage = "";
    showRoomList = [];
    userName = "";
    password = "";
    constructor(public navCtrl: NavController,
        public multiLanguage: MultiLanguage,
        public globalVariables: GlobalVariables,
        public brandService: BrandServices,
        public applicationService: ApplicationService,
        public userService: UserService,
        public commonService: CommonService) {
        super(multiLanguage, globalVariables);
        this.applicationService.getApplicationSetting().subscribe(data => {
            this.homeImage = data.HomePageImageUrl;
        });
    }

    doLogin() {
        this.globalVariables.presentLoading();
        this.userService.doLogin(this.userName, this.password).subscribe(data => {
            this.globalVariables.setCurrentUserName(data.Username);
            this.globalVariables.setCurrentUserId(data.Id);
            this.globalVariables.setCurrentUserPriceTypeId(data.PriceTypeId);
            this.globalVariables.dismissLoading();
            this.navCtrl.setRoot(HomePage);

        }, error => {
            this.globalVariables.showAlert(this.getLabel("Validation.UserName.NotFound.Title"), this.getLabel("Validation.UserName.NotFound.Description"));
            this.globalVariables.dismissLoading();
        });
    }

}
