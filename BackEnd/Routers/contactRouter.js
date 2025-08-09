import {Router} from 'express';
import { contactMail } from '../Controllers/contactController.js';

const router = Router();

router.post('/sendMessage', contactMail);

export default router;