import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from 'react-router-dom';
import {ActionExample1} from './components/actionExample/Posts';
import {ActionExample2} from './components/actionExample/ShoppingCart';
import HomePage from './components/HomePage';
import {UseActionStateExample} from './components/useActionStateExample/ActionStateExample';
import {UseDeferredValueExample} from './components/useDefferedValueExample/SearchResults';
import {UseExample1} from './components/useExample/Joke';
import {UseExample3} from './components/useExample/Message';
import {UseExample2} from './components/useExample/Posts';
import {UseExample4} from './components/useExample/Theme';
import {UseFormStatusExample} from './components/useFormStatusExample/Posts';
import {UseOptimisticExample} from './components/useOptimisticExample/Message';
import {UseTransitionExample} from './components/useTransitionExample/Tab';
import MainLayout from './layouts/MainLayout';

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="actions/1" element={<ActionExample1 />} />
        <Route path="actions/2" element={<ActionExample2 />} />
        <Route path="use/1" element={<UseExample1 />} />
        <Route path="use/2" element={<UseExample2 />} />
        <Route path="use/3" element={<UseExample3 />} />
        <Route path="use/4" element={<UseExample4 />} />
        <Route path="useformstatus" element={<UseFormStatusExample />} />
        <Route path="useActionState" element={<UseActionStateExample />} />
        <Route path="usedeferredvalue" element={<UseDeferredValueExample />} />
        <Route path="useoptimistic" element={<UseOptimisticExample />} />
        <Route path="usetransition" element={<UseTransitionExample />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;
