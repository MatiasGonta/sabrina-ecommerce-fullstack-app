import { User } from "../models";
import bcrypt from 'bcryptjs';

export const sampleUsers: User[] = [
    {
        name: 'Pepe García',
        email: 'pepegarcia2023@gmail.com',
        password: bcrypt.hashSync('123456'),
        isAdmin: true,
        verify: true
    },
    {
        name: 'Juan Sánchez',
        email: 'juansanchez@gmail.com',
        password: bcrypt.hashSync('123456'),
        isAdmin: false,
        verify: true
    },
    {
        name: 'Juan Martínez',
        email: 'juanmartinez@gmail.com',
        password: bcrypt.hashSync('123456'),
        isAdmin: false,
        verify: true
    },
    {
        name: 'Isabella López',
        email: 'isabellalopez@gmail.com',
        password: bcrypt.hashSync('123456'),
        isAdmin: true,
        verify: true
    },
    {
        name: 'Alejandro García',
        email: 'alejandrogarcia@gmail.com',
        password: bcrypt.hashSync('123456'),
        isAdmin: false,
        verify: true
    },
    {
        name: 'Diego Hernandez',
        email: 'diegohernandez@gmail.com',
        password: bcrypt.hashSync('123456'),
        isAdmin: false,
        verify: true
    },
    {
        name: 'Valentina Pérez',
        email: 'valentinaperez@gmail.com',
        password: bcrypt.hashSync('123456'),
        isAdmin: false,
        verify: true
    },
    {
        name: 'Miguel Fernández',
        email: 'miguelfernandez@gmail.com',
        password: bcrypt.hashSync('123456'),
        isAdmin: true,
        verify: true
    },
    {
        name: 'Nicolas Alvarez',
        email: 'nicolasalvarez@gmail.com',
        password: bcrypt.hashSync('123456'),
        isAdmin: false,
        verify: true
    },
    {
        name: 'Sofia González',
        email: 'sofiagonzalez@gmail.com',
        password: bcrypt.hashSync('123456'),
        isAdmin: false,
        verify: true
    },
    {
        name: 'Camila Ramírez',
        email: 'camilaramirez@gmail.com',
        password: bcrypt.hashSync('123456'),
        isAdmin: false,
        verify: false
    },
    {
        name: 'Daniel Torres',
        email: 'danieltorres@gmail.com',
        password: bcrypt.hashSync('123456'),
        isAdmin: false,
        verify: true
    },
    {
        name: 'Andrés Vargas',
        email: 'andresvargas@gmail.com',
        password: bcrypt.hashSync('123456'),
        isAdmin: false,
        verify: true
    },
    {
        name: 'Lucas Herrera',
        email: 'lucasherrera@gmail.com',
        password: bcrypt.hashSync('123456'),
        isAdmin: false,
        verify: true
    },
    {
        name: 'Francisco Gómez',
        email: 'franciscogomez@gmail.com',
        password: bcrypt.hashSync('123456'),
        isAdmin: true,
        verify: true
    },
    {
        name: 'Victoria Ruiz',
        email: 'victoriaruiz@gmail.com',
        password: bcrypt.hashSync('123456'),
        isAdmin: false,
        verify: true
    },
    {
        name: 'Laura Castro',
        email: 'lauracastro@gmail.com',
        password: bcrypt.hashSync('123456'),
        isAdmin: false,
        verify: false
    },
    {
        name: 'Pedro Díaz',
        email: 'pedrodiaz@gmail.com',
        password: bcrypt.hashSync('123456'),
        isAdmin: false,
        verify: true
    }
]