import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { MemberCreateComponent } from './members/member-create/member-create.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MemberService } from './_services/member.service';
import { DataTablesModule } from 'angular-datatables';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    AppComponent,
    MemberCreateComponent,
    MemberListComponent
  ],
  imports: [
    BrowserModule,
    DataTablesModule,
    CommonModule,
    HttpClientModule,
    AppRoutingModule,   
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    MemberService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
