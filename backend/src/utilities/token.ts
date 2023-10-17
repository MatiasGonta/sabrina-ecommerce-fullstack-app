import { User } from "../models";
import jwt from 'jsonwebtoken';

export const generateToken = (user: User, expires: '1h' | '30d') => {
    return jwt.sign(
        {
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        },
        process.env.JWT_SECRET || 'somethingsecret',
        {
            expiresIn: expires,
        }
    )
}

export const decodeToken = (token: string) => {
    try {
        return jwt.verify(
            token,
            process.env.JWT_SECRET || 'somethingsecret'
        );
    } catch (error) {
        return null;
    }
}