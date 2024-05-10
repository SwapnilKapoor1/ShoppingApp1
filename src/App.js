import '@fortawesome/fontawesome-free/css/all.css';
import React from 'react';
import Home from './pages/home/home';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Cart from './pages/cart/cart';
import { CustomCart } from './context/cart.context';
import CustomCardContext from './context/card.context';
import { SignIn } from './pages/signIn/login';
import { SignUp } from './pages/signUp/signUp';
import { CustomSignUp } from './context/signup.context';
import { CustomLogIn } from './context/login.context';
import { PrivateRoute } from './components/private';
import { CustomCheck } from './context/check.context';
import { CustomOrder } from './context/order.context';
import Order from './pages/order/order';
import ErrorPage from './pages/error/errorPage';
import { ToastContainer } from 'react-toastify';

function App() {
  const router = createBrowserRouter([
    { path:'/', element: <Navbar/> ,
      children :[
        {index:true,element:<Home/>},
        {path:'cart',
        element:<><PrivateRoute>      
                          <CustomOrder>
                            <Cart/>
                          </CustomOrder>
                  </PrivateRoute></>},
        {path:'orders',
                element:<><PrivateRoute>                  
                          <CustomOrder>
                            <Order/>
                          </CustomOrder>                   
                    </PrivateRoute></>},
        {path:'login',
        element:<>
                    <CustomLogIn>
                          <SignIn/>
                    </CustomLogIn>
                  </>},
        { path:'signup'
          ,element:<>
                        <CustomSignUp>
                          <SignUp/>
                        </CustomSignUp>
                      </>},
        { path:'logout',
          element:<><Cart/></>},
      ],
      errorElement:<ErrorPage/>
    },
  ])
   
  return (
    <>
    <CustomCheck>
        <CustomCardContext>
            <CustomCart>
              <RouterProvider router={router}/>
            </CustomCart>
        </CustomCardContext>
    </CustomCheck>
    <ToastContainer/>
    </>
  );
}

export default App;
