 import React from "react";
import { useSelector } from "react-redux";

export default function Studies() {
  const { t } = useSelector((state) => state.langReducer);

  return (
    <section id="studies" className="cv-section "> 
      <h3 className="h3-cv">{t.studies}:</h3>
      <div>
        <div className="flex">
          <p className="col1">1992-2000</p>
          <p className="col2">{t.school}</p>
        </div>
        <div className="flex">
          <p className="col1">2000-2004</p>
          <p className="col2">
            L.R.U.R. <span className="italique">{t.highSchool}</span>
          </p>
        </div>
        <div className="flex">
          <p className="col1">2004</p>
          <p className="col2">{t.bac}</p>
        </div>
        <div className="flex">
          <p className="col1">2004-2008</p>
          <p className="col2">{t.college}</p>
        </div>
        <div className="flex">
          <p className="col1">09/2008-12/2008</p>
          <p className="col2">
            {t.master} 
            <span className="italique">
              {t.master_stopped}
            </span>
            
          </p>
        </div>
        <div className="flex">
          <p className="col1">01/2009-06/2009</p>
          <p className="col2">{t.archicad_3dsMax}</p>
        </div>
        <div className="flex">
          <p className="col1">05/2022-11/2022</p>
          <p className="col2">
            {t.devWeb} 
            <span className="italique">{t.devWeb_val }</span>
          </p>
        </div>
      </div>
    </section>
  );
}
