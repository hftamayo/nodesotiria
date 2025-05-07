export const PERMISSIONS = {
  NONE: 0,
  READ: 1 << 0, //1
  WRITE: 1 << 1, //2
  UPDATE: 1 << 2, //4
  DELETE: 1 << 3, //8
  ALL: ~(~0 << 4), // 15,
} as const;

export const SYSTEM_PERMISSIONS = {
  LOGOUT: 1 << 0, //1
} as const;

export const DOMAINS = {
  USER: 'user',
  ROLE: 'role',
  SYSTEM: 'system',
} as const;
