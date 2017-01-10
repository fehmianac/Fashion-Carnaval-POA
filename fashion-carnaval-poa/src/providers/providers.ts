import { Api } from './api';
import { StorageService } from './storage'
import { MultiLanguage } from './multi-language'
import { GlobalVariables } from './global-variables'

export {
    Api,
    StorageService,
    MultiLanguage,
    GlobalVariables

};

export const Providers: any[] = [
    Api,
    StorageService,
    MultiLanguage,
    GlobalVariables
]
