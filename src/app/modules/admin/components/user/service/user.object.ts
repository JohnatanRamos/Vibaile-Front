export interface User {
  id: number;
  email: string;
  createData: string;
  roleId: number;
  person: {
    id: number;
    name: string;
    lastName: string;
    phone?: string;
  };
  role?: {
    name: string;
    id: number;
  };
}
