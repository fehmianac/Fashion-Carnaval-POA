import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
/**
 * Storage is generic handler offline data.
 */
@Injectable()
export class StorageService {
    constructor(public storage: Storage) {
    }
    get(key: string) {
        var itemInLocalStrage = localStorage.getItem(key);
        if (itemInLocalStrage == null) {
            return null;
        }
        return itemInLocalStrage;
    }
    getAsJson(key: string) {
        var itemInLocalStrage = localStorage.getItem(key);
        if (itemInLocalStrage == null || itemInLocalStrage == undefined || itemInLocalStrage == "undefined") {
            return null;
        }
        return JSON.parse(itemInLocalStrage);
    }
    set(key: string, value: any, isJson: boolean = true) {
        if (isJson) {
            localStorage.setItem(key, JSON.stringify(value));

            this.storage.set(key, JSON.stringify(value));
        } else {
            localStorage.setItem(key, value);
            this.storage.set(key, value);
        }
    }

    delete(key: string) {
        localStorage.removeItem(key);
        this.storage.remove(key);
    }

    clear() {
        localStorage.clear();
        try {
            this.storage.clear();
        } catch (Ex) {

        }
    }

    loadLocalStorage() {
        debugger;
        var keys = this.storage.keys();
        debugger;
    }
}
