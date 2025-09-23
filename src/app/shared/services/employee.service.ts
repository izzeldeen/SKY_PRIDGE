// src/app/services/invoices.service.ts
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee.model';

@Injectable({ providedIn: 'root' })
export class EmployeeService {
  private collectionName = 'employees';

  constructor(private afs: AngularFirestore) {}

  // 1️⃣ Get all employees (with id)
  getAllEmployees(): Observable<Employee[]> {
    return this.afs.collection<Employee>(this.collectionName)
      .valueChanges({ idField: 'id' });
  }

  // 2️⃣ Add commission when invoice settled
  async addCommissionOnInvoiceSettled(employeeId: string, commissionToAdd: number): Promise<void> {
    const employeeRef = this.afs.collection(this.collectionName).doc(employeeId).ref;

    return this.afs.firestore.runTransaction(async transaction => {
      const doc = await transaction.get(employeeRef);
      if (!doc.exists) {
        throw new Error("Employee not found");
      }

      const currentCommission = doc.data()?.['commission'] || 0;
      transaction.update(employeeRef, {
        commission: currentCommission + commissionToAdd
      });
    });
  }


}

