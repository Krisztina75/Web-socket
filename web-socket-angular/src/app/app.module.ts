import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexComponent } from './page/index/index.component';
import { EmployeeComponent } from './page/employee/employee.component';
import { NavComponent } from './nav/nav.component';
import { CreateEmployeeComponent } from './page/create-employee/create-employee.component';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    EmployeeComponent,
    NavComponent,
    CreateEmployeeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
