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

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { TransactionComponent } from './Transaction/Transaction.component'
import { HomeComponent } from './home/home.component';

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
const routes: Routes = [
     //{ path: 'transaction', component: TransactionComponent },
    {path: '', component: HomeComponent},
		
		{ path: 'UniversityComponent', component: UniversityComponentComponent},
    
    
      { path: 'Student', component: StudentComponent},
      
      { path: 'Profesor', component: ProfesorComponent},
      
      { path: 'Staff', component: StaffComponent},
      
      { path: 'SystemAdministrator', component: SystemAdministratorComponent},
      
      
        { path: 'AuthorizeAccessFER', component: AuthorizeAccessFERComponent},
        
        { path: 'RevokeAccessFER', component: RevokeAccessFERComponent},
        
        { path: 'AuthorizeAccessFFZG', component: AuthorizeAccessFFZGComponent},
        
        { path: 'RevokeAccessFFZG', component: RevokeAccessFFZGComponent},
        
        { path: 'AuthorizeAccessFSB', component: AuthorizeAccessFSBComponent},
        
        { path: 'RevokeAccessFSB', component: RevokeAccessFSBComponent},
        
		{path: '**', redirectTo:''}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
