import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api, ProblemSummary } from '../api/client';

export default function ProblemList() {
  const [problems, setProblems] = useState<ProblemSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function load() {
      try {
        const data = await api.getProblems();
        setProblems(data.problems);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load problems');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) return <p>Loading problems...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  const difficultyColor = (d: string) => {
    if (d === 'Easy') return 'green';
    if (d === 'Medium') return '#cc9a06';
    return 'red';
  };

  return (
    <div>
      <h1>Problems</h1>
      <p>{problems.length} problem{problems.length !== 1 && 's'}</p>
      <table border={1} cellPadding={8} style={{ borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Difficulty</th>
          </tr>
        </thead>
        <tbody>
          {problems.map((p, idx) => (
            <tr key={p._id}>
              <td>{idx + 1}</td>
              <td><Link to={`/problems/${p.slug}`}>{p.title}</Link></td>
              <td style={{ color: difficultyColor(p.difficulty) }}>{p.difficulty}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {problems.length === 0 && <p>No problems yet.</p>}
    </div>
  );
}