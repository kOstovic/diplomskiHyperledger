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
import { UniversityComponentService } from './UniversityComponent.service';
import 'rxjs/add/operator/toPromise';
@Component({
	selector: 'app-UniversityComponent',
	templateUrl: './UniversityComponent.component.html',
	styleUrls: ['./UniversityComponent.component.css'],
  providers: [UniversityComponentService]
})
export class UniversityComponentComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
	private errorMessage;

  
      
          universityKey = new FormControl("", Validators.required);
        
  
      
          universityName = new FormControl("", Validators.required);
        
  
      
          ComponentName = new FormControl("", Validators.required);
        
  
      
          opening = new FormControl("", Validators.required);
        
  
      
          closing = new FormControl("", Validators.required);
        
  
      
          transactionAuthorized = new FormControl("", Validators.required);
        
  
      
          transactionRevoke = new FormControl("", Validators.required);
        
  


  constructor(private serviceUniversityComponent:UniversityComponentService, fb: FormBuilder) {
    this.myForm = fb.group({
    
        
          universityKey:this.universityKey,
        
    
        
          universityName:this.universityName,
        
    
        
          ComponentName:this.ComponentName,
        
    
        
          opening:this.opening,
        
    
        
          closing:this.closing,
        
    
        
          transactionAuthorized:this.transactionAuthorized,
        
    
        
          transactionRevoke:this.transactionRevoke
        
    
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    let tempList = [];
    return this.serviceUniversityComponent.getAll()
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      result.forEach(asset => {
        tempList.push(asset);
      });
      this.allAssets = tempList;
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
   * @param {String} name - the name of the asset field to update
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
   * only). This is used for checkboxes in the asset updateDialog.
   * @param {String} name - the name of the asset field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified asset field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addAsset(form: any): Promise<any> {
    this.asset = {
      $class: "org.szg.UniversityComponent",
      
        
          "universityKey":this.universityKey.value,
        
      
        
          "universityName":this.universityName.value,
        
      
        
          "ComponentName":this.ComponentName.value,
        
      
        
          "opening":this.opening.value,
        
      
        
          "closing":this.closing.value,
        
      
        
          "transactionAuthorized":this.transactionAuthorized.value,
        
      
        
          "transactionRevoke":this.transactionRevoke.value
        
      
    };

    this.myForm.setValue({
      
        
          "universityKey":null,
        
      
        
          "universityName":null,
        
      
        
          "ComponentName":null,
        
      
        
          "opening":null,
        
      
        
          "closing":null,
        
      
        
          "transactionAuthorized":null,
        
      
        
          "transactionRevoke":null
        
      
    });

    return this.serviceUniversityComponent.addAsset(this.asset)
    .toPromise()
    .then(() => {
			this.errorMessage = null;
      this.myForm.setValue({
      
        
          "universityKey":null,
        
      
        
          "universityName":null,
        
      
        
          "ComponentName":null,
        
      
        
          "opening":null,
        
      
        
          "closing":null,
        
      
        
          "transactionAuthorized":null,
        
      
        
          "transactionRevoke":null 
        
      
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


   updateAsset(form: any): Promise<any> {
    this.asset = {
      $class: "org.szg.UniversityComponent",
      
        
          
        
    
        
          
            "universityName":this.universityName.value,
          
        
    
        
          
            "ComponentName":this.ComponentName.value,
          
        
    
        
          
            "opening":this.opening.value,
          
        
    
        
          
            "closing":this.closing.value,
          
        
    
        
          
            "transactionAuthorized":this.transactionAuthorized.value,
          
        
    
        
          
            "transactionRevoke":this.transactionRevoke.value
          
        
    
    };

    return this.serviceUniversityComponent.updateAsset(form.get("universityKey").value,this.asset)
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


  deleteAsset(): Promise<any> {

    return this.serviceUniversityComponent.deleteAsset(this.currentId)
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

    return this.serviceUniversityComponent.getAsset(id)
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      let formObject = {
        
          
            "universityKey":null,
          
        
          
            "universityName":null,
          
        
          
            "ComponentName":null,
          
        
          
            "opening":null,
          
        
          
            "closing":null,
          
        
          
            "transactionAuthorized":null,
          
        
          
            "transactionRevoke":null 
          
        
      };



      
        if(result.universityKey){
          
            formObject.universityKey = result.universityKey;
          
        }else{
          formObject.universityKey = null;
        }
      
        if(result.universityName){
          
            formObject.universityName = result.universityName;
          
        }else{
          formObject.universityName = null;
        }
      
        if(result.ComponentName){
          
            formObject.ComponentName = result.ComponentName;
          
        }else{
          formObject.ComponentName = null;
        }
      
        if(result.opening){
          
            formObject.opening = result.opening;
          
        }else{
          formObject.opening = null;
        }
      
        if(result.closing){
          
            formObject.closing = result.closing;
          
        }else{
          formObject.closing = null;
        }
      
        if(result.transactionAuthorized){
          
            formObject.transactionAuthorized = result.transactionAuthorized;
          
        }else{
          formObject.transactionAuthorized = null;
        }
      
        if(result.transactionRevoke){
          
            formObject.transactionRevoke = result.transactionRevoke;
          
        }else{
          formObject.transactionRevoke = null;
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
      
        
          "universityKey":null,
        
      
        
          "universityName":null,
        
      
        
          "ComponentName":null,
        
      
        
          "opening":null,
        
      
        
          "closing":null,
        
      
        
          "transactionAuthorized":null,
        
      
        
          "transactionRevoke":null 
        
      
      });
  }

}
