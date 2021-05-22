export type HttpMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE';

export enum HttpRequestStatus {
  IDLE,
  PENDING,
  SUCCESS,
  FAIL,
}

export enum HttpErrorCode {
  NoError = 0,
  UnknownError = 1,
  BadRequestError = 2,
  AuthenticationFailed = 3,
  TokenExpired = 4,
  PermissionDenied = 5,
  DatabaseError = 6,
  ExternalConnectionError = 7,
  AutomaticPairingError = 8,
}

export enum ScreenType {
  Mobile,
  Desktop,
}

export enum UserRole {
  Visitor = 'visitor',
  Admin = 'admin',
  Superuser = 'superuser',
}
