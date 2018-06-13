# diplomskiHyperledger

# pii-szg-network

#Access control network for sveuciliste u zagrebu for thesis on FER

Operating Systems: Ubuntu Linux 14.04 / 16.04 LTS (both 64-bit), or Mac OS 10.12
Docker Engine: Version 17.03 or higher
Docker-Compose: Version 1.8 or higher
Node: 8.9 or higher (note version 9 is not supported) 8.11.0
npm: v5.x
git: 2.9.x or higher
Python: 2.7.x
A code editor of your choice, we recommend VSCode.

npm install -g angular bootstrap jquery require requirejs chai-as-promised chai make-runnable request-promise net composer-admin composer-client composer-common composer-cli composer-connector-embedded composer-cucumber-steps http path cucumber mocha

composer-* su na verziji 0.19.4

#direktorij fabric-samples sa githuba skinuti u ~/fabric-samples
#https://hyperledger.github.io/composer/latest/tutorials/deploy-to-fabric-multi-org
#uklanja stare instalacije	
    docker kill $(docker ps -q)
    docker rm $(docker ps -aq)
    docker rmi $(docker images dev-* -q)
    rm -fr $HOME/.composer
	
#ili za jednostavnu varijantu
~/fabric-dev-servers/stopFabric.sh
~/fabric-dev-servers/teardownFabric.sh
rm -fr $HOME/.composer
~/fabric-dev-servers/startFabric.sh
~/fabric-dev-servers/createPeerAdminCard.sh

#ostatak pratiti po uputama osim endoresment dijela i staviti za network da se zove pii-szg-network uz verziju 0.3.X.bna

#biti u direktoriju pii-szg-network

composer archive create -t dir -n .
composer network install --card PeerAdmin@hlfv1 --archiveFile pii-szg-network@0.3.4.bna
composer network start --networkName pii-szg-network --networkVersion 0.3.4 --networkAdmin admin --networkAdminEnrollSecret adminpw --card PeerAdmin@hlfv1 --file networkadmin.card
composer card import --file networkadmin.card

#composer network ping --card admin@pii-szg-network

# composer-rest-server -c admin@pii-szg-network -n never -w true
composer-rest-server

#Enter admin@pii-szg-network as the card name.

#Select never use namespaces when asked whether to use namespaces in the generated API.

#Select No when asked whether to secure the generated API.

#Select Yes when asked whether to enable event publication.

#Select No when asked whether to enable TLS security.

#The generated API is connected to the deployed blockchain and business network.

yo hyperledger-composer:angular
#bootstrap.css obrisati zadnji red /*# sourceMappingURL=bootstrap.css.map */

#Select Yes when asked to connect to running business network.

#Enter standard package.json questions (project name, description, author name, author email, license)

#Enter admin@pii-szg-network for the business network card.

#Select Connect to an existing REST API

#Enter http://localhost for the REST server address.

#Enter 3000 for server port.

#Select Namespaces are not used

cd angular-app-wons
npm start


#testing
#stvoriti assete/membere/systemadmine iz PIInodes/testing.txt biilo preko RESTa, bilo playground te imporati 3 kartice za systemadmine

#real simulation

