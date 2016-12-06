import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { NavController } from 'ionic-angular';
import { MultiLanguage } from '../../providers/multi-language'
import { GlobalVariables } from '../../providers/global-variables'
import { BasePage } from '../base-page'
import { CustomerListPage } from '../customer/customer-list'
import { BrandServices } from '../../services/brand-service'
import { ApplicationService } from '../../services/application-service'
import { UserService } from '../../services/user-service'

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage extends BasePage {

    selectedLanguage = "";
    brandList = [];
    currentUserName = "";
    homeImage = "";

    constructor(public navCtrl: NavController,
        public multiLanguage: MultiLanguage,
        public globalVariables: GlobalVariables,
        public brandService: BrandServices,
        public applicationService: ApplicationService,
        public userService: UserService) {

        super(multiLanguage, globalVariables);
        this.applicationService.getApplicationSetting().subscribe(data => {
            this.homeImage = data.HomePageImageUrl;
        });
        this.selectedLanguage = multiLanguage.getSelectedLanguage();
        this.currentUserName = this.globalVariables.getCurrentUserName();

        this.brandService.getBrandList().subscribe(data => {
            let length = data.length;
            for (let i = 0; i < length; i++) {
                let brand = data[i];
                this.brandList.push({ id: brand.Id, "imageUrl": brand.ImageUrl, "title": brand.Name });
            }
        });

    }

    selectBrand(id: number) {
        if (this.currentUserName == "" || this.currentUserName == "null" || this.currentUserName == undefined) {
            this.globalVariables.showAlert(this.getLabel("Validation.UserName.MustNotBeNull.Title"), this.getLabel("Validation.UserName.MustNotBeNull.Description"));
            return;
        }
        this.userService.findUserInLocalData(this.currentUserName).subscribe(data => {
            if (data != null) {
                this.globalVariables.setCurrentBrandId(id);
                this.globalVariables.setCurrentUserName(this.currentUserName);
                this.globalVariables.setCurrentUserId(data.Id);
                this.globalVariables.setCurrentUserPriceTypeId(data.PriceTypeId);
                this.navCtrl.setRoot(CustomerListPage);
            } else {
                this.globalVariables.showAlert(this.getLabel("Validation.UserName.NotFound.Title"), this.getLabel("Validation.UserName.NotFound.Description"));
            }
        });

    }
}
