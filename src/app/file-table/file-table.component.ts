import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FileService } from '../services/file.service';
import { HttpResponse } from '@angular/common/http';
import { ScreenControlService } from '../services/screen-control.service';

@Component({
  selector: 'app-file-table',
  templateUrl: './file-table.component.html',
  styleUrl: './file-table.component.scss'
})
export class FileTableComponent {
 _fileData: any = {
  "childFolders" : [],
  "fileItems": []
  };
  get fileData(): any {
    return this._fileData;
  }
  @Input() set fileData(value: any) {
    this._fileData = value;
    console.log(this._fileData);
  }

  @Output() folderId = new EventEmitter<string>();
  folderSelect(id: string) {
    this.screenControlService.currentFolderId.next(id);
    this.folderId.emit(id);
  }

  constructor(private fileService: FileService , private screenControlService: ScreenControlService){

  }


  ngOnInit(){
    console.log(this.fileData);
  }

  downlaodFolder(folderId: string, folderName: string){
    this.fileService.downloadFolder(folderId).subscribe(async (event) => {
      let data = event as unknown as HttpResponse < Blob > ;
      const downloadedFile = new Blob([data.body as BlobPart], {
          type: data.body?.type
      });
      console.log("ddd", downloadedFile)
      if (downloadedFile.type != "") {
          const a = document.createElement('a');
          a.setAttribute('style', 'display:none;');
          document.body.appendChild(a);
          a.download = folderName;
          a.href = URL.createObjectURL(downloadedFile);
          a.target = '_blank';
          a.click();
          document.body.removeChild(a);
      }
    });
  }

  downlaodFile(fileId: string, fileName: string){
    this.fileService.downloadFile(fileId).subscribe(async (event) => {
      let data = event as unknown as HttpResponse < Blob > ;
      const downloadedFile = new Blob([data.body as BlobPart], {
          type: data.body?.type
      });
      console.log("ddd", downloadedFile)
      if (downloadedFile.type != "") {
          const a = document.createElement('a');
          a.setAttribute('style', 'display:none;');
          document.body.appendChild(a);
          a.download = fileName;
          a.href = URL.createObjectURL(downloadedFile);
          a.target = '_blank';
          a.click();
          document.body.removeChild(a);
      }
    });
  }

  fileSelect(fileId: string){

    this.screenControlService.isDetailsShown.next(true);
    this.screenControlService.fileDetailsId.next(fileId);

    console.log(fileId);
  }

  renameFile(file : any){
    this.screenControlService.fileRename.next(file);
  }

  addFolder(){
    this.screenControlService.fileRename.next({
      
    });
  }

  removeFolder(id: string){
    if(id){
      this.fileService.deleteFolder(id).subscribe(res=>{
        console.log(res);
        this.screenControlService.currentFolderId.subscribe(folderId=>{
          this.folderId.emit(folderId);
        })

      })
    }
  }

  removeFile(id: string){
    if(id){
      this.fileService.deleteFile(id).subscribe(res=>{
        console.log(res);
        this.screenControlService.currentFolderId.subscribe(folderId=>{
          this.folderId.emit(folderId);
        })
      })
    }
  }

}
