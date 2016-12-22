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
import { CommonService } from '../../services/common-service'
import { Deploy } from '@ionic/cloud-angular';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage extends BasePage {

    selectedLanguage = "";
    brandList = [];
    currentUserName = "";
    homeImage = "";
    showRoomList = [];
    currentShowRoom = null;

    constructor(public navCtrl: NavController,
        public multiLanguage: MultiLanguage,
        public globalVariables: GlobalVariables,
        public brandService: BrandServices,
        public applicationService: ApplicationService,
        public userService: UserService,
        public commonService: CommonService,
        public deploy: Deploy) {

       super(multiLanguage, globalVariables);

        try {
            this.deploy.check().then((hasUpdate: boolean) => {
                console.log(hasUpdate);
                if (hasUpdate) {
                    this.globalVariables.showAlert("",this.getLabel("Common.ApplicationWillBeUpdate"))
                    this.globalVariables.presentLoading();
                    this.deploy.download().then(() => {
                        this.deploy.extract().then(() => {
                            this.deploy.load();
                        });
                    });
                }
            });
        } catch (error) {

        }


        this.applicationService.getApplicationSetting().subscribe(data => {
            this.homeImage = data.HomePageImageUrl;
        });

        this.selectedLanguage = multiLanguage.getSelectedLanguage();
        this.currentUserName = this.globalVariables.getCurrentUserName();

        this.brandService.getBrandList().subscribe(data => {
            let length = data.length;
            for (let i = 0; i < length; i++) {
                let brand = data[i];
                this.brandList.push({ id: brand.Id, "imageUrl": brand.ImageUrl, "title": brand.Name, "shipmentEndDate": brand.ShipmentEndDate, "shipmentStartDate": brand.ShipmentStartDate });
            }
        });
        this.getShowList();
    }

    getShowList() {
        let userId = this.globalVariables.getCurrentUserId();
        this.commonService.getShowList(userId).subscribe(data => {
            this.showRoomList = [];
            let length = data.length;
            for (let i = 0; i < length; i++) {
                let current = data[i];
                if (userId == current.UserId && this.currentShowRoom == null) {
                    this.currentShowRoom = current.Id;
                }
                this.showRoomList.push({
                    Id: current.Id,
                    DisplayName: current.Name
                });
            }
        }, error => {

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
                if (this.showRoomList.length == 0) {
                    this.globalVariables.showAlert(this.getLabel("Validation.Showroom.MustNotBeNull.Title"), this.getLabel("Validation.UserName.Showroom.Description"));
                    this.getShowList();
                    return;
                }
                this.globalVariables.setCurrentShowroomId(this.currentShowRoom);
                this.navCtrl.setRoot(CustomerListPage);
            } else {
                this.globalVariables.showAlert(this.getLabel("Validation.UserName.NotFound.Title"), this.getLabel("Validation.UserName.NotFound.Description"));
            }
        });

    }
}
