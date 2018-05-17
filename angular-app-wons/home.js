//config var for path in REST API
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
const hour = 3600;
const minute = 60;

//async functions for GET and POST methods
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

//function for first time run creating users and assest
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
			assetFER.opening = 5*hour;
			assetFER.closing = 23*hour;

			//convert object to json string and send it to server
			stringPost = JSON.stringify(assetFER);
			resultPostArray = await postAsync(conn+postUniversityComponent,stringPost);
			/*var assetFER = factory.newResource('org.szg', 'UniversityComponent', 'universityKey:0036');
			assetFER.opening = 5*hour;
			assetFER.closing = 23*hour;
			assetFER.universityName = "FER";
			// Create a new relationship for the owner
			let FERRelation = factory.newRelationship('org.szg', 'UniversityComponent', 'universityKey:0036');*/
			var assetFSB = new Object();
			assetFSB.$class = 'org.szg.UniversityComponent';
			assetFSB.universityKey = "0035";
			assetFSB.universityName = "FSB";
			assetFSB.opening = 7*hour;
			assetFSB.closing = 21*hour;

			//convert object to json string 
			stringPost = JSON.stringify(assetFSB);
			resultPostArray = await postAsync(conn+postUniversityComponent,stringPost);
			/*var assetFSB = factory.newResource('org.szg', 'UniversityComponent', 'universityKey:0035');
			assetFSB.opening = 7*hour;
			assetFSB.closing = 21*hour;
			assetFSB.universityName = "FSB";
			let FSBRelation = factory.newRelationship('org.szg', 'UniversityComponent', 'universityKey:0035');*/
			var assetFFZG = new Object();
			assetFFZG.$class = 'org.szg.UniversityComponent';
			assetFFZG.universityKey = "1111";
			assetFFZG.universityName = "FFZG";
			assetFFZG.opening = 8*hour;
			assetFFZG.closing = 20*hour;

			//convert object to json string
			stringPost = JSON.stringify(assetFFZG);
			resultPostArray = await postAsync(conn+postUniversityComponent,stringPost);
			/*var assetFFZG = factory.newResource('org.szg', 'UniversityComponent', 'universityKey:1111');
			assetFFZG.opening = 8*hour;
			assetFFZG.closing = 20*hour;
			assetFFZG.universityName = "FFZG";
			let FFZGRelation = factory.newRelationship('org.szg', 'UniversityComponent', 'universityKey:1111');*/
			
			//await this.assetRegistry.addAll([assetFER, assetFSB, FFZG]);

			var somebody = new Object();
			somebody.$class = 'org.szg.Member';
			somebody.jmbag = "0036444444";
			somebody.firstName = 'marko';
			somebody.lastName = 'markic';
			somebody.memberType = 'Student';
			somebody.tid = "E200341201301700026A6B90";
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
			somebody2.tid = "E200341201301700026A6B93";
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
			somebody3.tid = "E200341201301700026A6B92";
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
			somebody4.tid = "E200341201301700026A6B33";
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
	
	//function with logic for accepting or revoking access
	async function checkTransaction(){

		/*this.bizNetworkConnection = new BusinessNetworkConnection();
		const cardName = "admin@pii-szg-network";
		this.businessNetworkDefinition = await this.bizNetworkConnection.connect(cardName);*/
		
		//get input
		var jmbag = document.getElementById('jmbag').value;
		var universityKey = document.getElementById('universityKey').value;
		let tid = document.getElementById('tid').value;
		
		try {
			//let registryMember = await this.bizNetworkConnection.getParticipantRegistry('org.szg.Member');
			//let resultMember = registryMember.get('jmbag:'+jmbag);

			//get member and asset from input
			let resultMemberArray = await fetchAsync(conn+querySelectMember+jmbag);
			let resultMember = resultMemberArray[0];
			//let registryUniversityComponent = await this.bizNetworkConnection.getAssetRegistry('org.szg.UniversityComponent');
			//let resultUniversityComponent = registryUniversityComponent.get('universityKey:'+universityKey);
			let resultUniversityComponentArray  = await fetchAsync(conn+querySelectUniversityComponent+universityKey);
			let resultUniversityComponent = resultUniversityComponentArray[0];
			let access = false;
			let AuthLen, RevokeLen;

			if(!resultMember.transactionAuthorized)
				AuthLen = 0;
			else AuthLen = resultMember.transactionAuthorized.length;
			if(!resultMember.transactionRevoke)
				RevokeLen = 0;
			else RevokeLen = resultMember.transactionRevoke.length;

			let	methodCall = "CheckAccess"+resultUniversityComponent.universityName;	
			await callTrasaction(methodCall,resultMember.jmbag,resultUniversityComponent.universityKey,tid);
			let resultMemberArrayAfter = await fetchAsync(conn+querySelectMember+jmbag);
			let resultMemberAfter = resultMemberArrayAfter[0];
			var status = document.getElementById("status");
			if (resultMemberAfter.transactionAuthorized.length > AuthLen)
    			status.innerHTML = "Granted";
			else	
				status.innerHTML = "Denied";
		} catch (error) {
			console.log(error);
			//throw error;	
		}

	}

	
	//function that is calling transasction from REST API
	async function callTrasaction(_method, _jmbag, _universityKey,_tid){
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
			trans.tid = _tid;
			var stringTrans = JSON.stringify(trans);
			resultPostArray = await postAsync(conn+api+_method,stringTrans);
			console.log(resultPostArray);
		} catch (error) {
			console.log(error);
			throw error;
		}
	}