import { Component, Input } from '@angular/core';
import { FileService } from '../services/file.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent {

  fileDetails : any = {};

  _fileId = "";
  get fileId(): any {
    return this._fileId;
  }
  @Input() set fileId(value: any) {
    this._fileId = value;
    if(this._fileId != ""){
      this.fileService.getFileDetails(this.fileId).subscribe(res=>{
        this.fileDetails = res;
      })
    }
  }
  constructor(private fileService: FileService){

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
}
