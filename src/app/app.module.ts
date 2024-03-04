import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { OverviewComponent } from './overview/overview.component';
import { FileTableComponent } from './file-table/file-table.component';
import { UploadFileComponent } from './upload-file/upload-file.component';
import { MyFilesComponent } from './my-files/my-files.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { HttpInterceptorService } from './services/http-interceptor.service';
import { DetailsComponent } from './details/details.component';
import { SharedFilesComponent } from './shared-files/shared-files.component';
import { EditFileModalComponent } from './edit-file-modal/edit-file-modal.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    SideBarComponent,
    OverviewComponent,
    FileTableComponent,
    UploadFileComponent,
    MyFilesComponent,
    LoginComponent,
    DetailsComponent,
    SharedFilesComponent,
    EditFileModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
