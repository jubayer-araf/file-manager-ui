import { Component } from '@angular/core';
import { FileService } from '../services/file.service';
import { ActivatedRoute } from '@angular/router';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-shared-files',
  templateUrl: './shared-files.component.html',
  styleUrl: './shared-files.component.scss'
})
export class SharedFilesComponent {
  folderData : any = {
    "childFolders" : [],
    "fileItems": []
   };
   percentDone: number = 0;

  constructor(private fileService: FileService, private route: ActivatedRoute){

  }

  ngOnInit(){
    this.getSharedFiles();
  }

  getSharedFiles(){
    this.fileService.getSharedFileDetails().subscribe(res=>{
      this.folderData.fileItems = res;
    });
  }


  onFileChange($event :any){
    let file = $event[0];
    console.log($event);
    const folderId = this.route.snapshot.paramMap.get('id');
    if(folderId){
      this.fileService.uploadFile(folderId, file).subscribe(async resp => {
        if (resp.type === HttpEventType.UploadProgress) {
          this.percentDone = Math.round(100 * resp.loaded / resp.total);
          console.log('Progress ' + this.percentDone + '%');
          if(this.percentDone == 100) {
            this.getSharedFiles();
          }
        } 
      });
    }

  }
}
