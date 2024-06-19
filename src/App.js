import "tailwindcss/dist/base.css";
import "styles/globalStyles.css";
import React from "react";
import BlogIndex from "pages/BlogIndex";
import Blog from "pages/Blog";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CreateBlog from "pages/CreateBlog";


export default function App() {

  return (
    <Router>
      <Switch>
        <Route path="/blog/:id">
          <Blog />
        </Route>
        <Route path="/create">
          <CreateBlog />
        </Route>
        <Route path="/">
          <BlogIndex />
        </Route>
      </Switch>
    </Router>
  );

}
