import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
// export namespace org.szg{
   export enum UniversityComponentName {
      FER,
      FFZG,
      FSB,
   }
   export abstract class Member extends Participant {
      jmbag: string;
      firstName: string;
      lastName: string;
      universityComponent: UniversityComponent;
      transactionAuthorized: string[];
      transactionRevoke: string[];
   }
   export class Student extends Member {
      yearOfCollage: number;
   }
   export class Profesor extends Member {
      title: string;
      fieldOfJob: string;
   }
   export class Staff extends Member {
      jobPosition: string;
   }
   export class SystemAdministrator extends Member {
      jobPosition: string;
   }
   export class UniversityComponent extends Asset {
      universityKey: string;
      universityName: UniversityComponentName;
      ComponentName: string;
      opening: number;
      closing: number;
   }
   export abstract class MemberAccess extends Transaction {
      jmbag: string;
      universityKey: string;
   }
   export class AuthorizeAccessFER extends MemberAccess {
   }
   export class RevokeAccessFER extends MemberAccess {
   }
   export class AuthorizeAccessFFZG extends MemberAccess {
   }
   export class RevokeAccessFFZG extends MemberAccess {
   }
   export class AuthorizeAccessFSB extends MemberAccess {
   }
   export class RevokeAccessFSB extends MemberAccess {
   }
   export class MemberEvent extends Event {
      memberAccess: MemberAccess;
   }
// }
