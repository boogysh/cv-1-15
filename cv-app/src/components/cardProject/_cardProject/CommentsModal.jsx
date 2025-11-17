// CommentsModal.jsx
import { MdClose } from "react-icons/md";
import NewComment from "./NewComment";
import Comments from "./Comments";
import RateBtn from "./RateBtn";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setProjectData } from "../../../redux/projectActions";
import formatProjectsForRedux from "../../../utils/helperRedux";

const CommentsModal = ({ setShowComments, id }) => {
  const dispatch = useDispatch();
  const { ip, comments, myIpList, ratingRedux } = useSelector(
    (state) => state.projectReducer || {}
  );
  const { t } = useSelector((state) => state.langReducer || {});

  const handleModalClose = () => setShowComments(false);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/projects");
        if (!res.ok) return;

        const data = await res.json();
        const projectsArray = Array.isArray(data) ? data : data.projects || [];

        const reduxPayload = formatProjectsForRedux(projectsArray, ip, myIpList);

        // 🔥 FIX : on ne touche PAS à ratingRedux
        dispatch(
          setProjectData({
            ...reduxPayload,
            ratingRedux: ratingRedux, // ⬅️ conserve la note en cours
          })
        );
      } catch (err) {
        console.error("Erreur fetch projects dans modal :", err);
      }
    };

    fetchProjects();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]); // On refetch uniquement pour ce projet

  return (
    <div className="bg-black/70 fixed z-50 inset-0 flex justify-center items-center">
      <div className="w-[90%] md:w-[70%] h-auto bg-white rounded-[20px] overflow-hidden">
        {/* HEADER */}
        <div className="flex justify-center items-center py-3 px-5 border-b">
          <h2 className="text-2xl md:text-3xl font-medium text-center">
            {t?.comments || "Commentaires"}
          </h2>
          <button onClick={handleModalClose} className="btn-icon ml-auto">
            <MdClose className="w-5 h-5" />
          </button>
        </div>

        {/* COMMENTS LIST */}
        <div className="p-2 h-[400px] overflow-y-auto">
          {comments?.[id]?.length > 0 ? (
            <Comments comments={comments[id]} />
          ) : (
            <p className="pl-3 text-sm md:text-base">La liste est vide</p>
          )}
        </div>

        {/* RATING */}
        <div className="flex flex-col items-center py-3">
          <h2 className="text-2xl font-semibold mb-2">Évaluez ce projet !</h2>
          <RateBtn id={id} />
        </div>

        {/* NEW COMMENT */}
        <div className="p-3 border-t">
          <NewComment id={id} />
        </div>
      </div>
    </div>
  );
};

export default CommentsModal;
