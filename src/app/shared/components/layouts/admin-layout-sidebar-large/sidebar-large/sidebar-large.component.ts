import { Component, OnInit, HostListener, ViewChildren, QueryList } from '@angular/core';
import {
  NavigationService,
  IMenuItem,
} from '../../../../services/navigation.service';
import { Router, NavigationEnd } from '@angular/router';
import { PerfectScrollbarDirective } from 'ngx-perfect-scrollbar';

import { filter } from 'rxjs/operators';
import { Utils } from '../../../../utils';
import { DirectionService } from 'src/app/shared/services/change-language.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-sidebar-large',
  templateUrl: './sidebar-large.component.html',
  styleUrls: ['./sidebar-large.component.scss']
})
export class SidebarLargeComponent implements OnInit {
  selectedItem: IMenuItem;
  nav: IMenuItem[];
  @ViewChildren(PerfectScrollbarDirective) psContainers:QueryList<PerfectScrollbarDirective>;
  psContainerSecSidebar: PerfectScrollbarDirective;

  constructor(public router: Router, public navService: NavigationService, private directionService: DirectionService,public authSerivce : AuthService) {
    setTimeout(() => {
      this.psContainerSecSidebar = this.psContainers?.toArray()[1];
    });
  }

  ngOnInit() {
	this.updateSidebar();
	this.appHeight();
    // CLOSE SIDENAV ON ROUTE CHANGE
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(routeChange => {
        this.closeChildNav();
        this.navService.sidebarState.sidenavOpen = false;
        setTimeout(() => {
          window.scrollTo({
            top: 0,
            behavior: 'smooth'
          });
        }, 0);      
      });

    this.navService.menuItems$.subscribe(items => {
      this.nav = [
        ...items, 
        { 
          name: 'Help', 
          type: 'dropDown', 
          icon: 'i-Speach-Bubble-Asking', 
          active: false, 
          sub: [
            { name: 'Knowledge center', state: '', type: '' },
            { name: 'Quick User Guide', state: '', type: '' },
          ]
        }, 
        { 
          name: 'Language', 
          type: 'dropDown', 
          icon: '', 
          active: false,
          sub: [
            { name: 'EN', state: '', type: '' },
            { name: 'GE', state: '', type: '' },
            { name: 'FR', state: '', type: '' },
            { name: 'AR', state: '', type: '' },
          ]
        }
      ];
      
      this.setActiveFlag();
    });
    // this.navService.sidebarState.sidenavOpen = false;
  }

  changeLanguage(newLang: string) {
    this.directionService.changeLanguage(newLang);
  }

  selectItem(item) {            
    this.navService.sidebarState.childnavOpen = true;
    this.navService.selectedItem = item;
    this.setActiveMainItem(item);
  }

  toggleClass(element: any) {
    element.closest('.nav-item').classList.toggle('active');
  }

  closeChildNav() {
    this.navService.sidebarState.childnavOpen = false;
    this.setActiveFlag();
  }

  onClickChangeActiveFlag(item) {
    this.setActiveMainItem(item);
  }
  
  setActiveMainItem(item) {
    this.nav.forEach(i => {
      i.active = false;
    });
    item.active = true;
  }

  setActiveFlag() {
    if (window && window.location) {
      const activeRoute = window.location.hash || window.location.pathname;
      this.nav.forEach(item => {
        item.active = false;
        if (activeRoute.indexOf(item.state) !== -1) {
          this.navService.selectedItem = item;
          item.active = true;
        }
        if (item.sub) {
          item.sub.forEach(subItem => {
            subItem.active = false;
            if (activeRoute.indexOf(subItem.state) !== -1) {
              this.navService.selectedItem = item;
              item.active = true;
            }
            if (subItem.sub) {
              subItem.sub.forEach(subChildItem => {
                if (activeRoute.indexOf(subChildItem.state) !== -1) {
                  this.navService.selectedItem = item;
                  item.active = true;
                  subItem.active = true;
                }
              });
            }
          });
        }
      });
    }
  }

	updateSidebar() {
		if (Utils.isMobile()) {
			this.navService.sidebarState.sidenavOpen = false;
			this.navService.sidebarState.childnavOpen = false;
		} else {
			this.navService.sidebarState.sidenavOpen = true;
		}
	}

	appHeight() {
		let vh = window.innerHeight * 0.01;
      	document.documentElement.style.setProperty('--app-height', `${vh}px`);
	}

	@HostListener('window:resize', ['$event'])
	onResize(event) {
		// this.updateSidebar();
		this.appHeight();
	}

  @HostListener('window:orientationchange', ['$event'])
  onOrientationChange(event) {
    this.appHeight();
  }
}
