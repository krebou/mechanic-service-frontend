import { User } from './user.interface';

export interface AuthSuccess {
    token: string;
    user: User;
}
