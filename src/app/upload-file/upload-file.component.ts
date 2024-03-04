import { Component, EventEmitter, HostBinding, HostListener, Input, Output } from '@angular/core';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrl: './upload-file.component.scss'
})
export class UploadFileComponent {

  public files: any[] = [];
  public _uploadProgress: number = 0;
  isDragging = false;

  get uploadProgress(): number {
    return this._uploadProgress;
  }
  @Input() set uploadProgress(value: number) {
    if(value == 100) this._uploadProgress = 0;
    else this._uploadProgress = value;
  }

  @Output() private filesChangeEmiter : EventEmitter<File[]> = new EventEmitter();

  onFileChange($event :any){
    console.log($event);
  }

  @HostListener('dragover', ['$event']) public onDragOver(evt : any){
    evt.preventDefault();
    evt.stopPropagation();
    this.isDragging = true;
  }

  @HostListener('dragleave', ['$event']) public onDragLeave(evt :any){
    evt.preventDefault();
    evt.stopPropagation();
    this.isDragging = false;

  }

  @HostListener('drop', ['$event']) public onDrop(evt: any){
    evt.preventDefault();
    evt.stopPropagation();
    this.isDragging = false;

    let files = evt.dataTransfer.files;
    let valid_files : Array<File> = files;
    this.filesChangeEmiter.emit(valid_files);

  }

  cancelUpload() {
    // Reset upload progress and clear files array
    this._uploadProgress = 0;
    this.files = [];
  }

}
