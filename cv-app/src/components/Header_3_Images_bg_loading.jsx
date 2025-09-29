import { useState } from "react";

const Header_3_Images_bg_loading = ({ style, bgSmall, bgLarge }) => {
  const [isLoading, setLoading] = useState(false);
  return isLoading ? (
    <div className={`${style} bg-cover bg-center  ${bgSmall}`}>
      <img
        className="none z-[-1]"
        src={bgLarge}
        alt=""
        loading="lazy"
        onLoad={() => setLoading(false)}
      />
    </div>
  ) : (
    <div className={`${style} bg-cover bg-center  ${bgLarge} `}>
      {/* <img
        className="none"
        src={bgLarge}
        alt=""
        onLoad={() => setLoading(false)}
      /> */}
    </div>
  );
};

export default Header_3_Images_bg_loading;
