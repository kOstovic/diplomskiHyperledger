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
/**
 * Write the unit tests for your transction processor functions here
 */

const AdminConnection = require('composer-admin').AdminConnection;
const BusinessNetworkConnection = require('composer-client').BusinessNetworkConnection;
const { BusinessNetworkDefinition, CertificateUtil, IdCard } = require('composer-common');
const path = require('path');

const chai = require('chai');
chai.should();
chai.use(require('chai-as-promised'));

const namespace = 'pii.szg';
const assetType = 'UniversityComponent';
const assetNS = namespace + '.' + assetType;
const participantType = 'Member';
const participantType2 = 'SystemAdministrator';
const participantNS = namespace + '.' + participantType;
const participantNS2 = namespace + '.' + participantType2;
const hour = 3600;
const minutes = 60;

describe('#' + namespace, () => {
    // In-memory card store for testing so cards are not persisted to the file system
    const cardStore = require('composer-common').NetworkCardStoreManager.getCardStore( { type: 'composer-wallet-inmemory' } );

    // Embedded connection used for local testing
    const connectionProfile = {
        name: 'embedded',
        'x-type': 'embedded'
    };

    // Name of the business network card containing the administrative identity for the business network
    const adminCardName = 'admin';

    // Admin connection to the blockchain, used to deploy the business network
    let adminConnection;

    // This is the business network connection the tests will use.
    let businessNetworkConnection;

    // This is the factory for creating instances of types.
    let factory;

    // These are the identities for people
    const ferovacSystemAdmin = '0036000000';
    const fsbovacfSystemAdmin = '0035000000';
    const filozofSystemAdmin = '1111000000';


    // These are a list of receieved events.
    let events;

    let businessNetworkName;

    before(async () => {
        // Generate certificates for use with the embedded connection
        const credentials = CertificateUtil.generate({ commonName: 'admin' });

        // Identity used with the admin connection to deploy business networks
        const deployerMetadata = {
            version: 1,
            userName: 'PeerAdmin',
            roles: [ 'PeerAdmin', 'ChannelAdmin' ]
        };
        const deployerCard = new IdCard(deployerMetadata, connectionProfile);
        deployerCard.setCredentials(credentials);
        const deployerCardName = 'PeerAdmin';

        adminConnection = new AdminConnection({ cardStore: cardStore });

        await adminConnection.importCard(deployerCardName, deployerCard);
        await adminConnection.connect(deployerCardName);
    });

    /**
     *
     * @param {String} cardName The card name to use for this identity
     * @param {Object} identity The identity details
     */
    async function importCardForIdentity(cardName, identity) {
        const metadata = {
            userName: identity.userID,
            version: 1,
            enrollmentSecret: identity.userSecret,
            businessNetwork: businessNetworkName
        };
        const card = new IdCard(metadata, connectionProfile);
        await adminConnection.importCard(cardName, card);
    }

    // This is called before each test is executed.
    beforeEach(async () => {
        // Generate a business network definition from the project directory.
        let businessNetworkDefinition = await BusinessNetworkDefinition.fromDirectory(path.resolve(__dirname, '..'));
        businessNetworkName = businessNetworkDefinition.getName();
        await adminConnection.install(businessNetworkDefinition);
        const startOptions = {
            networkAdmins: [
                {
                    userName: 'admin',
                    enrollmentSecret: 'adminpw'
                }
            ]
        };
        const adminCards = await adminConnection.start(businessNetworkName, businessNetworkDefinition.getVersion(), startOptions);
        await adminConnection.importCard(adminCardName, adminCards.get('admin'));

        // Create and establish a business network connection
        businessNetworkConnection = new BusinessNetworkConnection({ cardStore: cardStore });
        events = [];
        businessNetworkConnection.on('event', event => {
            events.push(event);
        });
        await businessNetworkConnection.connect(adminCardName);

        // Get the factory for the business network.
        factory = businessNetworkConnection.getBusinessNetwork().getFactory();

        const assetRegistry = await businessNetworkConnection.getAssetRegistry(assetNS);

	const assetFER = factory.newResource('org.szg', assetType, 'universityKey:0036');
	assetFER.opening = 5*hour;
	assetFER.closing = 23*hour;
	assetFER.universityName = "FER";
	// Create a new relationship for the owner
	const FERRelation = factory.newRelationship(namespace, assetType, 'universityKey:0036');
			
	const assetFSB = factory.newResource(namespace, assetType, 'universityKey:0035');
	assetFSB.opening = 7*hour;
	assetFSB.closing = 21*hour;
	assetFSB.universityName = "FSB";
	const FSBRelation = factory.newRelationship(namespace, assetType, 'universityKey:0035');

	const assetFFZG = factory.newResource(namespace, assetType, 'universityKey:0035');
	assetFFZGopening = 8*hour;
	assetFFZG.closing = 20*hour;
	assetFFZG.universityName = "FFZG";
	const FFZGRelation = factory.newRelationship(namespace, assetType, 'universityKey:1111');

        assetRegistry.addAll([assetFER, assetFSB, assetFFZG]);

        const participantRegistry = await businessNetworkConnection.getParticipantRegistry(participantNS);

        // Create the participants.
	var somebody = factory.newResource(namespace, participantType, 'jmbag:0036444444');
	somebody.firstName = 'marko';
	somebody.lastName = 'markic';
    somebody.memberType = 'Student';
    somebody.tid = "E200341201301700026A6B90";
	somebody.universityComponent = FERRelation;

	var somebody2 = factory.newResource(namespace, participantType, 'jmbag:0036555555');
	somebody2.firstName = 'ana';
	somebody2.lastName = 'anic';
    somebody2.memberType = 'Profesor';
    somebody2.tid = "E200341201301700026A6B91";
	somebody2.universityComponent = FERRelation;

	var somebody3 = factory.newResource(namespace, participantType, 'jmbag:1111223322');
	somebody3.firstName = 'filozof';
	somebody3.lastName = 'filozofic';
    somebody3.memberType = 'Student';
    somebody3.tid = "E200341201301700026A6B92";
	somebody3.universityComponent = FFZGRelation;

	
	const participantRegistry2 = await businessNetworkConnection.getParticipantRegistry(participantNS2);
	var somebody4 = factory.newResource(namespace, participantType2, 'jmbag:1111000000');
	somebody4.firstName = 'sistemski';
	somebody4.lastName = 'adminic';
	somebody4.memberType = 'Staff';
    somebody4.tid = "E200341201301700026A6B93";
    somebody4.universityComponent = FFZGRelation;
	somebody4.jobPosition = "sistemAdmin";
    await memberRegistry2.add(somebody4);
    

	var somebody5 = factory.newResource(namespace, participantType, 'jmbag:1111220000');
	somebody5.firstName = 'cistacica';
	somebody5.lastName = 'cistac';
    somebody5.memberType = 'Staff';
    somebody5.tid = "E200341201301700026A6B95";
    somebody5.universityComponent = FFZGRelation;
    
	participantRegistry.addAll([somebody, somebody2, somebody3,somebody5]);


        // Issue the identities.
        /*let identity = await businessNetworkConnection.issueIdentity(participantNS + '#0036444444', 'markomarkic');
        await importCardForIdentity(ferovacCardName, identity);
        identity = await businessNetworkConnection.issueIdentity(participantNS + '#0036555555', 'anaanic');
        await importCardForIdentity(ferovacProfesorCardName, identity);*/
        identity = await businessNetworkConnection.issueIdentity(participantNS2 + '#0036000000', 'fer@pii-szg-network');
        await importCardForIdentity(ferovacSystemAdminCardName, identity);
        identity = await businessNetworkConnection.issueIdentity(participantNS2 + '#0035000000', 'fsb@pii-szg-network');
        await importCardForIdentity(fsbovacfSystemAdminCardName, identity);
        identity = await businessNetworkConnection.issueIdentity(participantNS2 + '#1111000000', 'ffzg@pii-szg-network');
        await importCardForIdentity(filozofSystemAdminCardName, identity);
    });

    /**
     * Reconnect using a different identity.
     * @param {String} cardName The name of the card for the identity to use
     */
    async function useIdentity(cardName) {
        await businessNetworkConnection.disconnect();
        businessNetworkConnection = new BusinessNetworkConnection({ cardStore: cardStore });
        events = [];
        businessNetworkConnection.on('event', (event) => {
            events.push(event);
        });
        await businessNetworkConnection.connect(cardName);
        factory = businessNetworkConnection.getBusinessNetwork().getFactory();
    }

    it('ferovacSystemAdminCardName can read all of the assets', async () => {
        // Use the identity for ferovacCardName.
        await useIdentity(ferovacSystemAdminCardName);
        const assetRegistry = await businessNetworkConnection.getAssetRegistry(assetNS);
        const assets = await assetRegistry.getAll();

        // Validate the assets.
        assets.should.have.lengthOf(3);
        const asset1 = assets[0];
        asset1.universityName.should.equal('FER');
        const asset2 = assets[1];
        asset1.universityName.should.equal('FSB');
        const asset3 = assets[2];
        asset1.universityName.should.equal('FFZG');
    });
    it('ferovacSystemAdminCardName can submit a transaction for his assets', async () => {
        // Use the identity for ferovacCardName.
        await useIdentity(ferovacSystemAdminCardName);

        // Submit the transaction.
        const transaction = factory.newTransaction(namespace, 'CheckAccessFER');
        transaction.member = factory.newRelationship(namespace, participantType, 'jmbag:0036444444');
        transaction.universityComponent = factory.newRelationship(namespace, assetType, 'universityKey:0036');
        transaction.tid = "E200341201301700026A6B90";
        await businessNetworkConnection.submitTransaction(transaction);

        // Get the asset.
        const assetRegistry = await businessNetworkConnection.getAssetRegistry(assetNS);
        const asset1 = await assetRegistry.get('0036');

        // Validate the asset.
        asset1.universityName.should.equal('FER');
	    asset1.transactionAuthorized.should.have.lengthOf(1);

        // Validate the events.
        events.should.have.lengthOf(1);
        const event = events[0];
        //event.eventId.should.be.a('string');
        //event.timestamp.should.be.an.instanceOf(Date);
        event.memberAccess.universityComponent.universityName.should.equal('FER');
    });
    it('fsbovacfSystemAdminCardName can submit a transaction for his assets and grant grant for access', async () => {//
        // Use the identity for fsbovacfSystemAdminCardName.
        await useIdentity(fsbovacfSystemAdminCardName);

        // Submit the transaction.
        const transaction = factory.newTransaction(namespace, 'CheckAccessFSB');
        transaction.member = factory.newRelationship(namespace, participantType, 'jmbag:0036555555');
        transaction.universityComponent = factory.newRelationship(namespace, assetType, 'universityKey:0035');
        await businessNetworkConnection.submitTransaction(transaction);

        // Get the asset.
        const assetRegistry = await businessNetworkConnection.getAssetRegistry(assetNS);
        const asset1 = await assetRegistry.get('1111');

        // Validate the asset.
        asset1.universityName.should.equal('FSB');
	    asset1.transactionAuthorized.should.have.lengthOf(1);

        // Validate the events.
        events.should.have.lengthOf(1);
        const event = events[0];
        //event.eventId.should.be.a('string');
        //event.timestamp.should.be.an.instanceOf(Date);
        event.memberAccess.universityComponent.universityName.should.equal('FSB');
    });
    it('filozofSystemAdminCardName submit a RevokeAccessFER transaction for his assets and grant grant for access', async () => {//
        // Use the identity for filozofSystemAdminCardName.
        await useIdentity(filozofSystemAdminCardName);

        // Submit the transaction.
        const transaction = factory.newTransaction(namespace, 'CheckAccessFFZG');
        transaction.member = factory.newRelationship(namespace, participantType, 'jmbag:1111220000');
        transaction.universityComponent = factory.newRelationship(namespace, assetType, 'universityKey:1111');
        somebody5.tid = "E200341201301700026A6B95";
        await businessNetworkConnection.submitTransaction(transaction);

        // Get the asset.
        const assetRegistry = await businessNetworkConnection.getAssetRegistry(assetNS);
        const asset1 = await assetRegistry.get('1111');

        // Validate the asset.
        asset1.universityName.should.equal('FFZG');
	    asset1.transactionAuthorized.should.have.lengthOf(1);

        // Validate the events.
        events.should.have.lengthOf(1);
        const event = events[0];
        //event.eventId.should.be.a('string');
        //event.timestamp.should.be.an.instanceOf(Date);
        event.memberAccess.universityComponent.universityName.should.equal('FFZG');
    });
    it('fsbovacfSystemAdminCardName can submit a transaction for his assets and revoke grant for access', async () => {//
        // Use the identity for fsbovacfSystemAdminCardName.
        await useIdentity(fsbovacfSystemAdminCardName);

        // Submit the transaction.
        const transaction = factory.newTransaction(namespace, 'CheckAccessFSB');
        transaction.member = factory.newRelationship(namespace, participantType, 'jmbag:1111220000');
        transaction.universityComponent = factory.newRelationship(namespace, assetType, 'universityKey:0035');
        await businessNetworkConnection.submitTransaction(transaction);

        // Get the asset.
        const assetRegistry = await businessNetworkConnection.getAssetRegistry(assetNS);
        const asset1 = await assetRegistry.get('0035');

        // Validate the asset.
        asset1.universityName.should.equal('FSB');
	    asset1.transactionRevoke.should.have.lengthOf(1);

        // Validate the events.
        events.should.have.lengthOf(1);
        const event = events[0];
        //event.eventId.should.be.a('string');
        //event.timestamp.should.be.an.instanceOf(Date);
        event.memberAccess.universityComponent.universityName.should.equal('FSB');
    });
});
