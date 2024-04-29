import { Component } from '@angular/core';
import { FileService } from '../services/file.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpEventType } from '@angular/common/http';
import { ScreenControlService } from '../services/screen-control.service';

@Component({
  selector: 'app-my-files',
  templateUrl: './my-files.component.html',
  styleUrl: './my-files.component.scss'
})
export class MyFilesComponent {

  param : string | undefined;
  folderData : any | undefined;
  percentDone: number = 0;

  constructor(private fileService: FileService, private route: ActivatedRoute, private screenControlService: ScreenControlService){

    
  }

  ngOnInit() {
    this.routeChangeApiCall();
    // this.router.events.subscribe((val: any) =>{
    //   this.routeChangeApiCall();
    //   console.log(val);
    // })
  }

  routeChangeApiCall() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.param = id;
      this.screenControlService.currentFolderId.next(id);
      this.fileService.getFolderDetails(id).subscribe(res=>{
        this.folderData = res;
      });
    }
  }
  
  folderIdSelect($event: any){
    this.fileService.getFolderDetails($event).subscribe(res=>{
      this.folderData = res;
    });
  }

  onFileChange($event :any){
    let file = $event[0];
    let fileSize = file.size;
    console.log($event);
    const folderId = this.route.snapshot.paramMap.get('id');
    if(folderId){
      this.fileService.uploadFile(folderId, file).subscribe(async resp => {
        if (resp.type === HttpEventType.UploadProgress) {
          this.percentDone = Math.round(100 * resp.loaded / resp.total);
          console.log('Progress ' + this.percentDone + '%');
          if(this.percentDone == 100) {
            this.routeChangeApiCall();
          }
        } 
      });
    }

  }

}
