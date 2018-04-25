# diplomskiHyperledger

# pii-szg-network

Access control network for sveuciliste u zagrebu for thesis on FER

biti u direktoriju pii-szg-network

composer archive create -t dir -n .

composer network install --card PeerAdmin@hlfv1 --archiveFile pii-szg-network@0.0.2.bna

composer network start --networkName pii-szg-network --networkVersion 0.0.2 --networkAdmin admin --networkAdminEnrollSecret adminpw --card PeerAdmin@hlfv1 --file networkadmin.card

composer card import --file networkadmin.card

composer network ping --card admin@pii-szg-network

composer-rest-server

Enter admin@pii-szg-network as the card name.

Select never use namespaces when asked whether to use namespaces in the generated API.

Select No when asked whether to secure the generated API.

Select Yes when asked whether to enable event publication.

Select No when asked whether to enable TLS security.

The generated API is connected to the deployed blockchain and business network.

yo hyperledger-composer:angular

Select Yes when asked to connect to running business network.

Enter standard package.json questions (project name, description, author name, author email, license)

Enter admin@pii-szg-network for the business network card.

Select Connect to an existing REST API

Enter http://localhost for the REST server address.

Enter 3000 for server port.

Select Namespaces are not used


