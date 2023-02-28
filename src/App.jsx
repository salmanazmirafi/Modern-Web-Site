import SignUp from "./components/signup/SignUp";
import "react-toastify/dist/ReactToastify.css";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import "./App.css";
import Header from "./components/common/Header/Header";
import Footer from "./components/common/footer/Footer";
import Homepages from "./components/home/Homepages";
import SinglePage from "./components/singlePage/SinglePage";
import Culture from "./components/culture/Culture";

function App() {
  const Layout = () => {
    return (
      <div>
        <Header />
        <div>
          <Outlet />
        </div>
        <Footer />
      </div>
    );
  };
  // const ProtectedRoute = ({ children }) => {
  //   if (!currentUser) {
  //     return <Navigate to="/login" />;
  //   }
  //   return children;
  // };
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Homepages />,
        },
        {
          path: "/singlepage/:id",
          element: <SinglePage />,
        },
        {
          path: "/culture",
          element: <Culture />,
        },
      ],
    },
    {
      path: "/login",
      element: <SignUp />,
    },
  ]);
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
