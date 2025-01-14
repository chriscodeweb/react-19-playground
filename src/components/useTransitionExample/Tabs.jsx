import { useState, useTransition } from 'react';
import TabButton from './TabButton';
import Tab1 from './Tab1';
import Tab2 from './Tab2';
import Tab3 from './Tab3';

export function Tabs() {
  // `useTransition` provides a mechanism to manage transitions in a non-blocking way
  const [, startTransition] = useTransition();
  const [tab, setTab] = useState('tab1'); // Tracks the currently active tab

  function selectTab(nextTab) {
    // `startTransition` ensures that the UI remains responsive while transitioning
    startTransition(() => {
      setTab(nextTab); // Update the active tab
    });
  }

  return (
    <div className='p-6 relative mx-8 mt-2 bg-[#1B1D25] rounded-2xl'>
      {/* Tab buttons */}
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

      {/* Conditionally render tab content */}
      {tab === 'tab1' && <Tab1 />}
      {tab === 'tab2' && <Tab2 />}
      {tab === 'tab3' && <Tab3 />}
    </div>
  );
}

export { Tabs as UseTransitionExample };
