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

import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ProfesorService } from './Profesor.service';
import 'rxjs/add/operator/toPromise';
@Component({
	selector: 'app-Profesor',
	templateUrl: './Profesor.component.html',
	styleUrls: ['./Profesor.component.css'],
  providers: [ProfesorService]
})
export class ProfesorComponent implements OnInit {

  myForm: FormGroup;

  private allParticipants;
  private participant;
  private currentId;
	private errorMessage;

  
      
          title = new FormControl("", Validators.required);
        
  
      
          fieldOfJob = new FormControl("", Validators.required);
        
  
      
          jmbag = new FormControl("", Validators.required);
        
  
      
          firstName = new FormControl("", Validators.required);
        
  
      
          lastName = new FormControl("", Validators.required);
        
  
      
          universityComponent = new FormControl("", Validators.required);
        
  
      
          authorized = new FormControl("", Validators.required);
        
  


  constructor(private serviceProfesor:ProfesorService, fb: FormBuilder) {
    this.myForm = fb.group({
    
        
          title:this.title,
        
    
        
          fieldOfJob:this.fieldOfJob,
        
    
        
          jmbag:this.jmbag,
        
    
        
          firstName:this.firstName,
        
    
        
          lastName:this.lastName,
        
    
        
          universityComponent:this.universityComponent,
        
    
        
          authorized:this.authorized
        
    
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    let tempList = [];
    return this.serviceProfesor.getAll()
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      result.forEach(participant => {
        tempList.push(participant);
      });
      this.allParticipants = tempList;
    })
    .catch((error) => {
        if(error == 'Server error'){
            this.errorMessage = "Could not connect to REST server. Please check your configuration details";
        }
        else if(error == '404 - Not Found'){
				this.errorMessage = "404 - Could not find API route. Please check your available APIs."
        }
        else{
            this.errorMessage = error;
        }
    });
  }

	/**
   * Event handler for changing the checked state of a checkbox (handles array enumeration values)
   * @param {String} name - the name of the participant field to update
   * @param {any} value - the enumeration value for which to toggle the checked state
   */
  changeArrayValue(name: string, value: any): void {
    const index = this[name].value.indexOf(value);
    if (index === -1) {
      this[name].value.push(value);
    } else {
      this[name].value.splice(index, 1);
    }
  }

	/**
	 * Checkbox helper, determining whether an enumeration value should be selected or not (for array enumeration values
   * only). This is used for checkboxes in the participant updateDialog.
   * @param {String} name - the name of the participant field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified participant field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addParticipant(form: any): Promise<any> {
    this.participant = {
      $class: "org.szg.Profesor",
      
        
          "title":this.title.value,
        
      
        
          "fieldOfJob":this.fieldOfJob.value,
        
      
        
          "jmbag":this.jmbag.value,
        
      
        
          "firstName":this.firstName.value,
        
      
        
          "lastName":this.lastName.value,
        
      
        
          "universityComponent":this.universityComponent.value,
        
      
        
          "authorized":this.authorized.value
        
      
    };

    this.myForm.setValue({
      
        
          "title":null,
        
      
        
          "fieldOfJob":null,
        
      
        
          "jmbag":null,
        
      
        
          "firstName":null,
        
      
        
          "lastName":null,
        
      
        
          "universityComponent":null,
        
      
        
          "authorized":null
        
      
    });

    return this.serviceProfesor.addParticipant(this.participant)
    .toPromise()
    .then(() => {
			this.errorMessage = null;
      this.myForm.setValue({
      
        
          "title":null,
        
      
        
          "fieldOfJob":null,
        
      
        
          "jmbag":null,
        
      
        
          "firstName":null,
        
      
        
          "lastName":null,
        
      
        
          "universityComponent":null,
        
      
        
          "authorized":null 
        
      
      });
    })
    .catch((error) => {
        if(error == 'Server error'){
            this.errorMessage = "Could not connect to REST server. Please check your configuration details";
        }
        else{
            this.errorMessage = error;
        }
    });
  }


   updateParticipant(form: any): Promise<any> {
    this.participant = {
      $class: "org.szg.Profesor",
      
        
          
            "title":this.title.value,
          
        
    
        
          
            "fieldOfJob":this.fieldOfJob.value,
          
        
    
        
          
        
    
        
          
            "firstName":this.firstName.value,
          
        
    
        
          
            "lastName":this.lastName.value,
          
        
    
        
          
            "universityComponent":this.universityComponent.value,
          
        
    
        
          
            "authorized":this.authorized.value
          
        
    
    };

    return this.serviceProfesor.updateParticipant(form.get("jmbag").value,this.participant)
		.toPromise()
		.then(() => {
			this.errorMessage = null;
		})
		.catch((error) => {
            if(error == 'Server error'){
				this.errorMessage = "Could not connect to REST server. Please check your configuration details";
			}
            else if(error == '404 - Not Found'){
				this.errorMessage = "404 - Could not find API route. Please check your available APIs."
			}
			else{
				this.errorMessage = error;
			}
    });
  }


  deleteParticipant(): Promise<any> {

    return this.serviceProfesor.deleteParticipant(this.currentId)
		.toPromise()
		.then(() => {
			this.errorMessage = null;
		})
		.catch((error) => {
            if(error == 'Server error'){
				this.errorMessage = "Could not connect to REST server. Please check your configuration details";
			}
			else if(error == '404 - Not Found'){
				this.errorMessage = "404 - Could not find API route. Please check your available APIs."
			}
			else{
				this.errorMessage = error;
			}
    });
  }

  setId(id: any): void{
    this.currentId = id;
  }

  getForm(id: any): Promise<any>{

    return this.serviceProfesor.getparticipant(id)
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      let formObject = {
        
          
            "title":null,
          
        
          
            "fieldOfJob":null,
          
        
          
            "jmbag":null,
          
        
          
            "firstName":null,
          
        
          
            "lastName":null,
          
        
          
            "universityComponent":null,
          
        
          
            "authorized":null 
          
        
      };



      
        if(result.title){
          
            formObject.title = result.title;
          
        }else{
          formObject.title = null;
        }
      
        if(result.fieldOfJob){
          
            formObject.fieldOfJob = result.fieldOfJob;
          
        }else{
          formObject.fieldOfJob = null;
        }
      
        if(result.jmbag){
          
            formObject.jmbag = result.jmbag;
          
        }else{
          formObject.jmbag = null;
        }
      
        if(result.firstName){
          
            formObject.firstName = result.firstName;
          
        }else{
          formObject.firstName = null;
        }
      
        if(result.lastName){
          
            formObject.lastName = result.lastName;
          
        }else{
          formObject.lastName = null;
        }
      
        if(result.universityComponent){
          
            formObject.universityComponent = result.universityComponent;
          
        }else{
          formObject.universityComponent = null;
        }
      
        if(result.authorized){
          
            formObject.authorized = result.authorized;
          
        }else{
          formObject.authorized = null;
        }
      

      this.myForm.setValue(formObject);

    })
    .catch((error) => {
        if(error == 'Server error'){
            this.errorMessage = "Could not connect to REST server. Please check your configuration details";
        }
        else if(error == '404 - Not Found'){
				this.errorMessage = "404 - Could not find API route. Please check your available APIs."
        }
        else{
            this.errorMessage = error;
        }
    });

  }

  resetForm(): void{
    this.myForm.setValue({
      
        
          "title":null,
        
      
        
          "fieldOfJob":null,
        
      
        
          "jmbag":null,
        
      
        
          "firstName":null,
        
      
        
          "lastName":null,
        
      
        
          "universityComponent":null,
        
      
        
          "authorized":null 
        
      
      });
  }

}
