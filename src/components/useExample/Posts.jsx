import { use, Suspense } from 'react';

// Function to fetch resources with caching
const fetchResource = (url) => {
  // Utilize a cache to prevent redundant fetches
  const cache = fetchResource.cache || (fetchResource.cache = new Map());

  // If the URL is not cached, fetch the data and store the promise in the cache
  if (!cache.has(url)) {
    const promise = fetch(url).then((res) => res.json());
    cache.set(url, promise);
  }

  // Return the cached promise
  return cache.get(url);
};

// Component to display a list of posts
const PostItems = () => {
  // Use the new `use()` API to handle the async fetch operation
  const posts = use(fetchResource('https://jsonplaceholder.typicode.com/posts'));

  return (
    <ul className='px-8 max-h-[400px] overflow-y-scroll rounded-2xl py-3 mt-12 mx-8 relative bg-[#1B1D25]'>
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
const Posts = () => {
  return (
    <Suspense
      fallback={
        // Display a loading indicator while the data is being fetched
        <h1 className='text-2xl text-center font-bold mt-5'>Loading...</h1>
      }
    >
      {/* Render the list of posts */}
      <PostItems />
    </Suspense>
  );
};

export { Posts as UseExample2 };
