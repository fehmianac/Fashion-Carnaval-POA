import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Page1 } from '../pages/page1/page1';
import { Page2 } from '../pages/page2/page2';
import { HomePage } from '../pages/home/home'
import { CustomerListPage } from '../pages/customer/customer-list'
import { BasePage } from '../pages/base-page'
import { Providers } from '../providers/providers';


@NgModule({
    declarations: [
        MyApp,
        Page1,
        Page2,
        HomePage,
        CustomerListPage
    ],
    imports: [
        IonicModule.forRoot(MyApp)
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        Page1,
        Page2,
        HomePage,
        CustomerListPage
    ],
    providers: [{provide: ErrorHandler, useClass: IonicErrorHandler},Providers]
})
export class AppModule {
}
