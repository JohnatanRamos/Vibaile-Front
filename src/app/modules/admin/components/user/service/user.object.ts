export interface User {
  readonly email: string;
  readonly person: {
    readonly name: string;
    readonly lastName: string;
    readonly phone?: string;
  };
  readonly role: {
    readonly name: string;
  };
}
