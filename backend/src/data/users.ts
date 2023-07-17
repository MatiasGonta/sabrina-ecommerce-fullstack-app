import { User } from "../models";
import bcrypt from 'bcryptjs';

export const sampleUsers: User[] = [
    {
        name: 'Pepe',
        email: 'pepegaming@example.com',
        password: bcrypt.hashSync('123456'),
        isAdmin: true,
    },
    {
        name: 'Juan',
        email: 'juangaming@example.com',
        password: bcrypt.hashSync('123456'),
        isAdmin: false,
    }
]