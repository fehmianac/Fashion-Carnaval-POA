import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { MultiLanguage } from '../providers/multi-language'
import { GlobalVariables } from '../providers/global-variables'
import { HomePage } from '../pages/home/home';
import { BasePage } from '../pages/base-page';
import { LastOrderPage } from '../pages/order/last-order'
import { SettingPage } from '../pages/setting/setting'
import { LoginPage } from '../pages/login/login'
import { BasketPage } from '../pages/basket/basket'
import { ApplicationService } from '../services/application-service'
import { UserService } from '../services/user-service'
import 'rxjs/add/operator/map';

@Component({
    templateUrl: 'app.html'
})
export class MyApp extends BasePage {
    @ViewChild(Nav) nav: Nav;

    rootPage: any = HomePage;

    pages: Array<{ icon: string, title: string, component: any }>;

    constructor(public platform: Platform, public multiLanguage: MultiLanguage, public globalVariables: GlobalVariables, public applicationService: ApplicationService, public userService: UserService) {
        super(multiLanguage, globalVariables);
        this.initializeApp();
        this.multiLanguage.reloadLanguageKeys();
        this.applicationService.getColorList();
        this.applicationService.getApplicationSetting();
        // used for an example of ngFor and navigation
        this.pages = [
            { icon: "md-home", title: 'NavigationBar.HomePage.Link', component: HomePage },
            { icon: "md-list", title: 'NavigationBar.LastOrder.Link', component: LastOrderPage },
            { icon: "md-cart", title: 'NavigationBar.Basket.Link', component: BasketPage },
            { icon: "md-settings", title: 'NavigationBar.Setting.Link', component: SettingPage }
        ];
        //this.userService.getAllUser();
    }

    initializeApp() {
        this.platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            StatusBar.styleDefault();
            Splashscreen.hide();
            if (this.globalVariables.getCurrentUserId() == null || this.globalVariables.getCurrentUserId() == "null") {
                this.nav.setRoot(LoginPage);
            }
        });
    }

    openPage(page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    }
}
