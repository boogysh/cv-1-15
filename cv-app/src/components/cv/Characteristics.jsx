import React from "react";
import { useSelector } from "react-redux";

export default function Characteristics() {
  const { t } = useSelector((state) => state.langReducer);

  return (
    <section id="characteristics" className="cv-section">
      <h3 className="h3-cv ">
        {t.characteristics}:
      </h3>
      <div>
        <div className="flex">
          <p className="col3">{t.characteristics_val}</p>
        </div>
      </div>
    </section>
  );
}
