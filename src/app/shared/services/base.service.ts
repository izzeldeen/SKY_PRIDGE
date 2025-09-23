import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { environment } from '../../../environments/environment';

export const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8'
    })
};



export const httpFormDataOptions = {
    headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*'
    }),
    responseType: 'text' as 'json'
};

export enum Actions {
    List = 'List',
}

@Injectable({
    providedIn: 'root'
})
export class BaseService {

    private APIUrl = environment.API;
    private abortSubject = new Subject<void>();

    constructor(private http: HttpClient) { }


    GenericGet<T>(controller: string, action: string): Observable<T> {
        const url = `${this.APIUrl}/${controller}/${action}`; // Construct the API URL
        return this.http.get<T>(url);
    }

    public Post(ControllerPath: string, ActionPath: string, body: any) {
        return this.http.post(`${this.APIUrl}/${ControllerPath}/${ActionPath}`, JSON.stringify(body), httpOptions)
    }

    public PostWithSignal(ControllerPath: string, ActionPath: string, body: any) {

        return this.http.post(`${this.APIUrl}/${ControllerPath}/${ActionPath}`, JSON.stringify(body), httpOptions)
            .pipe(takeUntil(this.abortSubject));
    }

    public Get(ControllerPath: string, ActionPath: string) {
        return this.http.get(`${this.APIUrl}/${ControllerPath}/${ActionPath}`)
    }

    public printReport(ControllerPath: string, ActionPath: string){
        var url = `${this.APIUrl}/${ControllerPath}/${ActionPath}`;
        window.open(url, '_blank');
    }
    public UpdateStatus(ControllerPath: string, ActionPath: string) {
        return this.http.get(`${this.APIUrl}/${ControllerPath}/${ActionPath}`)
    }

    public exportPDFInvoice(invoiceId: number): Observable<any> {
        return this.http.get(`${this.APIUrl}/Invoice/ExportPDFInvoice/${invoiceId}`, { responseType: 'blob' });
    }

   public generatePDF(ControllerPath: string, ActionPath: string, body: any): Observable<Blob> {
  const headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  return this.http.post(`${this.APIUrl}/${ControllerPath}/${ActionPath}`, body, {
    headers: headers,
    responseType: 'blob'
  });
}

    public cancelRequests() {
        this.abortSubject.next();
        this.abortSubject.complete();
        this.abortSubject = new Subject<void>();
    }


    postItemFromForm(controllerName: string, ActionName: string, object: any) {
        const form = new FormData();
        this.appendFormData(form, '', object);

        return this.http.post(`${this.APIUrl}/${controllerName}/${ActionName}`, form, {
            headers: httpFormDataOptions.headers,
            responseType: 'text' as 'json',
        });
    }

    private appendFormData(form: FormData, currentKey: string, data: any) {
        if (Array.isArray(data)) {
            data.forEach((item, index) => {
                const newKey = currentKey ? `${currentKey}[${index}]` : `[${index}]`;
                this.appendFormData(form, newKey, item);
            });
        } else if (data instanceof File) {
            if (data != null && data != undefined) {
                form.append(currentKey, data);
            }
        } else if (typeof data === 'object' && data !== null) {
            Object.keys(data).forEach((key) => {
                const value = data[key];
                const newKey = currentKey ? `${currentKey}.${key}` : key;

                if (Array.isArray(value)) {
                    const imageKey = key
                    value.forEach((item: any, index: number) => {
                        this.appendFormData(form, newKey, item);
                    });
                } else {
                    this.appendFormData(form, newKey, value);
                }

            });
        } else {
            if (data != null && data != undefined && data != '') {
                form.append(currentKey, data);
            }
        }
    }

    public getList(controllerName: string, baseSearch: any): Observable<any> {
        return this.http.post
            (
                this.APIUrl + controllerName + Actions.List,
                JSON.stringify(baseSearch),
                httpOptions
            );
    }


    public getLookupsByType(typeId: number): Observable<any> {
        return this.http.get(`${this.APIUrl}/Lookups/GetByTypeId/${typeId}`, httpOptions)
    }


    public getUserNotifications(criteria: any): Observable<any> {
        return this.http.post(`${this.APIUrl}/Notifications/GetUserNotifications`, JSON.stringify(criteria), httpOptions);
    }

    getFile(ControllerPath: string, ActionPath: string): Observable<Blob> {
        return this.http.get(`${this.APIUrl}/${ControllerPath}/${ActionPath}`, { responseType: 'blob' });
    }
    ExportExcel(ControllerPath: string, ActionPath: string, baseSearch: any): Observable<Blob> {
        return this.http.post<Blob>(`${this.APIUrl}/${ControllerPath}/${ActionPath}`, JSON.stringify(baseSearch), { ...httpOptions, responseType: 'blob' as 'json' });
    }

    uploadFile(ControllerPath: string, ActionPath: string, file: FormData) {
        return this.http.post(`${this.APIUrl}/${ControllerPath}/${ActionPath}`, file);
    }

}