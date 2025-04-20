import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ArticleListPage from "./pages/ArticleListPage";
import "./App.css";
import RootLayout from "./layouts/RootLayouts";
import ArticleDetailPage from "./pages/ArticleDetailPage";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";

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
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
