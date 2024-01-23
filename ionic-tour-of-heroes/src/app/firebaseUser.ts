import { FirebaseUserInfo } from './firebaseUserInfo';
import { FirebaseUserMetadata } from './firebaseUserMetaData';

export interface FirebaseUser extends FirebaseUserInfo {
  auth: any;
  emailVerified: boolean;
  isAnonymous: boolean;
  metadata: FirebaseUserMetadata;
  providerData: FirebaseUserInfo[];
  accessToken: string;
  refreshToken: string;
  tenantId: string;
}

export class FirebaseUser implements FirebaseUser {
  constructor() {}
}
