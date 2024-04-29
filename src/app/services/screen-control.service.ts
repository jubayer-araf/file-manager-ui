import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScreenControlService {


  isDetailsShown: BehaviorSubject<boolean> = new BehaviorSubject(false);
  fileDetailsId: BehaviorSubject<string> = new BehaviorSubject("");
  currentFolderId: BehaviorSubject<string> = new BehaviorSubject("");
  fileRename: BehaviorSubject<any> = new BehaviorSubject({});


  constructor() { }
}
