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


  import { MemberComponent } from './Member/Member.component';
  import { SystemAdministratorComponent } from './SystemAdministrator/SystemAdministrator.component';


  import { CheckAccessFERComponent } from './CheckAccessFER/CheckAccessFER.component';
  import { CheckAccessFSBComponent } from './CheckAccessFSB/CheckAccessFSB.component';
  import { CheckAccessFFZGComponent } from './CheckAccessFFZG/CheckAccessFFZG.component';  
const routes: Routes = [
     //{ path: 'transaction', component: TransactionComponent },
    {path: '', component: HomeComponent},
		
		{ path: 'UniversityComponent', component: UniversityComponentComponent},
    
    
      { path: 'Member', component: MemberComponent},
      
      { path: 'SystemAdministrator', component: SystemAdministratorComponent},
      
      
        { path: 'CheckAccessFER', component: CheckAccessFERComponent},
        
        { path: 'CheckAccessFSB', component: CheckAccessFSBComponent},
        
        { path: 'CheckAccessFFZG', component: CheckAccessFFZGComponent},
        
		{path: '**', redirectTo:''}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
