import { Request, Response } from "express";
import asyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import { User, UserModel } from "../models";
import { decodeToken, generateToken, isValidEmail } from "../utilities";
import { transporter } from "..";

export const signin = asyncHandler(
    async (req: Request, res: Response) => {
        const user = await UserModel.findOne({ email: req.body.email })
        if (user && bcrypt.compareSync(req.body.password, user.password)) {
            if (user.verify) {
                res.status(201).json({
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    isAdmin: user.isAdmin,
                    token: generateToken(user, '30d')
                });
                return;
            } else {
                res.status(404).json({ message: 'Usuario no verificado. Ingrese a su email y confirme su cuenta' });
                return;
            }
        }
        res.status(400).json({ message: 'Email o contraseña inválidos' });
    }
);

export const signup = asyncHandler(
    async (req: Request, res: Response) => {
        try {
            const emailFound = await UserModel.findOne({ email: req.body.email }) || null;
            if (emailFound && !isValidEmail(req.body.email)) {
                res.status(400).json({ message: 'El email ya esta registrado' });
                return;
            }

            const newUser = {
                name: req.body.name,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password),
                isAdmin: req.body.isAdmin
            } as User;

            const user = await UserModel.create(newUser);

            // Check if the new user is verified directly by an administrator
            if (req.body.verify) {
                await UserModel.findByIdAndUpdate(
                    user._id,
                    { verify: req.body.verify },
                    { new: true }
                );

                res.status(201).json({
                    newUser: newUser,
                    message: 'Usuario creado correctamente'
                });
            } else {
                const emailToken = generateToken(newUser, '1h');

                // Verify account link
                const verifyLink = `http://localhost:5173/verify/${user._id}?emailToken=${emailToken}`;

                // Send verify email
                const info = await transporter.sendMail({
                    from: `"Confirmar cuenta ⚙️" <${process.env.NODEMAILER_EMAIL}>`,
                    to: req.body.email,
                    subject: "Confirmar cuenta ✔",
                    html: `
                        <div style="color: #202020; width: 357px; height: auto; padding: 20px; border: 2px solid #202020; text-align: justify;">
                            <span style="font-weight: bold; font-size: 26px; max-width: 80%;; width: fit-content; display: inline; margin: 0 auto; color: #202020; padding: 0 70px;">Confirmar cuenta</span>
                            <img src="https://res.cloudinary.com/duihep83l/image/upload/v1696370881/sabrina-icon_clropi.png" alt="sabrina-icon" />
                            <ol style="margin: 0px; padding-inline-start: 0px; padding: 0px; color: #202020;">
                                <li style="margin-bottom: 10px; color: #202020;">
                                    Haz clic en el siguiente enlace de confirmación: <br />
                                    <a href="${verifyLink}" target="_blank" rel="noopener noreferrer" style="color: #5686db;">confirmar usuario</a>
                                </li>
                                <li style="color: #202020;">Una vez que hayas hecho clic en el enlace, tu dirección de correo electrónico será verificada y tu cuenta estará completamente activa.</li>
                            </ol>
                        </div>
                    `,
                });

                res.status(201).json({ message: 'Se ha enviado un correo de verificación. Por favor, revise su bandeja de entrada o sección de spam.' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error al crear el usuario' });
        }
    }
);

export const verifyUser = asyncHandler(async (req: Request, res: Response) => {
    try {
        const { token } = req.params;

        const data = decodeToken(token) as {
            name: string;
            email: string;
            isAdmin: boolean;
            iat: number;
            exp: number;
        };

        const user = await UserModel.findOne({ email: data?.email });

        if (!user) {
            res.status(404).json({ message: 'Usuario no encontrado' });
            return;
        }

        // Update verified status
        user.verify = true;
        await user.save();

        res.status(201).json({
            newUser: {
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user, '30d')
            },
            verify: true,
            message: 'Usuario verificado correctamente!'
        });
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor' });
    }
});

export const sendRestorePasswordEmail = asyncHandler(
    async (req: Request, res: Response) => {
        try {
            const emailFound = await UserModel.findOne({ email: req.body.email }) || null;

            if (emailFound && isValidEmail(req.body.email)) {
                const emailToken = generateToken(emailFound, '1h');

                // Restore password link
                const restoreLink = `http://localhost:5173/restore-password/${emailFound._id}?emailToken=${emailToken}`;
    
                // Send restore password email
                const info = await transporter.sendMail({
                    from: `"Restablecer contraseña ⚙️" <${process.env.NODEMAILER_EMAIL}>`,
                    to: req.body.email,
                    subject: "Restablecer contraseña ⟳",
                    html: `
                            <div style="color: #202020; width: 357px; height: auto; padding: 20px; border: 2px solid #202020; text-align: justify;">
                                <span style="font-weight: bold; font-size: 26px; max-width: 80%;; width: fit-content; display: inline; margin: 0 auto; color: #202020; padding: 0 25px;">Restablecer contraseña</span>
                                <img src="https://res.cloudinary.com/duihep83l/image/upload/v1696370881/sabrina-icon_clropi.png" alt="sabrina-icon" />
                                <ol style="margin: 0px; padding-inline-start: 0px; padding: 0px; color: #202020;">
                                    <li style="margin-bottom: 10px; color: #202020;">
                                        Haz clic en el siguiente enlace para restablecer su contraseña: <br />
                                        <a href="${restoreLink}" target="_blank" rel="noopener noreferrer" style="color: #5686db;">restablecer contraseña</a>
                                    </li>
                                    <li style="color: #202020;">Una vez que hayas hecho clic en el enlace, accederas al restablecimiento de su contraseña.</li>
                                </ol>
                            </div>
                        `,
                });
    
                res.status(201).json({ message: 'Se ha enviado un correo electrónico para restablecer la contraseña. Por favor, revise su bandeja de entrada o sección de spam.' });
            } else {
                res.status(404).json({ message: 'No hemos encontrado ninguna cuenta asociada a ese correo electrónico. Por favor, asegúrate de que ingresaste la dirección correcta o regístrate si aún no lo has hecho.' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error en el servidor' });
        }
    }
);

export const restorePassword = asyncHandler(async (req: Request, res: Response) => {
    try {
        const { token } = req.params;

        const data = decodeToken(token) as {
            name: string;
            email: string;
            isAdmin: boolean;
            iat: number;
            exp: number;
        };

        const user = await UserModel.findOne({ email: data?.email });

        if (!user) {
            res.status(404).json({ message: 'Usuario no encontrado' });
            return;
        }

        if (!req.body.newPassword || req.body.newPassword.trim() === '') {
            res.status(400).json({ message: 'Se requiere proporcionar una nueva contraseña válida.' });
            return;
        }

        // Restore password
        user.password = bcrypt.hashSync(req.body.newPassword);
        await user.save();

        res.status(201).json({ message: 'Se restableció la contraseña correctamente!' });
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor' });
    }
});

export const deleteUser = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.params.id;

    const deletedUser = await UserModel.findByIdAndDelete(userId);

    if (deletedUser) {
        res.status(201).json({ message: 'Usuario eliminado exitosamente' });
    } else {
        res.status(404).json({ message: 'Usuario no encontrado' });
    }
});

export const updateUser = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.params.id;

    let newName = req.body.name;
    let newEmail = req.body.email;
    let newIsAdmin = req.body.isAdmin;
    let newVerifyStatus = req.body.verify;

    const updateUserFields: {
        name?: string;
        email?: string;
        isAdmin?: boolean;
        verify?: boolean;
    } = {};

    if (newName && newName.trim() !== '') {
        updateUserFields.name = newName;
    }

    if (newEmail && newEmail.trim() !== '') {
        // Check if a user exists with the new email
        const emailFound = await UserModel.findOne({ email: newEmail }) || null;
        if (emailFound) {
            res.status(404).json({ message: `Ya existe un usuario con "${newEmail}" como email` });
            return;
        }

        updateUserFields.email = newEmail;
    }

    if (newIsAdmin !== undefined) {
        updateUserFields.isAdmin = newIsAdmin;
    }

    if (newVerifyStatus !== undefined) {
        updateUserFields.verify = newVerifyStatus;
    }

    if (Object.keys(updateUserFields).length === 0) {
        res.status(404).json({ message: 'No hay campos válidos para actualizar' });
        return;
    }

    const updatedUser = await UserModel.findByIdAndUpdate(
        userId,
        updateUserFields,
        { new: true }
    );

    if (updatedUser) {
        res.status(201).json({ message: 'Usuario actualizado con éxito', user: updatedUser });
    } else {
        res.status(404).json({ message: 'Usuario no encontrado' });
    }
});

