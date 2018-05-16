# diplomskiHyperledger

# pii-szg-network

#Access control network for sveuciliste u zagrebu for thesis on FER

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
~/fabric-dev-servers/startFabric.sh
~/fabric-dev-servers/createPeerAdminCard.sh

#podiže nove instalacije
./byfn.sh -m generate
./byfn.sh -m up -s couchdb -a
./byfn.sh -m up
./byfn.sh -m up -f docker-compose-cas.yaml
#ostatak pratiti po uputama osim endoresment dijela i staviti za network da se zove pii-szg-network uz verziju 0.1.0.bna

#biti u direktoriju pii-szg-network

composer archive create -t dir -n .

#composer network install --card PeerAdmin@hlfv1 --archiveFile pii-szg-network@0.1.11.bna

#composer network start --networkName pii-szg-network --networkVersion 0.1.11 --networkAdmin admin --networkAdminEnrollSecret adminpw --card PeerAdmin@hlfv1 --file networkadmin.card

#composer card import --file networkadmin.card

#composer network ping --card admin@pii-szg-network

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

