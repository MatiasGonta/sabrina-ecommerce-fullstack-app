// Add user property to Express Request object
declare namespace Express {
    export interface Request {
      user: {
        _id: string
        name: string
        email: string
        isAdmin: boolean
        token: string
      }
    }
}