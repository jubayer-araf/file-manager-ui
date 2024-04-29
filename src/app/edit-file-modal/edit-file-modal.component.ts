import { Component } from '@angular/core';
import { ScreenControlService } from '../services/screen-control.service';
import { FormsModule } from '@angular/forms';
import { FileService } from '../services/file.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-file-modal',
  templateUrl: './edit-file-modal.component.html',
  styleUrl: './edit-file-modal.component.scss'
})
export class EditFileModalComponent {

  title = "";
  fileModel = {
    name : "",
    description: ""
  }
  fileExt: string = "";
  fileId :any = "";
  parentFolderid : string | null ="";
  isFile = true;
  saveButtontitle = "Add New Folder";

  constructor(private screenControl: ScreenControlService, private fileService: FileService) { }

  ngOnInit(){

    this.screenControl.currentFolderId.subscribe(folderid=>{
      this.parentFolderid = folderid;
    });

    this.screenControl.fileRename.subscribe(file => {
      this.fileId = file.id;
      this.fileModel.description = file.description;
      if(file.parentFolderId != null ){
        this.parentFolderid = file.parentFolderId;
        this.isFile = false;
        this.fileModel.name = file.name;
        this.title = "Rename Folder";
        this.saveButtontitle = "Save Changes"
      } else if(file.folderId != null){
        this.parentFolderid = file.folderId;
        this.isFile = true;
        this.fileModel.name = this.seperateFilenameAndExt(file.name)[0];
        this.fileExt = "." + this.seperateFilenameAndExt(file.name)[1];
        this.title = "Rename File";
        this.saveButtontitle = "Save Changes"
      } else{
        this.isFile = false;
        this.title = "Add Folder";
      }
    });
  }

  private seperateFilenameAndExt(fileName : string){
    let file = fileName.split('/').pop();
    return [fileName.substr(0,fileName.lastIndexOf('.')),fileName.substr(fileName.lastIndexOf('.')+1,fileName.length)]
  }

  saveFile(){
    let folderReqModel = {
      "name" : this.fileModel.name + this.fileExt,
      "description" : this.fileModel.description,
      "parentFolderId" : this.parentFolderid
    }
    if(this.saveButtontitle == "Add New Folder"){
      this.fileService.addFolder(folderReqModel).subscribe(res=>{
        console.log(res);
      })
    }else{
      if(this.isFile){
        this.fileService.upadateFile(this.fileId, folderReqModel).subscribe(res=>{
          console.log(res);
        })
      }else{
        this.fileService.upadateFolder(this.fileId, folderReqModel).subscribe(res=>{
          console.log(res);
        })
      }
    }
  }

}
