import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
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
import { OrderCompletedPage } from '../pages/order/order-completed'
import { Snippets } from '../component/snippets/snippets'

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
        Snippets
    ],
    imports: [
        IonicModule.forRoot(MyApp)
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
        Snippets
    ],
    providers: [{ provide: ErrorHandler, useClass: IonicErrorHandler }, Providers,Snippets]
})
export class AppModule {
}
