import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import BlogListing from "./pages/BlogListing";
import BlogPostPage from "./pages/BlogPostPage";
import Login from "./pages/Login";
import AdminPage from "./pages/AdminPage";
import PostEditorPage from "./pages/PostEditorPage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<BlogListing />} />
        <Route path="/blog/:slug" element={<BlogPostPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/new" element={<PostEditorPage />} />
        <Route path="/admin/edit/:id" element={<PostEditorPage />} />
      </Routes>
    </Router>
  );
}





