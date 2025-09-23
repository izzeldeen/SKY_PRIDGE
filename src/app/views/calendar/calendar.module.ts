import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { CalendarModule, DateAdapter } from "angular-calendar";
import { ColorPickerModule } from "ngx-color-picker";
import { CalendarRoutingModule } from './calendar-routing.module';
import { CalendarFormDialogComponent } from './calendar-form-dialog/calendar-form-dialog.component';
import { CalendarComponent } from './calendar/calendar.component';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgbModule,
    ColorPickerModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    CalendarRoutingModule
  ],
  declarations: [CalendarComponent, CalendarFormDialogComponent]
})
export class CalendarAppModule { }
