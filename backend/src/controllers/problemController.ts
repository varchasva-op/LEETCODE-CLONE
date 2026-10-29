import { Request, Response } from 'express';
import Problem from '../models/Problem';

export const getProblems = async (req: Request, res: Response) => {
  try {
    const problems = await Problem.find().select('title slug difficulty').sort({ difficulty: 1 });
    res.json({ count: problems.length, problems });
  } catch (err) {
    const e = err as Error;
    res.status(500).json({ message: 'Server error', error: e.message });
  }
};

export const getProblemBySlug = async (req: Request, res: Response) => {
  try {
    const problem = await Problem.findOne({ slug: req.params.slug }).select('-testCases');
    if (!problem) return res.status(404).json({ message: 'Problem not found' });
    res.json({ problem });
  } catch (err) {
    const e = err as Error;
    res.status(500).json({ message: 'Server error', error: e.message });
  }
};

export const createProblem = async (req: Request, res: Response) => {
  try {
    const { title, slug, difficulty, description, examples, testCases } = req.body;
    if (!title || !slug || !difficulty || !description) {
      return res.status(400).json({ message: 'Title, slug, difficulty, and description are required' });
    }

    const problem = await Problem.create({
      title, slug, difficulty, description,
      examples: examples || [],
      testCases: testCases || [],
    });

    res.status(201).json({ message: 'Problem created', problem });
  } catch (err) {
    const e = err as Error;
    if ((err as any).code === 11000) {
      return res.status(409).json({ message: 'Problem with this title or slug already exists' });
    }
    res.status(500).json({ message: 'Server error', error: e.message });
  }
};