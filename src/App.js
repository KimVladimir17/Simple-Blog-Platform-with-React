import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Import My Pages
import RootLayout from "./layouts/RootLayouts";
import ArticleListPage from "./pages/article/ArticleList";
import ArticleDetailPage from "./pages/article/ArticleDetail";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import EditUserData from "./pages/EditUserData";
import { AuthProvider } from "./contexts/AuthContext";
import CreateNewArticle from "./pages/article/CreateNewArticle";
import EditArticle from "./pages/article/EditArticle";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/articles" element={<RootLayout />}>
            <Route
              path="/articles/page:pageNumber"
              element={<ArticleListPage />}
            />
            <Route path="/articles/:slug" element={<ArticleDetailPage />} />
            <Route path="/articles/:slug/edit" element={<EditArticle />} />
            <Route
              path="/articles/create-new-article"
              element={<CreateNewArticle />}
            />
            <Route path="/articles/edit-profile" element={<EditUserData />} />
            <Route path="/articles/sign-in" element={<SignIn />} />
            <Route path="/articles/sign-up" element={<SignUp />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
