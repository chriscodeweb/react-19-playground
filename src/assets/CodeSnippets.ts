export const CODE_SNIPPETS = {
  action1: `import { useState } from 'react';
  
  interface Post {
  title: string;
  body: string;
}

// Component for displaying individual posts
const PostItem = ({ post }: { post: Post }) => {
  return (
    <div className='bg-[#1B1D25] text-white shadow-md p-6 my-6 rounded-2xl'>
      {/* Post title */}
      <h2 className='text-xl font-bold capitalize'>{post.title}</h2>
      {/* Post body */}
      <p>{post.body}</p>
    </div>
  );
};

// Component for adding new posts
interface PostFormProps {
  addPost: (newPost: Post) => void;
}

const PostForm = ({ addPost }: PostFormProps) => {
  // formAction handles the form submission and calls addPost with the new post data
  const formAction = async (formData: FormData) => {
    const newPost: Post = {
      title: formData.get('title') as string,
      body: formData.get('body') as string,
    };

    // Ensure both fields are filled out before adding the post
    if (newPost.title && newPost.body) {
      addPost(newPost);
    } else {
      console.warn('Both title and body are required to create a post.');
    }
  };

  return (
    <form
      action={formAction}
      className='bg-[#1B1D25] shadow-md px-8 pt-6 pb-8 mb-4 mt-6 rounded-2xl relative'
    >
      {/* Input field for post title */}
      <div className='mb-4'>
        <label
          className='block text-white text-sm font-bold mb-2'
          htmlFor='title'
        >
          Title
        </label>
        <input
          className='shadow appearance-none border rounded w-full py-2 px-3 bg-[#1B1D25] text-white leading-tight focus:outline-none focus:shadow-outline'
          id='title'
          type='text'
          placeholder='Enter title'
          name='title'
        />
      </div>

      {/* Textarea for post body */}
      <div className='mb-6'>
        <label
          className='block text-white text-sm font-bold mb-2'
          htmlFor='body'
        >
          Body
        </label>
        <textarea
          className='shadow appearance-none border rounded w-full py-2 px-3 bg-[#1B1D25] text-white leading-tight focus:outline-none focus:shadow-outline'
          id='body'
          rows={5}
          placeholder='Enter body'
          name='body'
        ></textarea>
      </div>

      {/* Submit button */}
      <div className='flex items-center justify-between'>
        <button
          className='bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline'
          type='submit'
        >
          Submit
        </button>
      </div>
    </form>
  );
};

// Main component to manage and display posts
const Posts = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  // Adds a new post to the list
  const addPost = (newPost: Post) => {
    setPosts((prevPosts) => [...prevPosts, newPost]);
  };

  return (
    <div className='relative mx-8 mt-6'>
      <div>
        {/* Form to create new posts */}
        <PostForm addPost={addPost} />

        {/* List of posts */}
        {posts.map((post, index) => (
          <PostItem key={index} post={post} />
        ))}
      </div>
    </div>
  );
};

export { Posts as ActionExample1};`,

  action2: `import { useState } from 'react';

// React 19 introduces an updated formAction prop, allowing developers to handle form submissions natively.
// This ensures a more declarative approach while reducing the need for manual event listeners or handling.

// Interface for Cart Item
interface CartItem {
  id: string;
  title: string;
}

// Component for displaying cart contents
const CartDisplay = ({ cart }: { cart: CartItem[] }) => {
  // Early return ensures no unnecessary DOM rendering for an empty cart
  if (cart.length === 0) {
    return null;
  }

  return (
    <div className='px-8 text-indigo-300'>
      <h2 className='text-xl font-bold my-4'>Your Cart</h2>
      <ul>
        {cart.map((item, index) => (
          <li key={index}>{item.title}</li>
        ))}
      </ul>
      <hr className='my-4' />
    </div>
  );
};

// Interface for AddToCartForm Props
interface AddToCartFormProps {
  id: string;
  title: string;
  addToCart: (formData: FormData, title: string) => Promise<{ id: string }>;
}

// Component for adding items to the cart
const AddToCartForm = ({ id, title, addToCart }: AddToCartFormProps) => {
  // The formAction function receives form data directly, enabling modern handling of form submissions.
  const formAction = async (formData: FormData) => {
    try {
      await addToCart(formData, title);
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };

  return (
    <form
      action={formAction}
      className='bg-[#1B1D25] border shadow-md text-white rounded-2xl px-8 pt-6 pb-8 mb-4 relative mt-6 mx-8'
    >
      <h2 className='text-xl font-bold mb-4'>{title}</h2>
      {/* Hidden input ensures item ID is included in formData */}
      <input type='hidden' name='itemID' value={id} />
      <button
        type='submit'
        className='bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline'
      >
        Add to Cart
      </button>
    </form>
  );
};

// Main component managing the shopping cart
const ShoppingCart = () => {
  const [cart, setCart] = useState<CartItem[]>([]);

  // React 19 promotes the use of async logic in state-updating functions for smoother UX
  const addToCart = async (formData: FormData, title: string): Promise<{ id: string }> => {
    const id = String(formData.get('itemID'));

    // Simulate an asynchronous API call with a delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Append the new item to the cart
    setCart((prevCart) => [...prevCart, { id, title }]);

    return { id }; // Return object for potential additional handling
  };

  return (
    <div className="relative mx-8 mt-6">
      <div className='bg-[#1B1D25] py-6 px-2 rounded-2xl'>
        {/* Display current cart contents */}
        <CartDisplay cart={cart} />

        {/* Example forms for adding items to the cart */}
        <AddToCartForm
          id='1'
          title='JavaScript: The Good Parts'
          addToCart={addToCart}
        />
        <AddToCartForm
          id='2'
          title='5000 V-Bucks Gift Card'
          addToCart={addToCart}
        />
      </div>
    </div>
  );
};

export { ShoppingCart as ActionExample2 };`,

  use1: `import { use, Suspense } from 'react';

interface Joke {
  value: string;
}

const fetchData = (() => {
  const cache = new Map<string, Joke>();

  return async (): Promise<Joke> => {
    const url = 'https://api.chucknorris.io/jokes/random';

    if (cache.has(url)) {
      return cache.get(url)!;
    }

    const res = await fetch(url, { cache: 'no-store' });
    const data = await res.json();
    cache.set(url, data);
    return data;
  };
})();

const JokeItem = () => {
  const joke = use(fetchData());
  return (
    <div className='bg-[#1B1D25] shadow-md p-4 my-6 rounded-lg mt-12 relative mx-8 text-white'>
      <h2 className='text-xl'>{joke.value}</h2>
    </div>
  );
};

const Joke = () => {
  return (
    <Suspense fallback={<h2 className='text-2xl text-center font-bold mt-5'>Loading...</h2>}>
      <title>Chuck Norris Jokes</title>
      <meta name='description' content='Chuck Norris jokes' />
      <meta name='keywords' content='chuck norris, jokes' />
      <JokeItem />
    </Suspense>
  );
};

export { Joke as UseExample1 };`,
  use2: `import { use, Suspense } from 'react';

interface Post {
  id: number;
  title: string;
  body: string;
}

const fetchResource = (url: string) => {
  const cache = new Map<string, Promise<Post[]>>();

  if (!cache.has(url)) {
    const promise = fetch(url).then((res) => res.json());
    cache.set(url, promise);
  }

  return cache.get(url)!;
};

const PostItems = () => {
  const posts = use(fetchResource('https://jsonplaceholder.typicode.com/posts'));

  return (
    <ul className='px-8 max-h-[400px] overflow-y-scroll rounded-2xl py-3 mt-12 mx-8 relative bg-[#1B1D25]'>
      {posts.map((post) => (
        <div key={post.id} className='text-white border shadow-md p-4 my-6 rounded-lg'>
          <h2 className='text-xl font-bold'>{post.title}</h2>
          <p>{post.body}</p>
        </div>
      ))}
    </ul>
  );
};

const Posts = () => {
  return (
    <Suspense fallback={<h1 className='text-2xl text-center font-bold mt-5'>Loading...</h1>}>
      <PostItems />
    </Suspense>
  );
};

export { Posts as UseExample2 };`,
  use3: `import { use, useState, Suspense } from 'react';

const MessageOutput = ({ messagePromise }: { messagePromise: Promise<string> }) => {
  const messageContent = use(messagePromise);
  return (
    <p className='text-xl relative text-white bg-[#1B1D25] w-fit p-6 rounded-lg shadow-md'>
      Here is the message: {messageContent}
    </p>
  );
};

const MessageContainer = ({ messagePromise }: { messagePromise: Promise<string> }) => {
  return (
    <Suspense fallback={<p className='text-xl text-white'>⌛ Downloading message...</p>}>
      <MessageOutput messagePromise={messagePromise} />
    </Suspense>
  );
};

const Message = () => {
  const [messagePromise, setMessagePromise] = useState<Promise<string> | null>(null);
  const [show, setShow] = useState(false);

  const download = () => {
    setMessagePromise(fetchMessage());
    setShow(true);
  };

  return (
    <div className='relative mx-8 mt-6 flex justify-center items-center bg-[#1B1D25] p-12 rounded-2xl'>
      {show ? (
        <MessageContainer messagePromise={messagePromise!} />
      ) : (
        <button
          className='bg-indigo-500 text-white font-bold py-2 px-4 rounded-full'
          onClick={download}
        >
          Download message
        </button>
      )}
    </div>
  );
};

const fetchMessage = (): Promise<string> => {
  return new Promise((resolve) => setTimeout(resolve, 1000, '⚛️'));
};

export { Message as UseExample3 };`,
  use4: `import { createContext, useState, use, ReactNode } from 'react';

interface ThemeContextType {
  theme: string;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

const ThemedCard = () => {
  const { theme, toggleTheme } = use(ThemeContext)!;

  return (
    <div className={\`relative mt-6 mx-8 shadow-md rounded-lg p-6 \${theme === 'light' ? 'bg-white' : 'bg-[#1B1D25]'}\`}>
      <h1 className={\`text-2xl mb-3 \${theme === 'light' ? 'text-gray-800' : 'text-white'}\`}>
        Themed Card
      </h1>
      <p className={theme === 'light' ? 'text-gray-800' : 'text-white'}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </p>
      <button
        onClick={toggleTheme}
        className='mt-4 px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600'
      >
        {theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
      </button>
    </div>
  );
};

const Theme = () => {
  return (
    <ThemeProvider>
      <ThemedCard />
    </ThemeProvider>
  );
};

export { Theme as UseExample4 };`,
  useActionState: `import { useActionState } from 'react';

interface FormState {
  message: string;
  status: 'success' | 'failure';
}

const addToCart = (prevState: FormState | null, queryData: FormData): FormState => {
  const itemID = queryData.get('itemID');

  if (itemID === '1') {
    return { message: 'Added to cart!', status: 'success' };
  } else {
    return { message: 'Out of stock!', status: 'failure' };
  }
};

const AddToCartForm = ({ itemID, itemTitle }: { itemID: string; itemTitle: string }) => {
  const [formState, formAction] = useActionState(addToCart, null);

  return (
    <form
      action={formAction}
      className='bg-[#1B1D25] border shadow-md text-white rounded-2xl px-8 pt-6 pb-4 mb-4 relative mt-6 mx-8'
    >
      <h2 className='text-xl font-bold mb-4'>{itemTitle}</h2>
      <input type='hidden' name='itemID' value={itemID} />
      <button
        type='submit'
        className='bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline'
      >
        Add to Cart
      </button>
      <div className={\`mt-4 text-sm \${formState?.status === 'success' ? 'text-green-400' : 'text-red-400'}\`}>
        {formState?.message}
      </div>
    </form>
  );
};

export default AddToCartForm;`,
  useDeferredValue: `import { useState, useDeferredValue } from 'react';

const SearchResults = ({ searchTerm }: { searchTerm: string }) => {
  const deferredSearchTerm = useDeferredValue(searchTerm);

  const filteredResults = items.filter((item) =>
    item.toLowerCase().includes(deferredSearchTerm.toLowerCase())
  );

  return (
    <ul className="max-h-[200px] overflow-y-scroll bg-[#1B1D25] text-white p-4 rounded-lg">
      {filteredResults.map((result, index) => (
        <li key={index} className="py-1 border-b border-gray-500">
          {result}
        </li>
      ))}
    </ul>
  );
};

const SearchBox = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="p-6 bg-[#1B1D25] rounded-2xl text-white relative mx-8 mt-6">
      <h2 className="text-2xl mb-4">Search Items</h2>
      <input
        type="text"
        placeholder="Type to search..."
        className="w-full p-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:border-indigo-500"
        onChange={handleInputChange}
        value={searchTerm}
      />
      <SearchResults searchTerm={searchTerm} />
    </div>
  );
};

const items = [
  'Apple',
  'Banana',
  'Orange',
  'Grapes',
  'Pineapple',
  'Mango',
  'Blueberry',
  'Strawberry',
];

export { SearchBox as UseDeferredValueExample };`,
  useFormStatus: `import { useFormStatus } from 'react-dom';
import { useState } from 'react';

interface Post {
  title: string;
  body: string;
}

const PostItem = ({ post }: { post: Post }) => {
  return (
    <div className='bg-blue-50 shadow-md p-4 my-6 rounded-lg'>
      <h2 className='text-xl font-bold'>{post.title}</h2>
      <p>{post.body}</p>
    </div>
  );
};

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <button
      className='bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline'
      type='submit'
      disabled={pending}
    >
      {pending ? 'Submitting...' : 'Submit'}
    </button>
  );
};

const PostForm = ({ addPost }: { addPost: (newPost: Post) => void }) => {
  const formAction = async (formData: FormData) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const newPost = {
      title: String(formData.get('title')),
      body: String(formData.get('body')),
    };

    addPost(newPost);
  };

  return (
    <form
      action={formAction}
      className='bg-[#1B1D25] shadow-md rounded-2xl px-8 pt-6 pb-8 mb-4 relative mt-6 mx-8'
    >
      <div className='mb-4'>
        <label className='block text-white text-sm font-bold mb-2' htmlFor='title'>
          Title
        </label>
        <input
          className='shadow appearance-none border rounded w-full py-2 px-3 bg-[#1B1D25] text-white leading-tight focus:outline-none focus:shadow-outline'
          id='title'
          type='text'
          placeholder='Enter title'
          name='title'
        />
      </div>

      <div className='mb-6'>
        <label className='block text-white text-sm font-bold mb-2' htmlFor='body'>
          Body
        </label>
        <textarea
          className='shadow appearance-none border rounded w-full py-2 px-3 bg-[#1B1D25] text-white leading-tight focus:outline-none focus:shadow-outline'
          id='body'
          rows='5'
          placeholder='Enter body'
          name='body'
        ></textarea>
      </div>

      <div className='flex items-center justify-between'>
        <SubmitButton />
      </div>
    </form>
  );
};

const Posts = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  const addPost = (newPost: Post) => {
    setPosts((posts) => [...posts, newPost]);
  };

  return (
    <>
      <PostForm addPost={addPost} />
      {posts.map((post, index) => (
        <PostItem key={index} post={post} />
      ))}
    </>
  );
};

export { Posts as UseFormStatusExample };`,
  useOptimistic: `import { useOptimistic, useState, useRef } from 'react';

interface Message {
  text: string;
  sending?: boolean;
}

const MessageForm = ({
  addOptimisticMessage,
  sendMessage,
}: {
  addOptimisticMessage: (message: string) => void;
  sendMessage: (formData: FormData) => Promise<void>;
}) => {
  const formRef = useRef<HTMLFormElement>(null);

  const formAction = async (formData: FormData) => {
    addOptimisticMessage(String(formData.get('message')));
    formRef.current?.reset();
    await sendMessage(formData);
  };

  return (
    <form action={formAction} ref={formRef} className='flex items-center mb-5'>
      <input
        type='text'
        name='message'
        placeholder='Hello!'
        className='border bg-[#1B1D25] text-white rounded py-1 px-2 mr-2 focus:outline-none focus:border-indigo-500'
      />
      <button
        type='submit'
        className='bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-1 px-4 rounded-full focus:outline-none focus:shadow-outline'
      >
        Send
      </button>
    </form>
  );
};

const Thread = ({
  messages,
  sendMessage,
}: {
  messages: Message[];
  sendMessage: (formData: FormData) => Promise<void>;
}) => {
  const [optimisticMessages, addOptimisticMessage] = useOptimistic(
    messages,
    (state, newMessage: string) => [
      ...state,
      { text: newMessage, sending: true },
    ]
  );

  return (
    <div className='relative mx-8 mt-6 bg-[#1B1D25] p-6 rounded-2xl'>
      <MessageForm
        addOptimisticMessage={addOptimisticMessage}
        sendMessage={sendMessage}
      />
      <span className='text-white'>Latest Messages:</span>
      {optimisticMessages.map((message, index) => (
        <div key={index} className='flex items-center'>
          <span className="text-white bg-indigo-500 mb-2 py-2 px-4 rounded-2xl max-w-[30ch] break-all">
            {message.text}
          </span>
          {message.sending && (
            <small className='ml-1 text-gray-500'>(Sending...)</small>
          )}
        </div>
      ))}
    </div>
  );
};

const deliverMessage = async (message: string): Promise<string> => {
  await new Promise((res) => setTimeout(res, 1000));
  return message;
};

const MessageBox = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  const sendMessage = async (formData: FormData) => {
    const sentMessage = await deliverMessage(String(formData.get('message')));
    setMessages((messages) => [...messages, { text: sentMessage }]);
  };

  return <Thread messages={messages} sendMessage={sendMessage} />;
};

export { MessageBox as UseOptimisticExample };`,
  useTransition: `import { useState, useTransition, memo } from 'react';

const TabButton = ({
  children,
  isActive,
  onClick,
}: {
  children: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}) => {
  if (isActive) {
    return <div className='text-indigo-600'>{children}</div>;
  }
  return (
    <button className="text-white" onClick={onClick}>
      {children}
    </button>
  );
};

const Tab1 = () => {
  return <div className="text-white">This is Tab 1</div>;
};

const Tab2 = memo(function Tab2() {
  const items = [];
  for (let i = 0; i < 500; i++) {
    items.push(<Post key={i} index={i} />);
  }
  return <ul className='items max-h-[400px] overflow-y-auto'>{items}</ul>;
});

const Tab3 = () => {
  return <div className="text-white">This is Tab 3</div>;
};

const Post = ({ index }: { index: number }) => {
  let startTime = performance.now();
  while (performance.now() - startTime < 1) {}

  return <li className='item text-white'>Post {index + 1}</li>;
};

const Tabs = () => {
  const [, startTransition] = useTransition();
  const [tab, setTab] = useState('tab1');

  const selectTab = (nextTab: string) => {
    startTransition(() => {
      setTab(nextTab);
    });
  };

  return (
    <div className='p-6 relative mx-8 mt-2 bg-[#1B1D25] rounded-2xl'>
      <div className='flex space-x-4 mb-4'>
        <TabButton isActive={tab === 'tab1'} onClick={() => selectTab('tab1')}>
          Tab One
        </TabButton>
        <TabButton isActive={tab === 'tab2'} onClick={() => selectTab('tab2')}>
          Tab 2 (slow)
        </TabButton>
        <TabButton isActive={tab === 'tab3'} onClick={() => selectTab('tab3')}>
          Tab 3
        </TabButton>
      </div>

      <hr className='mb-4' />

      {tab === 'tab1' && <Tab1 />}
      {tab === 'tab2' && <Tab2 />}
      {tab === 'tab3' && <Tab3 />}
    </div>
  );
};

export { Tabs as UseTransitionExample };`
};