/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { DataService }     from './data.service';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
// import { TransactionComponent } from './Transaction/Transaction.component'

import { UniversityComponentComponent } from './UniversityComponent/UniversityComponent.component';


  import { StudentComponent } from './Student/Student.component';
  import { ProfesorComponent } from './Profesor/Profesor.component';
  import { StaffComponent } from './Staff/Staff.component';
  import { SystemAdministratorComponent } from './SystemAdministrator/SystemAdministrator.component';


  import { AuthorizeAccessFERComponent } from './AuthorizeAccessFER/AuthorizeAccessFER.component';
  import { RevokeAccessFERComponent } from './RevokeAccessFER/RevokeAccessFER.component';
  import { AuthorizeAccessFFZGComponent } from './AuthorizeAccessFFZG/AuthorizeAccessFFZG.component';
  import { RevokeAccessFFZGComponent } from './RevokeAccessFFZG/RevokeAccessFFZG.component';
  import { AuthorizeAccessFSBComponent } from './AuthorizeAccessFSB/AuthorizeAccessFSB.component';
  import { RevokeAccessFSBComponent } from './RevokeAccessFSB/RevokeAccessFSB.component';
@NgModule({
  declarations: [
    AppComponent,
		HomeComponent,
    // TransactionComponent,
    
    UniversityComponentComponent
    ,

    StudentComponent,
      ProfesorComponent,
      StaffComponent,
      
      SystemAdministratorComponent
      ,

    AuthorizeAccessFERComponent,
        RevokeAccessFERComponent,
        AuthorizeAccessFFZGComponent,
        RevokeAccessFFZGComponent,
        AuthorizeAccessFSBComponent,
        
        RevokeAccessFSBComponent
        
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
