import ListPictures from "../components/ListPictures";
import Dropdown from "../components/Dropdown";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export default function OneProject() {
  const { t } = useSelector((state) => state.langReducer);
  const { id } = useParams();
  const hrefArch = window.location.href.includes(t.archNav);
  const hrefBat = window.location.href.includes(t.batNav);
  const hrefServ = window.location.href.includes(t.servicesNav);

  let data;

  hrefArch && (data = t.cardArch.find((product) => product.id === id));
  hrefBat && (data = t.cardBat.find((product) => product.id === id));
  hrefServ && (data = t.cardServices.find((product) => product.id === id));

  console.log("data", data);
  const { pictures, title, info } = data;
  return (
    <main className="bg-[--bg_body] flex flex-col items-center main-scroll">
      <div className="text-center mx-auto  w-auto mb-[15px] xs:mb-[30px]">
        <Dropdown title={title} classTitle="h3_DD" content={info} />
      </div>
      <ListPictures pictures={pictures} />
    </main>
  );
}
