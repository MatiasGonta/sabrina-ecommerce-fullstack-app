import { User } from "../models";
import bcrypt from 'bcryptjs';

export const sampleUsers: User[] = [
    {
        name: 'Pepe',
        email: 'pepegaming2023@example.com',
        password: bcrypt.hashSync('123456'),
        isAdmin: true,
        verify: true
    },
    {
        name: 'Juan',
        email: 'juangaming@gmail.com',
        password: bcrypt.hashSync('123456'),
        isAdmin: false,
        verify: true
    },
    {
        name: 'User 4',
        email: 'user4@gmail.com',
        password: bcrypt.hashSync('123456'),
        isAdmin: false,
        verify: true
    },
    {
        name: 'User 5',
        email: 'user5@gmail.com',
        password: bcrypt.hashSync('123456'),
        isAdmin: true,
        verify: true
    },
    {
        name: 'User 6',
        email: 'user6@gmail.com',
        password: bcrypt.hashSync('123456'),
        isAdmin: false,
        verify: true
    },
    {
        name: 'User 7',
        email: 'user7@gmail.com',
        password: bcrypt.hashSync('123456'),
        isAdmin: false,
        verify: true
    },
    {
        name: 'User 8',
        email: 'user8@gmail.com',
        password: bcrypt.hashSync('123456'),
        isAdmin: false,
        verify: true
    },
    {
        name: 'User 9',
        email: 'user9@gmail.com',
        password: bcrypt.hashSync('123456'),
        isAdmin: true,
        verify: true
    },
    {
        name: 'Nicolas Alvarez',
        email: 'nico@gmail.com',
        password: bcrypt.hashSync('123456'),
        isAdmin: false,
        verify: true
    },
    {
        name: 'User 11',
        email: 'user11@gmail.com',
        password: bcrypt.hashSync('123456'),
        isAdmin: false,
        verify: true
    },
    {
        name: 'User 12',
        email: 'user12@gmail.com',
        password: bcrypt.hashSync('123456'),
        isAdmin: false,
        verify: true
    },
    {
        name: 'User 13',
        email: 'user13@gmail.com',
        password: bcrypt.hashSync('123456'),
        isAdmin: true,
        verify: false
    },
    {
        name: 'User 14',
        email: 'user14@gmail.com',
        password: bcrypt.hashSync('123456'),
        isAdmin: false,
        verify: true
    },
    {
        name: 'User 15',
        email: 'user15@gmail.com',
        password: bcrypt.hashSync('123456'),
        isAdmin: false,
        verify: true
    },
    {
        name: 'User 16',
        email: 'user16@gmail.com',
        password: bcrypt.hashSync('123456'),
        isAdmin: false,
        verify: true
    },
    {
        name: 'User 17',
        email: 'user17@gmail.com',
        password: bcrypt.hashSync('123456'),
        isAdmin: true,
        verify: true
    },
    {
        name: 'User 18',
        email: 'user18@gmail.com',
        password: bcrypt.hashSync('123456'),
        isAdmin: false,
        verify: true
    },
    {
        name: 'User 19',
        email: 'user19@gmail.com',
        password: bcrypt.hashSync('123456'),
        isAdmin: false,
        verify: false
    },
    {
        name: 'User 20',
        email: 'user20@gmail.com',
        password: bcrypt.hashSync('123456'),
        isAdmin: false,
        verify: true
    }
]