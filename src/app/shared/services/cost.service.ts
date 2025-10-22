
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';
import { Cost } from '../models/cost.model';

@Injectable({ providedIn: 'root' })
export class CostInvoicesService {
  constructor(private afs: AngularFirestore) {}

  addCostInvoice(invoice: Omit<Cost, 'createdAt'>) {
 

    const payload: Cost = { ...invoice  , createdAt: Date.now() };
    return this.afs.collection<Cost>('costs').add(payload);
  }

listInvoicesWithCount(searchText?: string) {
  let collectionRef;
  if (searchText && searchText.trim() !== '') {
    const lower = searchText.trim().toLowerCase();

    collectionRef = this.afs.collection<Cost>(
      'costs',
      ref => ref
         .where('searchKeyWords', 'array-contains', lower) 
         .orderBy('createdAt', 'desc') 
                            
    );
  } else {
    collectionRef = this.afs.collection<Cost>(
      'costs',
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


deleteCostInvoice(invoiceId: string) {
  return this.afs.collection('costs').doc(invoiceId).delete();
}






}
