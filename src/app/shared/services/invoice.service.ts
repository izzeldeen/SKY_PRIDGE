// src/app/services/invoices.service.ts
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';
import { Invoice } from '../models/invoice.model';

@Injectable({ providedIn: 'root' })
export class InvoicesService {
  constructor(private afs: AngularFirestore) {}

  addInvoice(invoice: Omit<Invoice, 'createdAt'>) {
    debugger;
    const payload: Invoice = { ...invoice, createdAt: Date.now() };
    return this.afs.collection<Invoice>('invoices').add(payload);
  }

listInvoicesWithCount(searchText?: string) {
  let collectionRef;
  if (searchText && searchText.trim() !== '') {
    const lower = searchText.trim().toLowerCase();

    collectionRef = this.afs.collection<Invoice>(
      'invoices',
      ref => ref
         .where('searchKeyWords', 'array-contains', lower) 
         .orderBy('createdAt', 'desc') 
                            
    );
  } else {
    collectionRef = this.afs.collection<Invoice>(
      'invoices',
      ref => 
        ref.orderBy('createdAt', 'desc')
    );
  }

  return collectionRef.valueChanges({ idField: 'id' }).pipe(
    map(items => ({
      entities: items,
      totalCount: (items as any[]).length
    }))
  );
}

updateInvoiceStatus(invoiceId: string, status: string) {
  return this.afs.collection('invoices').doc(invoiceId).update({
    status: status,
    updatedAt: new Date() // optional: track last update
  });
}

updateInvoice(invoiceId: string, data) {
  
  return this.afs.collection('invoices').doc(invoiceId).update({
    customer: data.customer,
    supplier: data.supplier,
    saleAmount: data.saleAmount,
    employeeId:data.employeeId,
    commissionPerc: data.commissionPerc,
    netAmount:data.netAmount,
    commission:data.commission,
    updatedAt: new Date(), // optional: track last update
    salePDF:data.salePDF,
    purchasePDF:data.purchasePDF,
    purchaseAmount:data.purchaseAmount
  });
}


getInvoicesTotals(): Observable<{ 
  totalSales: number, 
  totalPurchase: number, 
  totalNet: number 
}> {
  return this.afs.collection('invoices').valueChanges().pipe(
    map((invoices: any[]) => {
      let totalSales = 0;
      let totalPurchase = 0;
      let totalNet = 0;
      let count = 0;

      invoices.filter(x=> x.status == 'Paid' || x.status == 'Settled').forEach(inv => {
        totalSales += Number(inv.saleAmount) || 0;
        totalPurchase += Number(inv.purchaseAmount) || 0;
        totalNet += Number(inv.netAmount) || 0;
        count++;
      });

      return { totalSales, totalPurchase, totalNet , count };
    })
  );
}

deleteInvoice(invoiceId: string) {
  return this.afs.collection('invoices').doc(invoiceId).delete();
}


}
