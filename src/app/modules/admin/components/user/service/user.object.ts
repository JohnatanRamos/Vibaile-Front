export interface User {
  email: string;
  createData: string;
  person: {
    name: string;
    lastName: string;
    phone?: string;
  };
  role: {
    name: string;
  };
}
