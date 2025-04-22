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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route path="/" element={<ArticleListPage />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/articles" element={<ArticleListPage />} />
          <Route path="/articles/:slug" element={<ArticleDetailPage />} />
          <Route path="/edit-profile" element={<EditUserData></EditUserData>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
