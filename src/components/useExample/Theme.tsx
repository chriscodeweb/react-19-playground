import { createContext, useState, useContext, ReactNode } from 'react';
import CodeSnippet from '../../layouts/CodeSnippet';
import { CODE_SNIPPETS } from '../../assets/CodeSnippets';

// Define the type for the theme context
type ThemeContextType = {
  theme: string;
  toggleTheme: () => void;
};

// Create a context for the theme with an initial value
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Define the props for the ThemeProvider component
interface ThemeProviderProps {
  children: ReactNode;
}

// Theme provider to manage and provide the current theme
const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState<string>('light'); // Initial theme is 'light'

  // Toggle between 'light' and 'dark' themes
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to consume the theme context
const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// Component using `useTheme` to consume the theme context
const ThemedCard = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div
      className={`shadow-md rounded-lg p-6 ${
        theme === 'light' ? 'bg-white' : 'bg-[#1B1D25]'
      }`}
    >
      {/* Dynamic styling based on the current theme */}
      <h1
        className={`text-2xl mb-3 ${
          theme === 'light' ? 'text-gray-800' : 'text-white'
        }`}
      >
        Themed Card
      </h1>
      <p className={theme === 'light' ? 'text-gray-800' : 'text-white'}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non neque
        libero. Nullam mattis metus a sapien tempor, sit amet mollis est
        facilisis. Phasellus nec turpis nec dui venenatis vestibulum. Sed
        dapibus dapibus justo, at rhoncus risus malesuada vel. Proin eget leo id
        mi ullamcorper rhoncus.
      </p>
      {/* Button to toggle theme */}
      <button
        onClick={toggleTheme}
        className='mt-4 px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600'
      >
        {theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
      </button>
    </div>
  );
};

// Main component rendering the theme provider and themed card
const Theme = () => {
  return (
    <div className='relative mt-6 mx-8'>
      <ThemeProvider>
        <ThemedCard />
      </ThemeProvider>

      <CodeSnippet string={CODE_SNIPPETS.UseExample4} />
    </div>
  );
};

export { Theme as UseExample4 };