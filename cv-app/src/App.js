import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Error404 from "./components/errors/Error404";
import CV from "./pages/CV";
import Architecture from "./pages/Architecture";
import Developpement from "./pages/Developpement";
import OneProject from "./pages/OneProject";
import Services from "./pages/Services";
import Building from "./pages/Building";
import Messages from "./pages/Messages";
import { useSelector } from "react-redux";
import Diplomes from "./pages/Diplomes";
// import Test from "./pages/Test.jsx";

function App() {
  const { t } = useSelector((state) => state.langReducer);
  return (
    // <Router basename="/cv/">
    <Router>
      <Header />
      <Routes>
        <Route
          index
          element={<Navigate replace to={`/${t.locale}/${t.archNav}`} />}
        />
        {/* <Route path={`/${t.locale}`} element={<Architecture />} /> */}
        <Route
          path={`/${t.locale}`}
          element={<Navigate replace to={`/${t.locale}/${t.archNav}`} />}
        />
        <Route path={`/defaultsite`} element={<Architecture />} />

        <Route path={`/${t.locale}/${t.archNav}`} element={<Architecture />} />
        <Route
          path={`/${t.locale}/${t.archNav}/:id`}
          element={<OneProject />}
        />
        <Route path={`/${t.locale}/${t.servicesNav}`} element={<Services />} />
        <Route
          path={`/${t.locale}/${t.servicesNav}/:id`}
          element={<OneProject />}
        />
        <Route path={`/${t.locale}/${t.batNav}`} element={<Building />} />
        <Route path={`/${t.locale}/${t.batNav}/:id`} element={<OneProject />} />
        <Route path={`/${t.locale}/${t.devNav}`} element={<Developpement />} />
        <Route path={`/${t.locale}/cv`} element={<CV />} />
        <Route path={`/${t.locale}/messages`} element={<Messages />} />
        <Route path={`/${t.locale}/diplomes`} element={<Diplomes />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
