import React from "react";
// import "../cv/cv.css";
import { useSelector } from "react-redux";

export default function Aptitude() {
  const { t } = useSelector((state) => state.langReducer);

  const style = {
    aptitude_item: "flex flex-col md:flex-row ",
  };

  return (
    <section id="aptitude" className="cv-section mb-5 max-w-[900px] mx-auto">
      <div className={style.aptitude_item}>
        <h3 className="h3-cv">{t.software}:</h3>
        <div>
          <div className="flex w-fit">
            <p className="col3">
              AUTOCAD (<span className="italique">{t.advenced} </span>),
              ARCHICAD (<span className="italique"> {t.medium} </span>), 3DS MAX
              ({t.medium}), PHOTOSHOP (
              <span className="italique">{t.basic} </span>), MS OFFICE (
              <span className="italique">word, powerpoint </span>)
            </p>
          </div>
        </div>
      </div>

      <div className={style.aptitude_item}>
        <h3 className="h3-cv">{t.dev_Technologies}:</h3>
        <div>
          <div className="flex">
            <p className="col3">
              HTML (<span className="italique">{t.advenced} </span>), CSS (
              <span className="italique">flexbox </span>), SASS (
              <span className="italique">{t.medium} </span>), Javaspcript (
              <span className="italique">junior </span>), React (
              <span className="italique">Context, Redux ({t.basic}) </span>),
              Node ({t.basic})
            </p>
          </div>
        </div>
      </div>

      <div className={style.aptitude_item}>
        <h3 className="h3-cv">{t.install}:</h3>
        <div>
          <div className="flex">
            <p className="col3">WINDOWS, Logiciels et Equipements de bureau.</p>
          </div>
        </div>
      </div>

      <div className={style.aptitude_item}>
        <h3 className="h3-cv">{t.languages}:</h3>
        <div>
          <div className="flex">
            <p className="col3">
              {t.rom_mold} (<span className="italique">{t.native} </span>),
              {t.russian}(<span className="italique">{t.advenced}</span>),{" "}
              {t.french} (<span className="italique"> {t.advenced} </span>),{" "}
              {t.english} (
              <span className="italique">
                {t.writtenExpression} ,{t.writtenComprehension}
              </span>
              )
            </p>
          </div>
        </div>
      </div>

      <div className={style.aptitude_item}>
        <h3 className="h3-cv">{t.driver_sLicense}:</h3>
        <div>
          <div className="flex">
            <p className="col3">{t.driverCategory}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
