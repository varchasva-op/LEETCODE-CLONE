import 'dotenv/config';
import mongoose from 'mongoose';
import connectDB from './config/db';
import Problem from './models/Problem';

const twoSum = {
  title: 'Two Sum',
  slug: 'two-sum',
  difficulty: 'Easy' as const,
  description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.`,
  examples: [
    { input: 'nums = [2,7,11,15], target = 9', output: '[0,1]', explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].' },
    { input: 'nums = [3,2,4], target = 6', output: '[1,2]' },
    { input: 'nums = [3,3], target = 6', output: '[0,1]' },
  ],
  testCases: [
    { input: '2 7 11 15\n9', expectedOutput: '0 1', isHidden: false },
    { input: '3 2 4\n6', expectedOutput: '1 2', isHidden: false },
    { input: '3 3\n6', expectedOutput: '0 1', isHidden: false },
    { input: '1 2 3 4 5\n9', expectedOutput: '3 4', isHidden: true },
    { input: '5 7 3 8 1\n10', expectedOutput: '1 3', isHidden: true },
    { input: '0 4 3 0\n0', expectedOutput: '0 3', isHidden: true },
    { input: '-1 -2 -3 -4 -5\n-8', expectedOutput: '2 4', isHidden: true },
  ],
};

async function seed() {
  await connectDB();
  const exists = await Problem.findOne({ slug: 'two-sum' });
  if (exists) {
    console.log('⚠️  Two Sum already exists — skipping');
    await mongoose.disconnect();
    process.exit(0);
  }
  await Problem.create(twoSum);
  console.log('✅ Seeded: Two Sum');
  await mongoose.disconnect();
  process.exit(0);
}

seed().catch((err) => {
  console.error('❌ Seed failed:', err);
  process.exit(1);
});