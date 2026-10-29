import mongoose, { Schema, Document } from 'mongoose';

interface IExample {
  input: string;
  output: string;
  explanation?: string;
}

interface ITestCase {
  input: string;
  expectedOutput: string;
  isHidden: boolean;
}

export interface IProblem extends Document {
  title: string;
  slug: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  description: string;
  examples: IExample[];
  testCases: ITestCase[];
  createdAt: Date;
  updatedAt: Date;
}

const exampleSchema = new Schema<IExample>({
  input: { type: String, required: true },
  output: { type: String, required: true },
  explanation: { type: String },
});

const testCaseSchema = new Schema<ITestCase>({
  input: { type: String, required: true },
  expectedOutput: { type: String, required: true },
  isHidden: { type: Boolean, default: false },
});

const problemSchema = new Schema<IProblem>({
  title: { type: String, required: [true, 'Title is required'], trim: true, unique: true },
  slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
  difficulty: { type: String, required: true, enum: ['Easy', 'Medium', 'Hard'] },
  description: { type: String, required: [true, 'Description is required'] },
  examples: [exampleSchema],
  testCases: [testCaseSchema],
}, { timestamps: true });

export default mongoose.model<IProblem>('Problem', problemSchema);