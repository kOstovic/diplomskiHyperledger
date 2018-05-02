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
   export enum MemberType {
      Student,
      Profesor,
      Staff,
   }
   export class Member extends Participant {
      jmbag: string;
      firstName: string;
      lastName: string;
      universityComponent: UniversityComponent;
      transactionAuthorized: string[];
      transactionRevoke: string[];
      memberType: MemberType;
   }
   export class SystemAdministrator extends Participant {
      jmbag: string;
      firstName: string;
      lastName: string;
      jobPosition: string;
      universityComponent: UniversityComponent;
      transactionAuthorized: string[];
      transactionRevoke: string[];
      memberType: MemberType;
   }
   export class UniversityComponent extends Asset {
      universityKey: string;
      universityName: UniversityComponentName;
      ComponentName: string;
      opening: number;
      closing: number;
      transactionAuthorized: string[];
      transactionRevoke: string[];
   }
   export abstract class MemberAccess extends Transaction {
      member: Member;
      universityComponent: UniversityComponent;
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
