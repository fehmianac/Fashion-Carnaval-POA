import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { MultiLanguage } from '../providers/multi-language'
import { GlobalVariables } from '../providers/global-variables'
import { HomePage } from '../pages/home/home';
import { BasePage } from '../pages/base-page';
import { LastOrderPage } from '../pages/order/last-order'
import { SettingPage } from '../pages/setting/setting'
import { BasketPage } from '../pages/basket/basket'
import { Api } from '../providers/api'
import 'rxjs/add/operator/map';

@Component({
    templateUrl: 'app.html'
})
export class MyApp extends BasePage {
    @ViewChild(Nav) nav: Nav;

    rootPage: any = HomePage;

    pages: Array<{ icon: string, title: string, component: any }>;

    constructor(public platform: Platform, public multiLanguage: MultiLanguage, public globalVariables: GlobalVariables, public api: Api) {
        super(multiLanguage, globalVariables);
        this.initializeApp();
        this.multiLanguage.reloadLanguageKeys();

        // used for an example of ngFor and navigation
        this.pages = [
            { icon: "md-home", title: 'NavigationBar.HomePage.Link', component: HomePage },
            { icon: "md-list", title: 'NavigationBar.LastOrder.Link', component: LastOrderPage },
            { icon: "md-cart", title: 'NavigationBar.Basket.Link', component: BasketPage },
            { icon: "md-settings", title: 'NavigationBar.Setting.Link', component: SettingPage }
        ];

        let data = "";
        api.get('/language?request.status=1').map(res => res.json())
            .subscribe(data => {
                // we've got back the raw data, now generate the core schedule data
                // and save the data for later reference
                var languageKey = data.Result[0].Title;
                alert(languageKey);
            });;
    }

    initializeApp() {
        this.platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            StatusBar.styleDefault();
            Splashscreen.hide();
        });
    }

    openPage(page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    }
}
