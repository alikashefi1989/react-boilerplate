export interface UserEntity {
    _id: string;
    name: string;
    password: string;
}

export type UserEntityGetModel = Omit<UserEntity, 'password'>;