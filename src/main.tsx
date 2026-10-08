
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./components/App"
import LoginPage from "./components/pages/LoginPage.tsx"
import PrimaryPage from "./components/pages/PrimaryPage"
import ProjectPage from "./components/pages/ProjectPage"
import CompetencesPage from "./components/pages/CompetencesPage.tsx";
import React from "react";
import ReactDOM from 'react-dom/client';
import ContactPage from "./components/pages/ContactsPage.tsx";
import SnakePage from "./components/pages/SnakePage.tsx";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <PrimaryPage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "projects",
        element: <ProjectPage />,
      },
      {
        path: 'competences',
        element: <CompetencesPage/>,
      },
    {
      path: 'contacts',
      element: <ContactPage/>,
    },
    {
      path: 'jeux/snake',
      element: <SnakePage/>,
    },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);