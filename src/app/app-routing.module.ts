import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthLayoutComponent } from './shared/components/layouts/auth-layout/auth-layout.component';
import { AuthGaurd } from './shared/services/auth.gaurd';
import { BlankLayoutComponent } from './shared/components/layouts/blank-layout/blank-layout.component';
import { AdminLayoutSidebarLargeComponent } from './shared/components/layouts/admin-layout-sidebar-large/admin-layout-sidebar-large.component';

const adminRoutes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () => import('./views/dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate: [AuthGaurd]
  },
  {
    path: 'accounts',
    loadChildren: () => import('./views/accounts/accounts.module').then(m => m.AccountsModule),
    canActivate: [AuthGaurd]
  },
  {
    path: 'company-management',
    loadChildren: () => import('./company-management/company-management.module').then(m => m.CompanyManagementModule),
    canActivate: [AuthGaurd]
  },
  {
    path: 'user-managment',
    loadChildren: () => import('./user-managment/user-managment.module').then(m => m.UserManagmentModule),
    canActivate: [AuthGaurd]
  },
  {
    path: 'product-management',
    loadChildren: () => import('./product-management/product-management.module').then(m => m.ProductManagementModule),
    canActivate: [AuthGaurd]
  },
  {
    path: 'invoice-management',
    loadChildren: () => import('./invoice-management/invoice-management.module').then(m => m.InvoiceManagementModule),
    canActivate: [AuthGaurd]
  },
  {
    path: 'purchase-management',
    loadChildren: () => import('./purchase-management/purchase-management.module').then(m => m.PurchaseManagementModule),
    canActivate: [AuthGaurd]
  },
  {
    path: 'lookups-managment',
    loadChildren: () => import('./lookups/lookups.module').then(m => m.LookupsModule),
    canActivate: [AuthGaurd]
  },
  {
    path: 'uikits',
    loadChildren: () => import('./views/ui-kits/ui-kits.module').then(m => m.UiKitsModule),
    canActivate: [AuthGaurd]
  },
  {
    path: 'forms',
    loadChildren: () => import('./views/forms/forms.module').then(m => m.AppFormsModule),
    canActivate: [AuthGaurd]
  },
  // {
  //   path: 'invoice',
  //   loadChildren: () => import('./views/invoice/invoice.module').then(m => m.InvoiceModule)
  // },
  {
    path: 'inbox',
    loadChildren: () => import('./views/inbox/inbox.module').then(m => m.InboxModule),
    canActivate: [AuthGaurd]
  },
  {
    path: 'calendar',
    loadChildren: () => import('./views/calendar/calendar.module').then(m => m.CalendarAppModule),
    canActivate: [AuthGaurd]
  },
  {
    path: 'chat',
    loadChildren: () => import('./views/chat/chat.module').then(m => m.ChatModule),
    canActivate: [AuthGaurd]
  },
  {
    path: 'contacts',
    loadChildren: () => import('./views/contacts/contacts.module').then(m => m.ContactsModule),
    canActivate: [AuthGaurd]
  },
  {
    path: 'tables',
    loadChildren: () => import('./views/data-tables/data-tables.module').then(m => m.DataTablesModule),
    canActivate: [AuthGaurd]
  },
  {
    path: 'pages',
    loadChildren: () => import('./views/pages/pages.module').then(m => m.PagesModule),
    canActivate: [AuthGaurd]
  },
  {
    path: 'icons',
    loadChildren: () => import('./views/icons/icons.module').then(m => m.IconsModule),
    canActivate: [AuthGaurd]
  },
  {
    path: 'reports',
    loadChildren: () => import('./reports/reports.module').then(m => m.ReportsModule),
    canActivate: [AuthGaurd]
  },
{
    path: 'report-management',
    loadChildren: () => import('./report-management/report-management.module').then(m => m.ReportManagementModule),
    canActivate: [AuthGaurd]
  },
];

const routes: Routes = [
  {
    path: '',
    redirectTo: 'sessions/signin',
    pathMatch: 'full'
  },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'sessions',
        loadChildren: () => import('./views/sessions/sessions.module').then(m => m.SessionsModule)
      }
    ]
  },
  {
    path: '',
    component: BlankLayoutComponent,
    children: [
      {
        path: 'others',
        loadChildren: () => import('./views/others/others.module').then(m => m.OthersModule)
      }
    ]
  },
  {
    path: '',
    component: AdminLayoutSidebarLargeComponent,
    canActivate: [AuthGaurd],
    children: adminRoutes
  },
  {
    path: '**',
    redirectTo: 'others/404'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: true,
    scrollPositionRestoration: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
