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
        Id: 2,
        LastLoginDate: "2017-01-03",
        UserName: "",
        Password: "",
        Email: "",
        PriceTypeId: 8,
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
        this.userService.register(this.registerModel).subscribe(data => {
            this.globalVariables.showAlert("Success...", "Your user was created successfully. You would login the application.");
        }, err => {
            this.globalVariables.showErrorAlert();
        });
    }

}
