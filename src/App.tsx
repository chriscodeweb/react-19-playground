import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom';
import HomePage from './components/HomePage';
// import { UseFormStatusExample } from './components/useFormStatusExample/Posts';
// import AddToCartForm from './components/useActionStateExample/AddToCartForm';
// import { UseOptimisticExample } from './components/useOptimisticExample/Message';
// import { UseTransitionExample } from './components/useTransitionExample/Tabs';
// import MainLayout from './layouts/MainLayout';
// import { UseDeferredValueExample } from './components/useDefferedValueExample/SearchResults';
import CodeSnippet from './layouts/CodeSnippet';
import { CODE_SNIPPETS } from './assets/CodeSnippets';
import MainLayout from './layouts/MainLayout';
import { ActionExample1 } from './components/actionExample/Posts';
import { ActionExample2 } from './components/actionExample/ShoppingCart';

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path='actions/1' element={<ActionExample1 />} />
        <Route path='actions/2' element={<ActionExample2 />} />
        {/* <Route path='use/1' element={<UseExample1 />} /> */}
        {/* <Route path='use/2' element={<UseExample2 />} /> */}
        {/* <Route path='use/3' element={<UseExample3 />} />
        <Route path='use/4' element={<UseExample4 />} /> }
        {<Route
          path='useformstatus'
          element={<UseFormStatusExample />}
        />
        <Route
          path='useActionState'
          element={
            <div className="relative mx-8 mt-6">
              <div className='bg-[#1B1D25] rounded-2xl py-6 px-2'>
                <AddToCartForm
                  itemID='1'
                  itemTitle='JavaScript: The Good Parts'
                />
                <AddToCartForm
                  itemID='2'
                  itemTitle='5000 V-Bucks Gift Card'
                />

              </div>

              <CodeSnippet string={CODE_SNIPPETS.useActionState} />
            </div>
          }
        />
        <Route
          path='usedeferredvalue'
          element={<UseDeferredValueExample />}
        />
        <Route
          path='useoptimistic'
          element={<UseOptimisticExample />}
        />
        <Route
          path='usetransition'
          element={<UseTransitionExample />}
        /> */}
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;
