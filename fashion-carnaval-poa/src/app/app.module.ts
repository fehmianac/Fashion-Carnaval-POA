import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { CloudSettings, CloudModule } from '@ionic/cloud-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home'
import { ProductDetailPage } from '../pages/product/product-detail'
import { CustomerListPage } from '../pages/customer/customer-list'
import { CustomerFormPage } from '../pages/customer/customer-form'
import { BasePage } from '../pages/base-page'
import { Providers } from '../providers/providers';
import { LastOrderPage } from '../pages/order/last-order'
import { SettingPage } from '../pages/setting/setting'
import { OrderDetailPage } from '../pages/order/order-detail'
import { BasketPage } from '../pages/basket/basket'
import { LoginPage } from '../pages/login/login'
import { RegisterPage } from '../pages/register/register'

import { UpdateProductInBasket } from '../pages/basket/update-product'
import { OrderCompletedPage } from '../pages/order/order-completed'
import { UpdateProductInOrder } from '../pages/order/update-product-in-order'
import { Snippets } from '../component/snippets/snippets'
import { Services } from '../services/services'
import { Storage } from '@ionic/storage';

const cloudSettings: CloudSettings = {
    'core': {
        'app_id': '849cac73'
    }
};

@NgModule({
    declarations: [
        MyApp,
        HomePage,
        CustomerListPage,
        CustomerFormPage,
        ProductDetailPage,
        SettingPage,
        LastOrderPage,
        OrderDetailPage,
        BasketPage,
        OrderCompletedPage,
        Snippets,
        UpdateProductInBasket,
        UpdateProductInOrder,
        LoginPage,
        RegisterPage
    ],
    imports: [
        IonicModule.forRoot(MyApp),
        CloudModule.forRoot(cloudSettings)
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        HomePage,
        CustomerListPage,
        CustomerFormPage,
        ProductDetailPage,
        SettingPage,
        LastOrderPage,
        OrderDetailPage,
        BasketPage,
        OrderCompletedPage,
        Snippets,
        UpdateProductInBasket,
        UpdateProductInOrder,
        LoginPage,
        RegisterPage
    ],
    providers: [{ provide: ErrorHandler, useClass: IonicErrorHandler }, Providers, Services, Snippets, Storage]
})
export class AppModule {
}
