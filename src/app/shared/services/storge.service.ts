import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';
import { Observable, from, lastValueFrom } from 'rxjs';

export interface StoredFile {
  name: string;
  path: string;
  url: string;
  size?: number;
  contentType?: string;
  createdAt?: number; // ms
}

@Injectable({ providedIn: 'root' })
export class StorageService {
  constructor(private storage: AngularFireStorage) {}

  // Upload to: invoices/{invoiceId}/{uid}/{timestamp}-{filename}
uploadInvoiceFile(invoiceId: string, file: File) {
  const ts = Date.now();
  const safeName = file.name.replace(/[^\w.\-]+/g, '_'); // sanitize filename
  const path = `invoices/${invoiceId}-${ts}-${safeName}`;

  const task = this.storage.upload(path, file, {
    contentType: file.type || 'application/octet-stream',
    customMetadata: { invoiceId, originalName: file.name }
  });

  const ref = this.storage.ref(path);

  const progress$ = task.percentageChanges();

  const whenDone = task.then(async snap => {
    const url = await lastValueFrom(ref.getDownloadURL());
    return {
      name: file.name,
      path,
      url,
      size: snap.totalBytes,
      contentType: file.type,
      createdAt: Date.now()
    } as StoredFile;
  });

  return { progress$, whenDone };
}

  getDownloadUrl(path: string): Observable<string> {
    return this.storage.ref(path).getDownloadURL();
  }

  delete(path: string): Promise<void> {
    return this.storage.ref(path).delete().toPromise();
  }

  // If you keep file metadata in Firestore (recommended), list from Firestore.
  // If you really need to list raw Storage objects, you’d have to use the modular SDK.
  // Best practice: store a subcollection per invoice with file entries (see section 4).
}
