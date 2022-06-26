import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommentBoxComponent } from './comment-box/comment-box.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './material.module';
import { HttpClientModule } from '@angular/common/http';
import { CommentCardComponent } from './comment-card/comment-card.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DeleteDialogComponent } from './comment-card/delete-dialog/delete-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    CommentBoxComponent,
    CommentCardComponent,
    DeleteDialogComponent
  ],
  imports: [
    BrowserModule,
    FlexLayoutModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
