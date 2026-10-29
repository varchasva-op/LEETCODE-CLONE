import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { api, ProblemDetail } from '../api/client';


export default function ProblemDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [problem, setProblem] = useState<ProblemDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function load(s: string) {          // <-- accept slug as parameter so TS knows it's definitely a string
      try {
        const data = await api.getProblem(s);
        setProblem(data.problem);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load problem');
      } finally {
        setLoading(false);
      }
    }

    if (slug) {                               // <-- check slug right here, outside the inner function
      load(slug);                             // <-- pass it in, guaranteed non-undefined
    } else {
      setLoading(false);
    }
  }, [slug]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!problem) return <p>Problem not found.</p>;

  const difficultyColor = (d: string) => {
    if (d === 'Easy') return 'green';
    if (d === 'Medium') return '#cc9a06';
    return 'red';
  };

  return (
    <div style={{ maxWidth: '800px' }}>
      <p><Link to="/problems">← All Problems</Link></p>
      <h1>{problem.title}</h1>
      <p><strong style={{ color: difficultyColor(problem.difficulty) }}>{problem.difficulty}</strong></p>
      <div style={{ whiteSpace: 'pre-wrap', lineHeight: 1.6 }}>{problem.description}</div>
      <h2>Examples:</h2>
      {problem.examples.map((ex, idx) => (
        <div key={idx} style={{ background: '#f4f4f4', padding: '12px', marginBottom: '12px', borderRadius: '4px' }}>
          <p><strong>Example {idx + 1}:</strong></p>
          <pre style={{ margin: 0 }}><strong>Input:</strong> {ex.input}</pre>
          <pre style={{ margin: 0 }}><strong>Output:</strong> {ex.output}</pre>
          {ex.explanation && <pre style={{ margin: 0 }}><strong>Explanation:</strong> {ex.explanation}</pre>}
        </div>
      ))}
      <p><em>Code editor and submission coming next...</em></p>
    </div>
  );
}