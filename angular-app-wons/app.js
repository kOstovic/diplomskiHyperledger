#!/usr/bin/env node

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

const cfenv = require('cfenv');
const express = require('express');
const fs = require('fs');
const http = require('http');
const path = require('path');
const proxy = require('http-proxy-middleware');
const proxyConfig = require('./proxy.conf.js');
const BusinessNetworkConnection2 = require('composer-client').BusinessNetworkConnection;
const WinstonInjector = require('winston');

const app = express();
const appEnv = cfenv.getAppEnv();
const server = http.createServer(app);

const dist = path.join(__dirname, 'dist');
if (!fs.existsSync(dist)) {
    console.error('no dist directory - try running "npm run build" first');
    process.exit(1);
}
const static = express.static(dist);

app.use(static);

proxyConfig.forEach((element) => {
    const context = element.context;
    delete element.context;
    const proxyMiddleware = proxy(context, element);
    app.use(function (req, res, next) {
        const bypass = typeof element.bypass === 'function';
        const bypassUrl = bypass && element.bypass(req, res, element) || false;
        if (bypassUrl) {
            req.url = bypassUrl;
            return static(req, res, next);
        } else {
            return proxyMiddleware(req, res, next);
        }
    });
});

server.listen(appEnv.port, function () {
    console.log('server starting on ' + appEnv.url);
});

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
