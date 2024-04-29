import { Component } from '@angular/core';
import { FileService } from '../services/file.service';
import { ScreenControlService } from '../services/screen-control.service';

@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrl: './trash.component.scss'
})
export class TrashComponent {

  folderData : any;
  fromTrash = true;

  constructor(private fileService: FileService, private screenControlService: ScreenControlService){

  }
  ngOnInit(){
    this.fileService.getDeleted().subscribe(res=>{
      this.folderData = res;
    })
  }

  restoreFolder(id: string){
    this.fileService.restoreFolder(id).subscribe(res=>{
      console.log(res);
      this.ngOnInit();
    })
  }

  restoreFile(id: string){
    this.fileService.restoreFile(id).subscribe(res=>{
      console.log(res);
      this.ngOnInit();
    })
  }


  fileSelect(fileId: string){

    this.screenControlService.isDetailsShown.next(true);
    this.screenControlService.fileDetailsId.next(fileId);

    console.log(fileId);
  }

}
