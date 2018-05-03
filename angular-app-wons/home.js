var conn = "http://localhost:3000/";
var api = "api/";
var prefixApp = "org.szg";

var querySelectMember = api+"queries/selectMember?jmbagParam=";
var querySelectUniversityComponent = api+"queries/selectUniversityComponentByKey?universityKeyparam=";
var queryisOpened = api+"queries/selectIsOpened?universityKeyparam=";
var queryisFEROpened = api+"queries/selectIsFEROpened?timeparam=";
var timeparam = "&timeparam="

var relationshipMember = "resource:"+prefixApp+".Member#";
var relationshipUniversityComponent = "resource:"+prefixApp+".UniversityComponent#";
var postUniversityComponent = api+"UniversityComponent";
var postMember = api+"Member";
var postSystemAdministrator = api+"SystemAdministrator";

/*{
  "$class": "org.szg.Member",
  "jmbag": "0066557466",
  "firstName": "lo",
  "lastName": "ji",
  "universityComponent": "resource:org.szg.UniversityComponent#0011",
  "memberType": "Student"
}*/

/*
{
	"$class": "org.szg.AuthorizeAccessFER",
	"member": "resource:org.szg.Member#7759",
	"universityComponent": "resource:org.szg.UniversityComponent#1688"
}*/

/*var obj = new Object();
obj.name = "Raj";
obj.age = 32;
obj.married = false;

//convert object to json string
var string = JSON.stringify(obj);

//convert string to Json Object
console.log(JSON.parse(string)); // this is your requirement.
*/
async function fetchAsync (url) {
	let response = await fetch(url);
	let data = await response.json();
	return data;
  }
