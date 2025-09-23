import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NavigationService } from '../../../../services/navigation.service';
import { SearchService } from '../../../../services/search.service';
import { AuthService } from '../../../../services/auth.service';
import { debounce } from 'lodash-es';
import { DirectionService } from 'src/app/shared/services/change-language.service';
import { LanguageService } from 'src/app/shared/services/language.service';
import { Language } from 'src/app/shared/models/enum';
import { BaseService } from 'src/app/shared/services/base.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-header-sidebar-large',
  templateUrl: './header-sidebar-large.component.html',
  styleUrls: ['./header-sidebar-large.component.scss']
})
export class HeaderSidebarLargeComponent implements OnInit {
    notifications: any[];
    languages = [
      { code: Language.EN, label: 'English' },
      { code: Language.AR, label: 'العربية' }
    ];
    @ViewChild('eventsDrop') eventsDrop!: any;
    searchText = '';
    attachmentUrl = environment.attachmentUrl;
company:any;
    constructor
    (
      public navService: NavigationService,
      public searchService: SearchService,
      private auth: AuthService,
      private languageService : LanguageService,
      public directionService: DirectionService,
      private baseService: BaseService,
      private router:Router
    ) 
    {}
  
    ngOnInit() {
      this.checkWindowWidth();
    }
    
    loadNotifications() {
      const criteria = {
        pageSize: 1000,
        pageNumber: 0
      };

      this.baseService.getUserNotifications(criteria).subscribe(response => {
        this.notifications = response.entities.map((notif: any) => ({
          icon: 'i-Speach-Bubble-6', // You can adjust the icon based on notificationType or other criteria
          title: notif.title,
          text: notif.body,
          time: notif.createdDate,
          status: 'primary', // Adjust status based on your data if necessary
          link: '/path-to-details' // Define the link if necessary
        }));
      });
    }
    changeLanguage(newLang: Language): void {
      this.languageService.setLanguage(newLang);
      this.directionService.changeLanguage(newLang);
    }

    toggelSidebar() {
      const state = this.navService.sidebarState;
      state.childnavOpen = false;
      
      if (state.childnavOpen && state.sidenavOpen) {
        return state.childnavOpen = false;
      }
      if (!state.childnavOpen && state.sidenavOpen) {
        return state.sidenavOpen = false;
      }
      // item has no child items
      if (!state.sidenavOpen && !state.childnavOpen) {
        state.sidenavOpen = true;
      }
    }

    autocloseEnabled: string | boolean = true;

    @HostListener('window:resize')
    onWindowResize = debounce(() => {		
      this.checkWindowWidth();
    }, 200);
  
    checkWindowWidth() {
      if (window.innerWidth >= 768) {
        this.autocloseEnabled = true;
      } else {
        this.autocloseEnabled = 'inside';
      }
    }
  
    signout() {
      this.auth.signout();
    }

    navigateToDashboard(){
      this.router.navigate(['dashboard/v1'])
    }

 
}
