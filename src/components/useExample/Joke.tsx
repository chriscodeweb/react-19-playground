import { use, Suspense } from 'react';
import CodeSnippet from '../../layouts/CodeSnippet';
import { CODE_SNIPPETS } from '../../assets/CodeSnippets';

// Interface for the joke data structure
interface JokeData {
  id: string;
  value: string;
  url: string;
  created_at: string;
  updated_at: string;
  categories: string[];
}

// Async function to fetch joke data
const fetchJoke = async (): Promise<JokeData> => {
  const url = 'https://api.chucknorris.io/jokes/random';
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to fetch joke');
  }
  return res.json();
};

// Component using the `use()` hook to fetch and display a joke
const JokeItem: React.FC = () => {
  // Use the `use()` hook to fetch the joke data
  const joke = use(fetchJoke());

  return (
    <div className='bg-[#1B1D25] shadow-md p-4 my-6 rounded-lg text-white'>
      <h2 className='text-xl'>{joke.value}</h2>
    </div>
  );
};

// Wrapper component using Suspense for fallback rendering
const Joke: React.FC = () => {
  return (
    <div className='mt-6 relative mx-8'>
      <Suspense
        fallback={
          <h2 className='text-2xl text-center text-white font-bold mt-5'>Loading...</h2>
        }
      >
        {/* Add meta data for SEO purposes */}
        <title>Chuck Norris Jokes</title>
        <meta name='description' content='Chuck Norris jokes' />
        <meta name='keywords' content='chuck norris, jokes' />

        {/* Render the joke */}
        <JokeItem />
      </Suspense>

      <CodeSnippet string={CODE_SNIPPETS.UseExample1} />
    </div>
  );
};

export { Joke as UseExample1 };