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

'use strict';
const hour = 3600;
const minute = 60;
/**
* Granting access to FER to a Member.
* @param {org.szg.CheckAccessFER} authorize - the grant to be processed
* @transaction
*/

async function CheckAccessFER(authorize) {  // eslint-disable-line no-unused-vars
    console.log('**** AUTH: ' + authorize.toString());
    var control = false;
    
    if(authorize.tid == authorize.member.tid){
        
        //logic that check can person enter
        if(authorize.member.universityComponent.universityName == "FER"){
            if(authorize.member.memberType == "Profesor" || authorize.member.memberType == "Staff")
            control = true;
            else{
                let d = new Date();
                let ttime = d.getHours()*hour+d.getMinutes()*minute;
                
                let queryisOpened = await query('selectIsFEROpened',{timeparam : ttime});
                if(queryisOpened[0].universityName == "FER") {
                    control = true;
                }
            }
        }
        else{
            let d = new Date();
            let ttime = d.getHours()*hour+d.getMinutes()*minute;
            
            let queryisOpened = await query('selectIsFEROpened',{timeparam : ttime});
            if(!queryisOpened[0].universityKey) {
                control = false;
            }
            else
            control = true;
        }
    }
    //push string about this transaction into a field for both University and member, depends about control variable
    if(control == true){
        let index = -1;
        if(!authorize.member.transactionAuthorized) {
            authorize.member.transactionAuthorized = [];
            authorize.member.transactionAuthorized.push(authorize.universityComponent.universityKey+" FER"+" "+ Date().toLocaleString());
        }
        else {
            authorize.member.transactionAuthorized.push(authorize.universityComponent.universityKey+" FER"+" "+ Date().toLocaleString());
        }
        
        if(!authorize.universityComponent.transactionAuthorized) {
            authorize.universityComponent.transactionAuthorized= [];
            authorize.universityComponent.transactionAuthorized.push(authorize.member.jmbag+" "+ Date().toLocaleString());
        }
        else {
            authorize.universityComponent.transactionAuthorized.push(authorize.member.jmbag+" "+ Date().toLocaleString());
        }
    }
    else if(control == false){
        if(!authorize.member.transactionRevoke) {
            authorize.member.transactionRevoke = [];
            authorize.member.transactionRevoke.push(authorize.universityComponent.universityKey+" FER"+" "+ Date().toLocaleString());
        }
        else {
            authorize.member.transactionRevoke.push(authorize.universityComponent.universityKey+" FER"+" "+ Date().toLocaleString());
        }
        
        if(!authorize.universityComponent.transactionRevoke) {
            authorize.universityComponent.transactionRevoke= [];
            authorize.universityComponent.transactionRevoke.push(authorize.member.jmbag+" "+ Date().toLocaleString());
        }
        else {
            authorize.universityComponent.transactionRevoke.push(authorize.member.jmbag+" "+ Date().toLocaleString());
        }
    }
    
    //update member and university through pointers
    //authorize.access = control;
    const memberRegistry = await getParticipantRegistry('org.szg.Member');
    await memberRegistry.update(authorize.member);
    const assetRegistry = await getAssetRegistry('org.szg.UniversityComponent');
    await assetRegistry.update(authorize.universityComponent);
    // emit an event
    const event = getFactory().newEvent('org.szg', 'MemberEvent');
    event.memberAccessBool = control;
    event.memberAccess = authorize;
    emit(event);
    
}

/**
* Granting access to FSB to a Member.
* @param {org.szg.CheckAccessFSB} authorize - the grant to be processed
* @transaction
*/

