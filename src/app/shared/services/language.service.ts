import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
    providedIn: 'root'
})
export class LanguageService {

    constructor(private translate: TranslateService) { }
    public getCurrentLanguage(): string {
        return this.translate.currentLang;
    }
    public setLanguage(lang: string): void {
        this.translate.use(lang);
        this.translate.setDefaultLang(lang);
        localStorage.setItem('language', lang);
    }
}