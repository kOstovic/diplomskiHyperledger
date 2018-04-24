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
 * Granting access to FER to a Member.
 * @param {org.szg.AuthorizeAccessFER} authorize - the grant to be processed
 * @transaction
 */

async function AuthorizeAccessFER(authorize) {  // eslint-disable-line no-unused-vars

    var me = await query('selectMember',{jmbagParam : authorize.jmbag});

    console.log('**** AUTH: ' + authorize.universityKey + " FER"+' granting access to ' +  me.jmbag);

    if(!me) {
        throw new Error('A participant/certificate mapping does not exist.');
    }

        me.transactionAuthorized.push(authorize.universityKey+" FER"+" "+ Date().toLocaleString());

        // emit an event
        const event = getFactory().newEvent('org.szg', 'MemberEvent');
        event.memberTransaction = authorize;
        emit(event);

        // persist the state of the member
        const memberRegistry = await getParticipantRegistry('org.szg.Member');
        await memberRegistry.update(me);
}

/**
 * Revoking access to FER to a Member.
 * @param {org.szg.RevokeAccessFER} revoke - the RevokeAccess to be processed
 * @transaction
 */
async function revokeAccessFER(revoke) {  // eslint-disable-line no-unused-vars

    var me = await query('selectMember',{jmbagParam : authorize.jmbag});
    console.log('**** REVOKE: ' + revoke.universityKey + " FER"+' revoking access to ' +  me.jmbag);

    if(!me) {
        throw new Error('A participant/certificate mapping does not exist.');
    }

        me.transactionAuthorized.push(revoke.universityKey+" FER"+" "+ Date().toLocaleString());

        // emit an event
        const event = getFactory().newEvent('org.szg', 'MemberEvent');
        event.memberTransaction = revoke;
        emit(event);

        // persist the state of the member
        const memberRegistry = await getParticipantRegistry('org.szg.Member');
        await memberRegistry.update(me);
}

/**
 * Granting access to FER to a Member.
 * @param {org.szg.AuthorizeAccessFER} authorize - the grant to be processed
 * @transaction
 */

async function AuthorizeAccessFER(authorize) {  // eslint-disable-line no-unused-vars

    var me = await query('selectMember',{jmbagParam : authorize.jmbag});

    console.log('**** AUTH: ' + authorize.universityKey + " FSB"+' granting access to ' +  me.jmbag);

    if(!me) {
        throw new Error('A participant/certificate mapping does not exist.');
    }

        me.transactionAuthorized.push(authorize.universityKey+" FSB"+" "+ Date().toLocaleString());

        // emit an event
        const event = getFactory().newEvent('org.szg', 'MemberEvent');
        event.memberTransaction = authorize;
        emit(event);

        // persist the state of the member
        const memberRegistry = await getParticipantRegistry('org.szg.Member');
        await memberRegistry.update(me);
}

/**
 * Revoking access to FER to a Member.
 * @param {org.szg.RevokeAccessFER} revoke - the RevokeAccess to be processed
 * @transaction
 */
async function revokeAccessFER(revoke) {  // eslint-disable-line no-unused-vars

    var me = await query('selectMember',{jmbagParam : authorize.jmbag});
    console.log('**** REVOKE: ' + revoke.universityKey + " FSB"+' revoking access to ' +  me.jmbag);

    if(!me) {
        throw new Error('A participant/certificate mapping does not exist.');
    }

        me.transactionAuthorized.push(revoke.universityKey+" FSB"+" "+ Date().toLocaleString());

        // emit an event
        const event = getFactory().newEvent('org.szg', 'MemberEvent');
        event.memberTransaction = revoke;
        emit(event);

        // persist the state of the member
        const memberRegistry = await getParticipantRegistry('org.szg.Member');
        await memberRegistry.update(me);
}

/**
 * Granting access to FER to a Member.
 * @param {org.szg.AuthorizeAccessFER} authorize - the grant to be processed
 * @transaction
 */

async function AuthorizeAccessFFZG(authorize) {  // eslint-disable-line no-unused-vars

    var me = await query('selectMember',{jmbagParam : authorize.jmbag});

    console.log('**** AUTH: ' + authorize.universityKey + " FFZG"+' granting access to ' +  me.jmbag);

    if(!me) {
        throw new Error('A participant/certificate mapping does not exist.');
    }

        me.transactionAuthorized.push(authorize.universityKey+" FFZG"+" "+ Date().toLocaleString());

        // emit an event
        const event = getFactory().newEvent('org.szg', 'MemberEvent');
        event.memberTransaction = authorize;
        emit(event);

        // persist the state of the member
        const memberRegistry = await getParticipantRegistry('org.szg.Member');
        await memberRegistry.update(me);
}

/**
 * Revoking access to FFZG to a Member.
 * @param {org.szg.RevokeAccessFFZG} revoke - the RevokeAccess to be processed
 * @transaction
 */
async function revokeAccessFFZG(revoke) {  // eslint-disable-line no-unused-vars

    var me = await query('selectMember',{jmbagParam : authorize.jmbag});
    console.log('**** REVOKE: ' + revoke.universityKey + " FFZG"+' revoking access to ' +  me.jmbag);

    if(!me) {
        throw new Error('A participant/certificate mapping does not exist.');
    }

        me.transactionAuthorized.push(revoke.universityKey+" FFZG"+" "+ Date().jmbag);

        // emit an event
        const event = getFactory().newEvent('org.szg', 'MemberEvent');
        event.memberTransaction = revoke;
        emit(event);

        // persist the state of the member
        const memberRegistry = await getParticipantRegistry('org.szg.Member');
        await memberRegistry.update(me);
}