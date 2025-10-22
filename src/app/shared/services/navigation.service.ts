import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LanguageService } from 'src/app/shared/services/language.service';
export interface IMenuItem {
    id?: string;
    title?: string;
    description?: string;
    type: string;       // Possible values: link/dropDown/extLink
    name?: string;      // Used as display text for item and title for separator type
    state?: string;     // Router state
    icon?: string;      // Material icon name
    tooltip?: string;   // Tooltip text
    disabled?: boolean; // If true, item will not be appeared in sidenav.
    sub?: IChildItem[]; // Dropdown items
    badges?: IBadge[];
    active?: boolean;
    permissions?: string
}
export interface IChildItem {
    id?: string;
    parentId?: string;
    type?: string;
    name: string;       // Display text
    state?: string;     // Router state
    icon?: string;
    sub?: IChildItem[];
    active?: boolean;
    permissions?: string

}

interface IBadge {
    color: string;      // primary/accent/warn/hex color codes(#fff000)
    value: string;      // Display text
}

interface ISidebarState {
    sidenavOpen?: boolean;
    childnavOpen?: boolean;
}

@Injectable({
    providedIn: 'root'
})
export class NavigationService {
    public sidebarState: ISidebarState = {
        sidenavOpen: true,
        childnavOpen: false
    };
    selectedItem: IMenuItem;

    constructor
        (
            public languageService: LanguageService
        ) { }
    defaultMenu: IMenuItem[] = [
           {
            name: 'Dashboard',
            type: 'dropDown',
            icon: 'i-Bar-Chart',
            permissions: 'Dashboards',
            sub: [
                {
                    name: 'Dashboard',
                    state: 'dashboard/v1',
                    type: 'link',
                    permissions: 'Dashboards'
                }
            ]
        },
         {
            name: 'Sales Management',
            type: 'dropDown',
            icon: 'i-File-Clipboard-File--Text',
            permissions: 'Invoice-Management',
            sub: [
                {
                    name: 'Invoices',
                    state: '/invoice-management/sales-invoice',
                    type: 'link',
                    permissions: 'sales-invoice',
                },
                  {
                    name: 'Costs',
                    state: '/invoice-management/cost-invoice',
                    type: 'link',
                    permissions: 'sales-invoice',
                }
            ]
        },
    ];



    // sets iconMenu as default;
    menuItems = new BehaviorSubject<IMenuItem[]>(this.defaultMenu);
    // navigation component has subscribed to this Observable
    menuItems$ = this.menuItems.asObservable();

    // You can customize this method to supply different menu for
    // different user type.
    // publishNavigationChange(menuType: string) {
    //   switch (userType) {
    //     case 'admin':
    //       this.menuItems.next(this.adminMenu);
    //       break;
    //     case 'user':
    //       this.menuItems.next(this.userMenu);
    //       break;
    //     default:
    //       this.menuItems.next(this.defaultMenu);
    //   }
    // }
}
