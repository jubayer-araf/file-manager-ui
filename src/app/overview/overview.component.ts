import { Component } from '@angular/core';
import { FileService } from '../services/file.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss'
})
export class OverviewComponent {
  folderData : any | undefined;
  constructor(private fileService: FileService){

  }

  ngOnInit(){
    this.fileService.getFolderDetails("root").subscribe(res=>{
      this.folderData = res;
    });
  }

}
