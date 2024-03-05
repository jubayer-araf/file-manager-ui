import { Component } from '@angular/core';
import { ScreenControlService } from './services/screen-control.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'file-manager-ui';

  showDetailsSection = false;
  fileId : string = "";
  styles: { name: string; value: string; }[] = [];

  constructor(private screenControl: ScreenControlService){

  }
  
  ngOnInit(){
    this.screenControl.isDetailsShown.subscribe(isShown => {
      this.showDetailsSection = isShown;
    });

    this.screenControl.fileDetailsId.subscribe(fileId => {
      this.fileId = fileId;
    });

    // this.styles = [
    //   { name: 'background', value: "#202124" },
    //   { name: 'white', value: "#1F2020" },
    //   { name: 'text', value: "#fff" },
    // ];

    // this.styles.forEach(data => {
    //       document.documentElement.style.setProperty(`--${data.name}`, data.value);
    // });

  }

}
