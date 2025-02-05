import React, { useState, useEffect, useTransition, memo, ReactNode, useMemo, useCallback, useRef } from 'react';
import CodeSnippet from '../../layouts/CodeSnippet';
import { CODE_SNIPPETS } from '../../assets/CodeSnippets';

enum Tab {
  One = 'TAB_ONE',
  Two = 'TAB_TWO',
  Three = 'TAB_THREE',
}

type TabMetadata = {
  id: Tab;
  label: string;
  component: React.FC;
};

interface TabButtonProps {
  children: ReactNode;
  isActive: boolean;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
}

const TabButton: React.FC<TabButtonProps> = memo(({ 
  children, 
  isActive, 
  onClick, 
  disabled = false,
  className = ''
}) => {
  const baseStyle = 'px-4 py-2 rounded transition-colors duration-200';
  const activeStyle = isActive ? 'text-indigo-600 bg-indigo-100' : 'text-white hover:bg-gray-700';
  const buttonStyle = `${baseStyle} ${activeStyle} ${className}`.trim();

  return (
    <button
      style={{ cursor: disabled ? 'not-allowed' : 'pointer' }}
      className={buttonStyle}
      onClick={onClick}
      disabled={disabled}
      type="button"
      aria-pressed={isActive}
      aria-label={typeof children === 'string' ? children : undefined}
    >
      {children}
    </button>
  );
});

TabButton.displayName = 'TabButton';

const Tab1: React.FC = () => (
  <div style={{ color: 'white', padding: '1rem' }}>This is Tab 1</div>
);

interface PostProps {
  index: number;
  className?: string;
}

const Post: React.FC<PostProps> = memo(({ index, className = '' }) => {
  // Simulate expensive operation
  for (let i = 0; i < 1000000; i++) {
    // Do nothing
  }

  const postStyle = `item text-white ${className}`.trim();
  
  return (
    <li className={postStyle} style={{ height: '50px', padding: '10px' }}>
      Post {index + 1}
    </li>
  );
});

Post.displayName = 'Post';

const Tab2: React.FC = memo(() => {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const totalItems = 500;
  const itemHeight = 50;
  const containerHeight = 400;

  const handleScroll = useCallback(() => {
    if (!containerRef.current) return;

    const scrollTop = containerRef.current.scrollTop;
    const startIndex = Math.floor(scrollTop / itemHeight);
    const endIndex = Math.min(
      startIndex + Math.ceil(containerHeight / itemHeight) + 1,
      totalItems
    );

    const newVisibleItems = Array.from(
      { length: endIndex - startIndex },
      (_, i) => startIndex + i
    );

    setVisibleItems(newVisibleItems);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      handleScroll(); // Initial calculation
    }

    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, [handleScroll]);

  return (
    <div
      ref={containerRef}
      style={{
        height: `${containerHeight}px`,
        overflow: 'auto',
        position: 'relative',
      }}
    >
      <div style={{ height: `${totalItems * itemHeight}px`, position: 'relative' }}>
        {visibleItems.map((index) => (
          <div
            key={index}
            style={{
              position: 'absolute',
              top: `${index * itemHeight}px`,
              width: '100%',
            }}
          >
            <Post index={index} />
          </div>
        ))}
      </div>
    </div>
  );
});

Tab2.displayName = 'Tab2';

const Tab3: React.FC = () => (
  <div style={{ color: 'white', padding: '1rem' }}>This is Tab 3</div>
);

const TAB_CONFIG: Record<Tab, TabMetadata> = {
  [Tab.One]: { id: Tab.One, label: 'Tab One', component: Tab1 },
  [Tab.Two]: { id: Tab.Two, label: 'Tab 2 (slow)', component: Tab2 },
  [Tab.Three]: { id: Tab.Three, label: 'Tab 3', component: Tab3 },
};

export const Tabs: React.FC = () => {
  const [isPending, startTransition] = useTransition();
  const [activeTab, setActiveTab] = useState<Tab>(Tab.One);

  const handleTabChange = useCallback((nextTab: Tab) => {
    if (activeTab !== nextTab) {
      startTransition(() => {
        setActiveTab(nextTab);
      });
    }
  }, [activeTab]);

  const ActiveComponent = TAB_CONFIG[activeTab].component;

  return (
    <div style={{ position: 'relative', margin: '0.5rem 2rem 0' }}>
      <div style={{ 
        padding: '1.5rem', 
        backgroundColor: '#1B1D25', 
        borderRadius: '1rem' 
      }}>
        <div style={{ 
          display: 'flex', 
          gap: '1rem', 
          marginBottom: '1rem' 
        }}>
          {Object.values(TAB_CONFIG).map(({ id, label }) => (
            <TabButton
              key={id}
              isActive={activeTab === id}
              onClick={() => handleTabChange(id)}
              disabled={isPending}
              aria-label={label}
            >
              {label}
            </TabButton>
          ))}
        </div>

        <hr style={{ marginBottom: '1rem' }} />

        {isPending ? (
          <div style={{ color: 'white' }}>Loading...</div>
        ) : (
          <ActiveComponent />
        )}
      </div>

      <CodeSnippet string={CODE_SNIPPETS.UseTransitionExample} />
    </div>
  );
};

export { Tabs as UseTransitionExample };