async function CheckAccessFSB(authorize) {  // eslint-disable-line no-unused-vars
    console.log('**** AUTH: ' + authorize.toString());
    var control = false;
    if(authorize.tid == authorize.member.tid){
        if(authorize.member.universityComponent.universityName == "FSB"){
            if(authorize.member.memberType == "Profesor" || authorize.member.memberType == "Staff")
            control = true;
        }
        else if(authorize.member.memberType == "Student" || authorize.member.memberType == "Profesor"){
            let d = new Date();
            let ttime = d.getHours()*hour+d.getMinutes()*minute;
            
            let queryisOpened = await query('selectIsFSBOpened',{timeparam : ttime});
            if(!queryisOpened[0].universityKey) {
                control = false;
            }
            else
            control = true;
        }
    }

    if(control == true){
        let index = -1;
        if(!authorize.member.transactionAuthorized) {
            authorize.member.transactionAuthorized = [];
            authorize.member.transactionAuthorized.push(authorize.universityComponent.universityKey+" FSB"+" "+ Date().toLocaleString());
        }
        else if(authorize.member.memberType == "Student"){
            authorize.member.transactionAuthorized.push(authorize.universityComponent.universityKey+" FSB"+" "+ Date().toLocaleString());
        }
        
        if(!authorize.universityComponent.transactionAuthorized) {
            authorize.universityComponent.transactionAuthorized= [];
            authorize.universityComponent.transactionAuthorized.push(authorize.member.jmbag+" "+ Date().toLocaleString());
        }
        else {
            authorize.universityComponent.transactionAuthorized.push(authorize.member.jmbag+" "+ Date().toLocaleString());
        }
    }
    else if(control == false){
        if(!authorize.member.transactionRevoke) {
            authorize.member.transactionRevoke = [];
            authorize.member.transactionRevoke.push(authorize.universityComponent.universityKey+" FSB"+" "+ Date().toLocaleString());
        }
        else {
            authorize.member.transactionRevoke.push(authorize.universityComponent.universityKey+" FSB"+" "+ Date().toLocaleString());
        }
        
        if(!authorize.universityComponent.transactionRevoke) {
            authorize.universityComponent.transactionRevoke= [];
            authorize.universityComponent.transactionRevoke.push(authorize.member.jmbag+" "+ Date().toLocaleString());
        }
        else {
            authorize.universityComponent.transactionRevoke.push(authorize.member.jmbag+" "+ Date().toLocaleString());
        }
    }
	//authorize.access = control;
    const memberRegistry = await getParticipantRegistry('org.szg.Member');
    await memberRegistry.update(authorize.member);
    const assetRegistry = await getAssetRegistry('org.szg.UniversityComponent');
    await assetRegistry.update(authorize.universityComponent);
    // emit an event
    const event = getFactory().newEvent('org.szg', 'MemberEvent');
    event.memberAccessBool = control;
    event.memberAccess = authorize;
    emit(event);
}

/**
* Granting access to FFZG to a Member.
* @param {org.szg.CheckAccessFFZG} authorize - the grant to be processed
* @transaction
*/

async function CheckAccessFFZG(authorize) {  // eslint-disable-line no-unused-vars
    console.log('**** AUTH: ' + authorize.toString());
    var control = false;
    if(authorize.tid == authorize.member.tid){
        if(authorize.member.universityComponent.universityName == "FFZG"){
            if(authorize.member.memberType == "Profesor" || authorize.member.memberType == "Staff")
            control = true;
        }
        else if(authorize.member.memberType == "Student" || authorize.member.memberType == "Profesor"){
            let d = new Date();
            let ttime = d.getHours()*hour+d.getMinutes()*minute;
            
            let queryisOpened = await query('selectIsFFZGOpened',{timeparam : ttime});
            if(!queryisOpened[0].universityKey) {
                control = false;
            }
            else
            control = true;
        }
    }
    
    if(control == true){
        let index = -1;
        if(!authorize.member.transactionAuthorized) {
            authorize.member.transactionAuthorized = [];
            authorize.member.transactionAuthorized.push(authorize.universityComponent.universityKey+" FFZG"+" "+ Date().toLocaleString());
        }
        else {
            authorize.member.transactionAuthorized.push(authorize.universityComponent.universityKey+" FFZG"+" "+ Date().toLocaleString());
        }
        
        if(!authorize.universityComponent.transactionAuthorized) {
            authorize.universityComponent.transactionAuthorized= [];
            authorize.universityComponent.transactionAuthorized.push(authorize.member.jmbag+" "+ Date().toLocaleString());
        }
        else {
            authorize.universityComponent.transactionAuthorized.push(authorize.member.jmbag+" "+ Date().toLocaleString());
        }
    }
    else if(control == false){
        if(!authorize.member.transactionRevoke) {
            authorize.member.transactionRevoke = [];
            authorize.member.transactionRevoke.push(authorize.universityComponent.universityKey+" FFZG"+" "+ Date().toLocaleString());
        }
        else {
            authorize.member.transactionRevoke.push(authorize.universityComponent.universityKey+" FFZG"+" "+ Date().toLocaleString());
        }
        
        if(!authorize.universityComponent.transactionRevoke) {
            authorize.universityComponent.transactionRevoke= [];
            authorize.universityComponent.transactionRevoke.push(authorize.member.jmbag+" "+ Date().toLocaleString());
        }
        else {
            authorize.universityComponent.transactionRevoke.push(authorize.member.jmbag+" "+ Date().toLocaleString());
        }
    }
    
	//authorize.access = control;
    const memberRegistry = await getParticipantRegistry('org.szg.Member');
    await memberRegistry.update(authorize.member);
    const assetRegistry = await getAssetRegistry('org.szg.UniversityComponent');
    await assetRegistry.update(authorize.universityComponent);
    // emit an event
    const event = getFactory().newEvent('org.szg', 'MemberEvent');
    event.memberAccessBool = control;
    event.memberAccess = authorize;
    emit(event);
}
