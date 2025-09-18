import React from "react";
import { useSelector } from "react-redux";

export default function Experience() {
  const { t } = useSelector((state) => state.langReducer);

  return (
    <section id="experience" className="cv-section">
      <h3 className="h3-cv">{t.experience}:</h3>
      <div>
        <div className="flex">
          <p className="col1">06/2007-08/2007</p>
          <p className="col2 ">{t.internship_1}</p>
        </div>
        <div className="flex">
          <p className="col1">03/2008-05/2008</p>
          <p className="col2">{t.internship_2}</p>
        </div>
        <div className="flex">
          <p className="col1">09/2009-06/2011</p>
          <p className="col2">{t.apprenticeship}</p>
        </div>
        <div className="flex">
          <p className="col1">09/2011-03-2012</p>
          <p className="col2">{t.armanda}</p>
        </div>
        <div className="flex">
          <p className="col1">03/2012-12/2013</p>
          <p className="col2">{t.armanda_2}</p>
        </div>
        <div className="flex">
          <p className="col1">01/2014-12/2014</p>
          <p className="col2">{t.catalan}</p>
        </div>
        <div className="flex">
          <p className="col1">02/2015-01/2022</p>
          <p className="col2">
            {t.heres}<span className="italique">{t.heres_val}</span>
          </p>
        </div>
      </div>
    </section>
  );
}
