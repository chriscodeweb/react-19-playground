import { FC } from 'react';
import { Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface CodeSnippetProps {
  string: string;
}

const CodeSnippet: FC<CodeSnippetProps> = ({ string }) => {
  return (
    <>
      <h2 className='mb-4 mt-8 text-white font-bold text-2xl'>Example Code</h2>
      <SyntaxHighlighter 
        showLineNumbers 
        language="jsx" 
        style={oneDark}
      >
        {string}
      </SyntaxHighlighter>
    </>
  );
};

export default CodeSnippet;