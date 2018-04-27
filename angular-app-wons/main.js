'use strict';
const BusinessNetworkConnection = require('composer-client').BusinessNetworkConnection;
	async function beginer() 
	{ 
		try {
			
			this.bizNetworkConnection = new BusinessNetworkConnection();
			const cardName = "admin@pii-szg-network";
			this.businessNetworkDefinition = await this.bizNetworkConnection.connect(cardName);
			
			this.memberRegistry = await this.bizNetworkConnection.getParticipantRegistry('org.szg.Member');
			this.assetRegistry = await this.bizNetworkConnection.getAssetRegistry('org.szg.UniversityComponent');
			let factory = this.businessNetworkDefinition.getFactory();
			
			var assetFER = factory.newResource('org.szg', 'UniversityComponent', 'universityKey:0036');
			assetFER.opening = 500;
			assetFER.closing = 2300;
			assetFER.universityName = "FER";
			// Create a new relationship for the owner
			let FERRelation = factory.newRelationship('org.szg', 'UniversityComponent', 'universityKey:0036');
			
			var assetFSB = factory.newResource('org.szg', 'UniversityComponent', 'universityKey:0035');
			assetFSB.opening = 700;
			assetFSB.closing = 2100;
			assetFSB.universityName = "FSB";
			let FSBRelation = factory.newRelationship('org.szg', 'UniversityComponent', 'universityKey:0035');

			var assetFFZG = factory.newResource('org.szg', 'UniversityComponent', 'universityKey:0035');
			assetFFZGopening = 800;
			assetFFZG.closing = 2000;
			assetFFZG.universityName = "FFZG";
			let FFZGRelation = factory.newRelationship('org.szg', 'UniversityComponent', 'universityKey:1111');
			
			await this.assetRegistry.addAll([assetFER, assetFSB, FFZG]);
			
			var somebody = factory.newResource('org.szg', 'Member', 'jmbag:0036444444');
			somebody.firstName = 'marko';
			somebody.lastName = 'markic';
			somebody.memberType = 'Student';
			somebody.universityComponent = FERRelation;
			await memberRegistry.add(somebody);

			var somebody2 = factory.newResource('org.szg', 'Member', 'jmbag:0036555555');
			somebody2.firstName = 'ana';
			somebody2.lastName = 'anic';
			somebody2.memberType = 'Profesor';
			somebody2.universityComponent = FERRelation;
			await memberRegistry.add(somebody2);

			var somebody3 = factory.newResource('org.szg', 'Member', 'jmbag:1111223322');
			somebody3.firstName = 'filozof';
			somebody3.lastName = 'filozofic';
			somebody3.memberType = 'Student';
			somebody3.universityComponent = FFZGRelation;
			await memberRegistry.add(somebody3);

			this.memberRegistry2 = await this.bizNetworkConnection.getParticipantRegistry('org.szg.SystemAdministrator');
			var somebody4 = factory.newResource('org.szg', "SystemAdministrator");
			var somebody4 = factory.newResource('org.szg', "SystemAdministrator", 'jmbag:1111000000');
			somebody4.firstName = 'sistemski';
			somebody4.lastName = 'adminic';
			somebody4.memberType = 'Staff';
			somebody4.universityComponent = FFZGRelation;
			somebody4.jobPosition = "sistemAdmin";
			await memberRegistry2.add(somebody4);
		}
		catch(error) {
			console.log(error);
			throw error;
		}
	}	
	
	async function checkTransaction(){

		this.bizNetworkConnection = new BusinessNetworkConnection();
		const cardName = "admin@pii-szg-network";
		this.businessNetworkDefinition = await this.bizNetworkConnection.connect(cardName);
		
		var jmbag = document.getElementById('jmbag').value;
		var universityKey = document.getElementById('universityKey').value;

		try {
			let registryMember = await this.bizNetworkConnection.getParticipantRegistry('org.szg.Member');
			let resultMember = registryMember.get('jmbag:'+jmbag);
			let registryUniversityComponent = await this.bizNetworkConnection.getAssetRegistry('org.szg.UniversityComponent');
			let resultUniversityComponent = registryUniversityComponent.get('universityKey:'+universityKey);
		
			let methodCall;
			let access = false;
			var d = new Date();
			let ttime = d.getHours()*100+d.getMinutes();
			
			//logic for Access entry 
			var me = await query('selectMember',{jmbagParam : resultMember.jmbag});
			if(!me) {
        		throw new Error('Non existant user.');
			}
			if(me.universityComponent.universityKey == universityKey){
				let isOpened = await query('selectIsOpened',{universityKeyparam : resultUniversityComponent.universityKey,timeparam : ttime});
				if(!isOpened) {
					access = false;
				}
				else access = true;
				
				if(resultMember.memberType == "Profesor" || resultMember.memberType == "Staff")
					access = true;
			}
			else if(resultMember.memberType == "Profesor" || resultMember.memberType == "Student"){
				let isOpened = await query('selectIsOpened',{universityKeyparam : resultUniversityComponent.universityKey,timeparam : ttime});
				if(!isOpened) {
					access = false;
				}
				else access = true;
			}
			else if(resultUniversityComponent.universityName == "FER"){
				let isOpened = await query('selectIsFEROpened',{timeparam : ttime});
				if(!isOpened) {
					access = false;
				}
				else access = true;
			}

			if(access == true)
				methodCall = "AuthorizeAccess"+resultUniversityComponent.universityName;
			else 
				methodCall = "RevokeAccess"+resultUniversityComponent.universityName;	
			await callTrasaction(methodCall,resultMember.jmbag,resultUniversityComponent.universityKey);
		} catch (error) {
			console.log(error);
			throw error;	
		}

	}
	
	async function callTrasaction(_method, _jmbag, _universityKey){
		try {

			this.bizNetworkConnection = new BusinessNetworkConnection();
			const cardName = "admin@pii-szg-network";
			this.businessNetworkDefinition = await this.bizNetworkConnection.connect(cardName);
			let factory = this.businessNetworkDefinition.getFactory();
			
			//let registry = await this.bizNetworkConnection.getParticipantRegistry('org.szg.Member');
			//let result = registry.get('jmbag:'+_jmbag);
			let transaction    = factory.newTransaction('org.szg',_method);
			transaction.universityComponent  = factory.newRelationship('org.szg', 'UniversityComponent', 'universityKey:'+_universityKey);
			transaction.member = factory.newRelationship('org.szg', 'Member', 'jmbag:'+_jmbag);
			
			await this.bizNetworkConnection.submitTransaction(transaction);
		} catch (error) {
			console.log(error);
			throw error;
		}
	}
