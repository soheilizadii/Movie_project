import "./App.css";
import Layout from "./components/layout/Layout";
import "swiper/css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MoviePage from "./pages/MoviePage";
import UserProvider from "./context/UserProvider";
import Login from "./pages/Login";
import { Toaster } from "react-hot-toast";
import PersonList from "./pages/PersonList";
import Person from "./pages/Person";
import Movies from "./pages/Movies";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <UserProvider>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/movies/page/:page"
                element={<Movies type="movie" />}
              />
              <Route path="/people/page/:page" element={<PersonList />} />
              <Route path="/people/:id" element={<Person />} />
              <Route path="/tv/page/:page" element={<Movies type="tv" />} />
              <Route path="/tv/:id" element={<MoviePage type="tv" />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Login />} />
              <Route path="/movies/:id" element={<MoviePage type="movie" />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Layout>
          <Toaster />
        </UserProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
