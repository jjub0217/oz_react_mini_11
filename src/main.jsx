import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App.jsx";
import Layout from "./components/Layout.jsx";
import { MovieDetail } from "./components/MovieDetail.jsx";
import "./index.css";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<App IMAGE_BASE_URL={IMAGE_BASE_URL} />} />
        <Route
          path={`/detail/:id`}
          element={<MovieDetail IMAGE_BASE_URL={IMAGE_BASE_URL} />}
        />
      </Route>
    </Routes>
  </BrowserRouter>
);
