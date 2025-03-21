export type FullUserType = {
  id: string;
  lastname: string;
  firstname: string;
  email: string;
  password: string;
  roleId: number;
  status: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type UserSeed = Omit<FullUserType, 'id' | 'createdAt' | 'updatedAt'>;