async function postAsync (url,formData) {
	let response = await fetch(url, {
	method: "POST",
	body: formData,
	headers: {
	  "Content-Type": "application/json",
	  "Accept": "application/json"
	}
    });
    let data = await response.json();
	return data;
}

	async function beginer() 
	{ 
		try {
			
			/*this.bizNetworkConnection = new BusinessNetworkConnection();
			const cardName = "admin@pii-szg-network";
			this.businessNetworkDefinition = await this.bizNetworkConnection.connect(cardName);
			
			this.memberRegistry = await this.bizNetworkConnection.getParticipantRegistry('org.szg.Member');
			this.assetRegistry = await this.bizNetworkConnection.getAssetRegistry('org.szg.UniversityComponent');
			let factory = this.businessNetworkDefinition.getFactory();*/
			
			let stringPost;
			let resultPostArray;
			var assetFER = new Object();
			assetFER.$class = 'org.szg.UniversityComponent';
			assetFER.universityKey = "0036";
			assetFER.universityName = "FER";
			assetFER.opening = 500;
			assetFER.closing = 2300;

			//convert object to json string
			stringPost = JSON.stringify(assetFER);
			resultPostArray = await postAsync(conn+postUniversityComponent,stringPost);
			/*var assetFER = factory.newResource('org.szg', 'UniversityComponent', 'universityKey:0036');
			assetFER.opening = 500;
			assetFER.closing = 2300;
			assetFER.universityName = "FER";
			// Create a new relationship for the owner
			let FERRelation = factory.newRelationship('org.szg', 'UniversityComponent', 'universityKey:0036');*/
			var assetFSB = new Object();
			assetFSB.$class = 'org.szg.UniversityComponent';
			assetFSB.universityKey = "0035";
			assetFSB.universityName = "FSB";
			assetFSB.opening = 700;
			assetFSB.closing = 2100;

			//convert object to json string
			stringPost = JSON.stringify(assetFSB);
			resultPostArray = await postAsync(conn+postUniversityComponent,stringPost);
			/*var assetFSB = factory.newResource('org.szg', 'UniversityComponent', 'universityKey:0035');
			assetFSB.opening = 700;
			assetFSB.closing = 2100;
			assetFSB.universityName = "FSB";
			let FSBRelation = factory.newRelationship('org.szg', 'UniversityComponent', 'universityKey:0035');*/
			var assetFFZG = new Object();
			assetFFZG.$class = 'org.szg.UniversityComponent';
			assetFFZG.universityKey = "1111";
			assetFFZG.universityName = "FFZG";
			assetFFZG.opening = 800;
			assetFFZG.closing = 2000;

			//convert object to json string
			stringPost = JSON.stringify(assetFFZG);
			resultPostArray = await postAsync(conn+postUniversityComponent,stringPost);
			/*var assetFFZG = factory.newResource('org.szg', 'UniversityComponent', 'universityKey:1111');
			assetFFZGopening = 800;
			assetFFZG.closing = 2000;
			assetFFZG.universityName = "FFZG";
			let FFZGRelation = factory.newRelationship('org.szg', 'UniversityComponent', 'universityKey:1111');*/
			
			//await this.assetRegistry.addAll([assetFER, assetFSB, FFZG]);

			var somebody = new Object();
			somebody.$class = 'org.szg.Member';
			somebody.jmbag = "0036444444";
			somebody.firstName = 'marko';
			somebody.lastName = 'markic';
			somebody.memberType = 'Student';
			somebody.universityComponent = relationshipUniversityComponent+assetFER.universityKey;
			stringPost = JSON.stringify(somebody);
			resultPostArray = await postAsync(conn+postMember,stringPost);
			
			/*var somebody = factory.newResource('org.szg', 'Member', 'jmbag:0036444444');
			somebody.firstName = 'marko';
			somebody.lastName = 'markic';
			somebody.memberType = 'Student';
			somebody.universityComponent = FERRelation;
			await memberRegistry.add(somebody);*/

			var somebody2 = new Object();
			somebody2.$class = 'org.szg.Member';
			somebody2.jmbag = "0036555555";
			somebody2.firstName = 'ana';
			somebody2.lastName = 'anic';
			somebody2.memberType = 'Profesor';
			somebody2.universityComponent = relationshipUniversityComponent+assetFER.universityKey;
			stringPost = JSON.stringify(somebody2);
			resultPostArray = await postAsync(conn+postMember,stringPost);

			/*var somebody2 = factory.newResource('org.szg', 'Member', 'jmbag:0036555555');
			somebody2.firstName = 'ana';
			somebody2.lastName = 'anic';
			somebody2.memberType = 'Profesor';
			somebody2.universityComponent = FERRelation;
			await memberRegistry.add(somebody2);*/

			var somebody3 = new Object();
			somebody3.$class = 'org.szg.Member';
			somebody3.jmbag = "1111223322";
			somebody3.firstName = 'filozof';
			somebody3.lastName = 'filozofic';
			somebody3.memberType = 'Student';
			somebody3.universityComponent = relationshipUniversityComponent+assetFFZG.universityKey;
			stringPost = JSON.stringify(somebody3);
			resultPostArray = await postAsync(conn+postMember,stringPost);

			/*var somebody3 = factory.newResource('org.szg', 'Member', 'jmbag:1111223322');
			somebody3.firstName = 'filozof';
			somebody3.lastName = 'filozofic';
			somebody3.memberType = 'Student';
			somebody3.universityComponent = FFZGRelation;
			await memberRegistry.add(somebody3);*/

			var somebody4 = new Object();
			somebody4.$class = 'org.szg.SystemAdministrator';
			somebody4.jmbag = "1111000000";
			somebody4.firstName = 'sistemski';
			somebody4.lastName = 'adminic';
			somebody4.memberType = 'Staff';
			somebody4.universityComponent = relationshipUniversityComponent+assetFFZG.universityKey;
			somebody4.jobPosition = "sistemAdmin";
			stringPost = JSON.stringify(somebody4);
			resultPostArray = await postAsync(conn+postSystemAdministrator,stringPost);

			/*this.memberRegistry2 = await this.bizNetworkConnection.getParticipantRegistry('org.szg.SystemAdministrator');
			var somebody4 = factory.newResource('org.szg', "SystemAdministrator");
			var somebody4 = factory.newResource('org.szg', "SystemAdministrator", 'jmbag:1111000000');
			somebody4.firstName = 'sistemski';
			somebody4.lastName = 'adminic';
			somebody4.memberType = 'Staff';
			somebody4.universityComponent = FFZGRelation;
			somebody4.jobPosition = "sistemAdmin";
			await memberRegistry2.add(somebody4);*/
		}
		catch(error) {
			console.log(error);
			throw error;
		}
	}	
	
	async function checkTransaction(){

		/*this.bizNetworkConnection = new BusinessNetworkConnection();
		const cardName = "admin@pii-szg-network";
		this.businessNetworkDefinition = await this.bizNetworkConnection.connect(cardName);*/
		
		var jmbag = document.getElementById('jmbag').value;
		var universityKey = document.getElementById('universityKey').value;
		
		try {
			//let registryMember = await this.bizNetworkConnection.getParticipantRegistry('org.szg.Member');
			//let resultMember = registryMember.get('jmbag:'+jmbag);
			let resultMemberArray = await fetchAsync(conn+querySelectMember+jmbag);
			let resultMember = resultMemberArray[0];
			//let registryUniversityComponent = await this.bizNetworkConnection.getAssetRegistry('org.szg.UniversityComponent');
			//let resultUniversityComponent = registryUniversityComponent.get('universityKey:'+universityKey);
			let resultUniversityComponentArray  = await fetchAsync(conn+querySelectUniversityComponent+universityKey);
			let resultUniversityComponent = resultUniversityComponentArray[0];

			let methodCall;
			let access = false;
			var d = new Date();
			let ttime = d.getHours()*100+d.getMinutes();
			
			//logic for Access entry 
			/*var me = await query('selectMember',{jmbagParam : resultMember.jmbag});
			if(!me) {
        		throw new Error('Non existant user.');
			}*/
			var strKey = resultMember.universityComponent;
			var numUniversityComponentKey = strKey.replace(/[^0-9]/g, ''); 
			if(numUniversityComponentKey == universityKey){
				let resultisOpenedArray = await fetchAsync(conn+queryisOpened+universityKey+timeparam+ttime);
				let resultisOpened = resultisOpenedArray[0];
				//let queryisOpened = await query('selectIsOpened',{universityKeyparam : resultUniversityComponent.universityKey,timeparam : ttime});
				if(!resultisOpened.universityKey) {
					access = false;
				}
				else access = true;
				
				if(resultMember.memberType == "Profesor" || resultMember.memberType == "Staff")
					access = true;
			}
			else if(resultMember.memberType == "Profesor" || resultMember.memberType == "Student"){
				//let isOpened = await query('selectIsOpened',{universityKeyparam : resultUniversityComponent.universityKey,timeparam : ttime});
				let resultisOpenedArray = await fetchAsync(conn+queryisOpened+universityKey+timeparam+ttime);
				let resultisOpened = resultisOpenedArray[0];
				if(!resultisOpened.universityKey) {
					access = false;
				}
				else access = true;
			}
			else if(resultUniversityComponent.universityName == "FER"){
				let resultisOpenedArray = await fetchAsync(conn+queryisFEROpened+ttime);
				let resultisOpened = resultisOpenedArray[0];
				if(!resultisOpened.universityKey) {
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
			//throw error;	
		}

	}
	
	async function callTrasaction(_method, _jmbag, _universityKey){
		try {

			/*this.bizNetworkConnection = new BusinessNetworkConnection();
			const cardName = "admin@pii-szg-network";
			this.businessNetworkDefinition = await this.bizNetworkConnection.connect(cardName);
			let factory = this.businessNetworkDefinition.getFactory();
			
			//let registry = await this.bizNetworkConnection.getParticipantRegistry('org.szg.Member');
			//let result = registry.get('jmbag:'+_jmbag);
			let transaction    = factory.newTransaction('org.szg',_method);
			transaction.universityComponent  = factory.newRelationship('org.szg', 'UniversityComponent', 'universityKey:'+_universityKey);
			transaction.member = factory.newRelationship('org.szg', 'Member', 'jmbag:'+_jmbag);
			
			await this.bizNetworkConnection.submitTransaction(transaction);*/

			var trans = new Object();
			trans.$class = prefixApp+"."+_method;
			trans.member = relationshipMember+_jmbag;
			trans.universityComponent = relationshipUniversityComponent+_universityKey;
			var stringTrans = JSON.stringify(trans);
			resultPostArray = await postAsync(conn+api+_method,stringTrans);
			console.log(resultPostArray);
		} catch (error) {
			console.log(error);
			throw error;
		}
	}
