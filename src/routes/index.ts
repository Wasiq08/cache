import { Router } from 'express';
import cache from './cache';

const router: Router = Router();
router.use('/cache', cache);

export default router;
