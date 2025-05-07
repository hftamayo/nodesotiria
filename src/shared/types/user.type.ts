export type FullUserType = {
  id: string;
  fullname: string;
  birth_date: Date;
  email: string;
  password: string;
  status: boolean;
  roleId: number;
  createdAt: Date;
  updatedAt: Date;
};

export type UserSeed = Omit<FullUserType, 'id' | 'createdAt' | 'updatedAt'>;
