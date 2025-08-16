import express from 'express';

const router = express.Router();

//middlewares
import { requireSignIn, isAdmin } from '../middlewares/auth.js';

//controllers
import { register, login, secret, updateProfile } from '../controllers/auth.js';

router.post('/register', register);
router.post('/login', login);
router.get('/auth-check', requireSignIn, (req, res) => {
    res.json({ ok: true });
});

router.get('/admin-check', requireSignIn, isAdmin, (req, res) => {
    res.json({ ok: true });
});

router.put('/profile', requireSignIn, updateProfile)

//testing
router.get('/secret', requireSignIn, isAdmin, secret)



export default router;