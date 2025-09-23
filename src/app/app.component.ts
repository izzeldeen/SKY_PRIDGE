import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from './shared/services/language.service';
import { DirectionService } from './shared/services/change-language.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'bootDash';

  constructor(
    private translate: TranslateService,
    public directionService: DirectionService,
    public languageService: LanguageService) 
    {
    this.translate.addLangs(['ar', 'en'])
    var localLanguage = localStorage.getItem('language');
    if (localLanguage) {
      this.languageService.setLanguage(localLanguage);
    }
    else {
      this.languageService.setLanguage('ar');
      window.location.reload();
    }

    this.directionService.changeLanguage(localLanguage);

   }
   
}
