import { Component, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { NavController } from 'ionic-angular';
import { MultiLanguage } from '../../providers/multi-language'
import { GlobalVariables } from '../../providers/global-variables'
import { BasePage } from '../base-page'
import { CustomerListPage } from '../customer/customer-list'

@Component({
    selector: 'snippets',
    templateUrl: 'snippets.html'
})
export class Snippets {

    @Input()
    value = 0;

    @Output() callback: EventEmitter<string> = new EventEmitter<string>();

    constructor() {
        if (this.value == undefined) {
            this.value = 0;
        }
    }
    increase() {
        if (this.value == null) {
            this.value = 0;
        }
        if (this.value + 1 > 99) {
            return;
        }
        this.value = parseInt(this.value.toString()) + 1;
        this.callback.emit(this.value.toString());
    }

    decrease() {

        if (this.value == null) {
            this.value = 0;
        }
        if (this.value <= 0) {
            return;
        }
        this.value = parseInt(this.value.toString()) - 1;
        this.callback.emit(this.value.toString());
    }

    onChanges(event) {

        if (this.value == null) {
            this.value = 0;
        }
        this.callback.emit(this.value.toString());
    }

    onFocus() {
        if (this.value == 0) {
            this.value = null;
        }
    }

    onBlur() {
        if (this.value == null) {
            this.value = 0;
        }
        if (this.value > 99) {
            this.value = 99;
        }
    }
}
