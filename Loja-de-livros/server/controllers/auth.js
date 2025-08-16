import User from '../models/user.js';
import { hashPassword, comparePassword } from '../helpers/auth.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const register = async (req, res) => {
    try {
        // 1. destructure name, email, password from req.body
        const { name, email, password } = req.body;

        // 2. all fields are required validation
        if (!name.trim()) {
            return res.json({ error: 'Nome é obrigatório' });
        }
        if (!email) {
            return res.json({ error: 'Email é obrigatório' });
        }
        if (!password || password.length < 6) {
            return res.json({ error: 'A senha deve ter no mínimo 6 caracteres' });
        }

        // 3. check if email already taken
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.json({ error: 'Já exite um usuário com esse email' });
        }

        // 4. hash password
        const hashedPassword = await hashPassword(password);

        // 5. register user
        const user = await new User({
            name,
            email,
            password: hashedPassword
        }).save();

        // 6. create signed jwt
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        // 7. send response 
        res.json({
            user: {
                name: user.name,
                email: user.email,
                role: user.role,
                address: user.address,
            },
            token,
        });

    } catch (err) {
        console.log(err);
    }
};

export const login = async (req, res) => {
    try {
        // 1. destructure name, email, password from req.body
        const { email, password } = req.body;

        // 2. all fields are required validation

        if (!email) {
            return res.json({ error: 'Email é obrigatório' });
        }
        if (!password || password.length < 6) {
            return res.json({ error: 'A senha deve ter no mínimo 6 caracteres' });
        }

        // 3. check if email already taken
        const user = await User.findOne({ email });
        if (!user) {
            return res.json({ error: 'Usuario não encontrado' });
        }

        // 4. compare password
        const match = await comparePassword(password, user.password);
        if (!match) {
            return res.json({ error: 'Senha incorreta' });
        }

        // 5. create signed jwt
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        // 6. send response 
        res.json({
            user: {
                name: user.name,
                email: user.email,
                role: user.role,
                address: user.address,
            },
            token,
        });

    } catch (err) {
        console.log(err);
    }
};

export const secret = async (req, res) => {
    res.json({ currentUser: req.user });
}

export const updateProfile = async (req, res) => {
    try {
        const { name, password, address } = req.body;
        const user = await User.findById(req.user._id);

        //check password lenght
        if (password && password.length < 6) {
            return res.json({
                error: 'A senha deve ter no mínimo 6 caracteres',
            });
        }

        //hash the password
        const hashedPassword = password ? await hashPassword(password) : undefined;

        const update = await User.findByIdAndUpdate(req.user._id, {
            name: name || user.name,
            password: hashedPassword || user.password,
            address: address || user.address,
        },
            { new: true }
        );

        update.password = undefined;
        res.json(update);

    } catch (err) {
        console.log(err);
    }
}