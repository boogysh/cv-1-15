import { v4 as uuidv4 } from "uuid";
import Loader from "../../loader/Loader";
import StarRatingStatic from "./StarRatingStatic";
import { useSelector } from "react-redux";


const Comments = ({ comments }) => {
  const { isLoading } = useSelector((state) => state.projectReducer || {});

  if (isLoading) return <Loader />;
  return (
    <div className="mt-[0.5rem]">
      {comments.map((comment) => (
        <div
          key={comment._id || uuidv4()}
          className="p-1 sm:p-[10px] mt-[15px] mx-2 bg-[#f1f1f1] rounded-[10px]"
        >
          <div className="flex items-center">
            <h3 className="p-2 font-semibold text-sm sm:text-base">
              {comment.lastName} {comment.firstName}
            </h3>
            <span className="text-sm sm:text-base">
              <strong>le:</strong> {comment.createdAt.slice(0, 10)}{" "}
              <strong>à:</strong> {comment.createdAt.slice(11, 19)}
            </span>
          </div>
          <div className="flex pl-2 pb-2">
            <StarRatingStatic rating={comment.rating || 0} size={20} />
          </div>
          <p className="pl-[10px]">{comment.commentTxt}</p>
        </div>
      ))}
    </div>
  );
};

export default Comments;

