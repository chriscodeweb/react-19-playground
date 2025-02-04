import { useOptimistic, useState, useRef } from 'react';
import CodeSnippet from '../../layouts/CodeSnippet';
import { CODE_SNIPPETS } from '../../assets/CodeSnippets';

// Define the type for a message
type Message = {
  text: string;
  sending?: boolean;
};

// Define the props for the MessageForm component
type MessageFormProps = {
  addOptimisticMessage: (message: string) => void;
  sendMessage: (formData: FormData) => Promise<void>;
};

// Form component for sending messages
const MessageForm: React.FC<MessageFormProps> = ({ addOptimisticMessage, sendMessage }) => {
  const formRef = useRef<HTMLFormElement>(null); // Ref to reset the form after submission

  const formAction = async (formData: FormData) => {
    // Add an optimistic message to the UI immediately
    addOptimisticMessage(formData.get('message') as string);

    // Reset the form input
    if (formRef.current) {
      formRef.current.reset();
    }

    // Send the actual message (simulate async operation)
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

// Define the props for the Thread component
type ThreadProps = {
  messages: Message[];
  sendMessage: (formData: FormData) => Promise<void>;
};

// Thread component to display messages with optimistic updates
const Thread: React.FC<ThreadProps> = ({ messages, sendMessage }) => {
  // `useOptimistic` maintains an optimistic state for the messages
  // Takes the initial state (`messages`) and a reducer function
  const [optimisticMessages, addOptimisticMessage] = useOptimistic(
    messages,
    (state: Message[], newMessage: string) => [
      ...state,
      {
        text: newMessage, // Optimistic text
        sending: true, // Flag to indicate the message is still being sent
      },
    ]
  );

  return (
    <div className='bg-[#1B1D25] p-6 rounded-2xl'>
      <MessageForm
        addOptimisticMessage={addOptimisticMessage}
        sendMessage={sendMessage}
      />
      <span className='text-white'>Latest Messages:</span>
      {optimisticMessages.map((message, index) => (
        <div key={index} className='flex items-center'>
          <span className="text-white bg-indigo-500 mb-2 py-2 px-4 rounded-2xl max-w-[30ch] break-all">{message.text}</span>
          {message.sending && (
            <small className='ml-1 text-gray-500'>(Sending...)</small>
          )}
        </div>
      ))}
    </div>
  );
};

// Simulates the delivery of a message (mock API call)
const deliverMessage = async (message: string): Promise<string> => {
  await new Promise((res) => setTimeout(res, 1000)); // Simulate delay
  return message; // Return the sent message
};

// Main component managing messages
const MessageBox: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]); // State to store actual messages

  // Function to send a message
  async function sendMessage(formData: FormData) {
    const sentMessage = await deliverMessage(formData.get('message') as string);

    // Update the actual state with the sent message
    setMessages((messages) => [...messages, { text: sentMessage }]);
  }

  return (
    <div className='mx-8 mt-6 relative'>
      <Thread messages={messages} sendMessage={sendMessage} />

      <CodeSnippet string={CODE_SNIPPETS.UseOptimisticExample} />
    </div>
  );
};

export { MessageBox as UseOptimisticExample };