import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import My Pages
import RootLayout from "./layouts/RootLayouts";
import ArticleListPage from "./pages/ArticleList";
import ArticleDetailPage from "./pages/ArticleDetail";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import EditUserData from "./pages/EditUserData";
import { AuthProvider } from "./contexts/AuthContext";
import CreateNewArticle from "./pages/CreateNewArticle";
import EditArticle from "./pages/EditArticle";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<RootLayout />}>
            <Route path="/" element={<ArticleListPage />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/articles" element={<ArticleListPage />} />
            <Route path="/articles/:slug" element={<ArticleDetailPage />} />
            <Route
              path="/edit-profile"
              element={<EditUserData></EditUserData>}
            />
            <Route path="/create-new-article" element={<CreateNewArticle />} />
            <Route path="/articles/:slug/edit" element={<EditArticle />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
