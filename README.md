# diplomskiHyperledger

# pii-szg-network

#Access control network for sveuciliste u zagrebu for thesis on FER

#direktorij fabric-dev-servers sa githuba kopirati u ~/fabric-dev-servers 
    cd ~/fabric-dev-servers	
    docker kill $(docker ps -q)
    docker rm $(docker ps -aq)
    docker rmi $(docker images dev-* -q)
    ./startFabric.sh

# Create the channel
docker exec peer1.org1.example.com peer channel create -o orderer.example.com:7050 -c composerchannel -f /etc/hyperledger/configtx/composer-channel.tx
# Join peer1.org1.example.com to the channel.
docker exec -e "CORE_PEER_MSPCONFIGPATH=/etc/hyperledger/msp/users/Admin@org1.example.com/msp" peer1.org1.example.com peer channel join -b composerchannel.block

#kopirati composerchannel.block sa jednog peera na drugi
docker cp peer1.org1.example.com:/opt/gopath/src/github.com/hyperledger/fabric/composerchannel.block /tmp/composerchannel.block
docker cp /tmp/composerchannel.block peer0.org1.example.com:/opt/gopath/src/github.com/hyperledger/fabric/composerchannel.block

# Join peer0.org1.example.com to the channel.
docker exec -e "CORE_PEER_MSPCONFIGPATH=/etc/hyperledger/msp/users/Admin@org1.example.com/msp" peer0.org1.example.com peer channel join -b composerchannel.block

    ./createPeerAdminCard.sh
#biti u direktoriju pii-szg-network

composer archive create -t dir -n .

composer network install --card PeerAdmin@hlfv1 --archiveFile pii-szg-network@0.1.0.bna

composer network start --networkName pii-szg-network --networkVersion 0.1.0 --networkAdmin admin --networkAdminEnrollSecret adminpw --card PeerAdmin@hlfv1 --file networkadmin.card

composer card import --file networkadmin.card

composer network ping --card admin@pii-szg-network

composer-rest-server

#Enter admin@pii-szg-network as the card name.

#Select never use namespaces when asked whether to use namespaces in the generated API.

#Select No when asked whether to secure the generated API.

#Select Yes when asked whether to enable event publication.

#Select No when asked whether to enable TLS security.

#The generated API is connected to the deployed blockchain and business network.

yo hyperledger-composer:angular

#Select Yes when asked to connect to running business network.

#Enter standard package.json questions (project name, description, author name, author email, license)

#Enter admin@pii-szg-network for the business network card.

#Select Connect to an existing REST API

#Enter http://localhost for the REST server address.

#Enter 3000 for server port.

#Select Namespaces are not used


