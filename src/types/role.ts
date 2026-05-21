export const USER_ROLE={
    admin: 'admin',
    user:"user",
    agent:"agent"
} as const;


export type Role= 'admin'| 'user' |'agent'