export const getProfileDetails = asyncHandler(
    async (req: Request, res: Response) => {
        try {
            const userId = req.params.id;

            const user = await UserModel.findById(userId);

            if (user) {
                res.status(201).json(user);
            } else {
                res.status(401).json({ message: 'Usuario no encontrado' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error en el servidor' });
        }
    }
);

export const getAllUsers = asyncHandler(
    async (req: Request, res: Response) => {
        try {
            const { page = 1, q, sort, order, limit = 20 } = req.query;
            const regex = new RegExp(q as string, 'i');

            const options = {
                page: parseInt(page as string),
                limit: parseInt(limit as string),
                sort: { updatedAt: -1 } as { [key: string]: number }
            };

            if (sort && order) {
                options.sort = { [sort as string]: order === 'asc' ? 1 : -1 };
            }

            const user = await UserModel.paginate({
                $or: [
                    { name: regex },
                    { email: regex }
                ],
            }, options);

            if (user) {
                res.status(201).json(user);
            } else {
                res.status(401).json({ message: 'Usuarios no encontrados' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error en el servidor' });
        }
    }
);

export const getUsersStatistics = asyncHandler(
    async (req: Request, res: Response) => {
        const users = await UserModel.find();

        // Get new users from last month
        const currentDate = new Date();
        const lastMonthDate = new Date();
        lastMonthDate.setMonth(currentDate.getMonth() - 1);

        const newMonthUsers = await UserModel.find({
            createdAt: { $gte: lastMonthDate, $lt: currentDate },
        });

        // Get new users of the day
        const startOfToday = new Date(currentDate);
        startOfToday.setHours(0, 0, 0, 0);

        const newTodayUsers = await UserModel.find({
            createdAt: { $gte: startOfToday, $lt: currentDate },
        });

        // Calculate users per day for the last month
        const usersPerDay: { [key: string]: number } = {};
        const currentDateCopy = new Date(currentDate);

        while (currentDateCopy > lastMonthDate) {
            const startOfDay = new Date(currentDateCopy);
            startOfDay.setHours(0, 0, 0, 0);
            const endOfDay = new Date(currentDateCopy);
            endOfDay.setHours(23, 59, 59, 999);

            const newUsersForDay = await UserModel.find({
                createdAt: { $gte: startOfDay, $lt: endOfDay },
            });

            usersPerDay[startOfDay.toISOString().substring(5, 10)] = newUsersForDay.length;

            currentDateCopy.setDate(currentDateCopy.getDate() - 1);
        }

        const statistics: {
            totalUsers: number;
            newMonthUsers: number;
            newTodayUsers: number;
            newUsersPerDay: { [key: string]: number };
        } = {
            totalUsers: users.length,
            newMonthUsers: newMonthUsers.length,
            newTodayUsers: newTodayUsers.length,
            newUsersPerDay: usersPerDay,
        };

        if (statistics) {
            res.status(201).json(statistics);
        } else {
            res.status(401).json({ message: 'Estadísticas de usuarios no encontradas' });
        }
    }
);