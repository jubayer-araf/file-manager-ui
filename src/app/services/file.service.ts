import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private baseUrl :string = "https://localhost:7293";

  constructor(public http: HttpClient) {
  }

  getFolderDetails(folderId: string): Observable<any[]> {


    const header = this.getHeader();

    return this.http.get<any[]>(`${this.baseUrl}/api/folder/${folderId}` , { headers : header} );
  }

  getFileDetails(fileId: string): Observable<any[]> {


    const header = this.getHeader();

    return this.http.get<any[]>(`${this.baseUrl}/api/filedetails/${fileId}` , { headers : header} );
  }

  getSharedFileDetails(): Observable<any[]> {


    const header = this.getHeader();

    return this.http.get<any[]>(`${this.baseUrl}/api/filedetails/shared` , { headers : header} );
  }

  upadateFolder(folderId: string, folderReq : any): Observable<any[]> {

    const header = this.getHeader();

    return this.http.put<any[]>(`${this.baseUrl}/api/folder/${folderId}`, folderReq , { headers : header} );
  }

  upadateFile(fileId: string, fileReq : any): Observable<any[]> {

    const header = this.getHeader();

    return this.http.put<any[]>(`${this.baseUrl}/api/filedetails/${fileId}`, fileReq , { headers : header} );
  }


  downloadFolder(folderId: string): Observable<any> {

    const header = this.getHeader();

    return this.http.get(`${this.baseUrl}/api/folder/download/${folderId}` , {
      headers : header,
      reportProgress: true,
      observe: 'events',
      responseType: 'blob',
     } );
  }

  

  downloadFile(fileId: string): Observable<any> {

    const header = this.getHeader();

    return this.http.get(`${this.baseUrl}/api/fileDetails/download/${fileId}` , {
      headers : header,
      reportProgress: true,
      observe: 'events',
      responseType: 'blob',
     });
  }

  
  uploadFile(folderId: string, file: File): Observable<any> {

    let header = this.getHeaderforUpload();

    const formData = new FormData();
    formData.append('formFile', file);
    formData.append('folderId', folderId);

    return this.http.post(`${this.baseUrl}/api/filedetails`, formData , {
      headers : header,
      reportProgress: true,
      observe: 'events',
    });
  }


  private getHeader() : HttpHeaders {
    let auth_token = localStorage.getItem("currentUserToken")

    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    });
  }

  private getHeaderforUpload() : HttpHeaders {
    let auth_token = localStorage.getItem("currentUserToken")

    return new HttpHeaders({
      'Accept': '*/*',
      'Authorization': `Bearer ${auth_token}`
    });
  }
}
