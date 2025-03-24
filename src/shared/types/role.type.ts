export type FullRoleType = {
  id: string;
  name: string;
  description: string;
  status: boolean;
  permissions: {
    [key: string]: number;
  };
  createdAt: Date;
  updatedAt: Date;
};

export type RoleSeed = Omit<FullRoleType, 'id' | 'createdAt' | 'updatedAt'>;
