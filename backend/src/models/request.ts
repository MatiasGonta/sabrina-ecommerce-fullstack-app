export declare namespace Express {
    interface Request {
        user: {
            _id: string;
            name: string;
            email: string;
            isAdmin: boolean;
            token: string;
        }
    }
}