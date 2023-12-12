import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Error404 from "./components/errors/Error404";
import Home from "./pages/Home";
import Architecture from "./pages/Architecture";
import Developpement from "./pages/Developpement";
import OneProject from "./pages/OneProject";
import Building from "./pages/Building";
import { useSelector } from "react-redux";
// import Test from "./pages/Test.jsx";

function App() {
  const { t } = useSelector((state) => state.langReducer);
  return (
    // <Router basename="/cv/">
    <Router>
      <Header />
      <Routes>
        <Route index element={<Navigate replace to={t.localeNav} />} />
        <Route path={`/${t.locale}`} element={<Home />} />
        <Route path={`/${t.locale}/defaultsite`} element={<Home />} />
        <Route path={`/defaultsite`} element={<Home />} />
        {/* <Route path={`/test`} element={<Test />} /> */}
        <Route path={`/${t.locale}/${t.archNav}`} element={<Architecture />} />
        <Route
          path={`/${t.locale}/${t.archNav}/:id`}
          element={<OneProject />}
        />
        <Route path={`/${t.locale}/${t.batNav}`} element={<Building />} />
        <Route path={`/${t.locale}/${t.batNav}/:id`} element={<OneProject />} />
        <Route path={`/${t.locale}/${t.devNav}`} element={<Developpement />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
