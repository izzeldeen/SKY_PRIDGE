import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { InvoiceStatusArr, OrderStatusNewWorkFlowArr, PaymentTypesArr, StatusArr, UserTypeArr } from '../../models/enum';
import { LanguageService } from '../../services/language.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  //#region Input Output variables
  @Input() Headers: any[] = []
  @Input() dataSource:any[] = []
  @Input() actionList : any = []

  // pagination 
  @Input() TotalRecords : number = 0
  @Input() PageSize : number = 0

  //out-put
  @Output() EventHandler = new EventEmitter<any>()
  @Output() PageChange = new EventEmitter<any>()
 //#endregion

  StatusArr = StatusArr
  PaymentTypesArr = PaymentTypesArr;
  OrderStatusArr = OrderStatusNewWorkFlowArr;
  InvoiceStatusArr = InvoiceStatusArr;
  userTypeArr = UserTypeArr;
  
  constructor(private languageService : LanguageService,public authService:AuthService) {
    
  }

  ngOnInit(): void {
  }

  onPageChange(event){
    this.PageChange.emit(event)
  }


  redirect(event: any) {

  }

  onItemEvent(action : any , data: any) { 
    this.EventHandler.emit({action , data})
  }

  getActiveText(value: boolean) {
    return value ? 
    (this.languageService.getCurrentLanguage() == 'ar' ? 'فعال' : 'Active') :
    (this.languageService.getCurrentLanguage() == 'ar' ? 'غير فعال' : 'Inactive')
  }

  

  getOrderStatusText(statusId: number) {
    const status = OrderStatusNewWorkFlowArr.find(x => x.id === statusId);
    return status ? (this.languageService.getCurrentLanguage() === 'en' ? status.name : status.nameAr) : '';
  }
  
  getPaymentTypeText(paymentTypeId: number) {
    const paymentType = PaymentTypesArr.find(x => x.id === paymentTypeId);
    return paymentType ? (this.languageService.getCurrentLanguage() === 'en' ? paymentType.name : paymentType.nameAr) : '';
  }

  getInvoiceStatusText(statusId: number) {
    const status = InvoiceStatusArr.find(x => x.id === statusId);
    return status ? (this.languageService.getCurrentLanguage() === 'en' ? status.name : status.nameAr) : '';
  }

  getuserTypeText(userId: number) {
    const type = UserTypeArr.find(x => x.id === userId);
    return type ? (this.languageService.getCurrentLanguage() === 'en' ? type.name : type.nameAr) : '';
  }
}
