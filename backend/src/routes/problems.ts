import { Router } from 'express';
import { getProblems, getProblemBySlug, createProblem } from '../controllers/problemController';

const router = Router();

router.get('/', getProblems);
router.get('/:slug', getProblemBySlug);
router.post('/', createProblem);

export default router;