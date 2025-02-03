import { use, Suspense } from 'react';
import CodeSnippet from '../../layouts/CodeSnippet';
import { CODE_SNIPPETS } from '../../assets/CodeSnippets';

interface Post {
  id: number;
  title: string;
  body: string;
}

// Function to fetch resources with caching
const cache = new Map();

// Function to fetch resources with caching
function fetchResource(url: string): Promise<any> {
  // If the URL is not cached, fetch the data and store the promise in the cache
  if (!cache.has(url)) {
    const promise = fetch(url).then((res) => res.json());
    cache.set(url, promise);
  }

  // Return the cached promise
  return cache.get(url);
}

// Component to display a list of posts
const PostItems: React.FC = () => {
  // Use the new `use()` API to handle the async fetch operation
  const posts: Post[] = use(fetchResource('https://jsonplaceholder.typicode.com/posts'));

  return (
    <ul className='px-8 max-h-[400px] overflow-y-scroll rounded-2xl py-3 bg-[#1B1D25]'>
      {posts.map((post) => (
        <div
          key={post.id}
          className='text-white border shadow-md p-4 my-6 rounded-lg'
        >
          <h2 className='text-xl font-bold'>{post.title}</h2>
          <p>{post.body}</p>
        </div>
      ))}
    </ul>
  );
};

// Component wrapping the list of posts with Suspense for fallback UI
const Posts: React.FC = () => {
  return (
    <div className='mt-6 mx-8 relative'>
      <Suspense
        fallback={
          // Display a loading indicator while the data is being fetched
          <h1 className='text-2xl text-center text-white font-bold mt-5'>Loading...</h1>
        }
      >
        {/* Render the resolved posts */}
        <PostItems />
      </Suspense>
      <CodeSnippet string={CODE_SNIPPETS.UseExample2} />
    </div>
  );
};

export { Posts as UseExample2 };