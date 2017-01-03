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
    selector: 'page-register',
    templateUrl: 'register.html'
})
export class RegisterPage extends BasePage {

    registerModel = {
        Id: 0,
        LastLoginDate: "2017-01-03",
        UserName: "",
        Password: "",
        Email: "",
        PriceTypeId: 1,
        IsDeleted: 0,
        ConfirmationId: ""

    }

    constructor(public navCtrl: NavController,
        public multiLanguage: MultiLanguage,
        public globalVariables: GlobalVariables,
        public brandService: BrandServices,
        public applicationService: ApplicationService,
        public userService: UserService,
        public commonService: CommonService) {
        super(multiLanguage, globalVariables);
        this.registerModel.ConfirmationId = this.globalVariables.getGuid();
  
    }

    saveUser() {
        this.globalVariables.presentLoading();
        this.userService.register(this.registerModel).subscribe(data => {
            this.globalVariables.showAlert("Success...", "Your user was created successfully. You would login the application.");
            this.userService.doLogin(this.registerModel.UserName, this.registerModel.Password).subscribe(data => {
            this.globalVariables.setCurrentUserName(data.Username);
            this.globalVariables.setCurrentUserId(data.Id);
            this.globalVariables.setCurrentUserPriceTypeId(data.PriceTypeId);
            this.navCtrl.setRoot(HomePage);

        }, error => {
            
            this.globalVariables.showAlert(this.getLabel("Validation.UserName.NotFound.Title"), this.getLabel("Validation.UserName.NotFound.Description"));
     
        });
        }, err => {
            this.globalVariables.dismissLoading();
            this.globalVariables.showErrorAlert();
        });
    }

}
