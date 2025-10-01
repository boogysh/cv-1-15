import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import RowDevis from "./RowDevis";
import { v4 as uuidv4 } from "uuid";
import getTotal from "./getTotal";

const Devis = ({ id }) => {
  const [totalHours, setTotalHours] = useState(0);
  const [totalSupplies, setTotalSupplies] = useState(0);
  //
  // const totalHours = getTotal("hours");
  // console.log(" totalHours++++++++++", totalHours);
  // const totalSupplies = getTotal("supplies");

  const totalHoursPrice = (totalHours * 25).toFixed(2);
  const elsePrice = 42 + (42 * 10) / 100;
  const totalHoursElsePrice = (totalHours * elsePrice).toFixed(2);
  const economyPrice = (
    100 -
    (totalHoursPrice * 100) / totalHoursElsePrice
  ).toFixed(0);

  const { t } = useSelector((state) => state.langReducer);

  const groupDevis = t.cardDevis.filter((item) => item.id === id)[0]; // result is an Array => [0] flat() not working

  console.log("groupDevis-maintitle", groupDevis);

  useEffect(() => {
    const totalHours = getTotal(`hours ${id}`);
    const totalSupplies = getTotal(`supplies ${id}`);
    //
    setTotalHours(totalHours);
    setTotalSupplies(totalSupplies);
  }, [id]);

  return (
    <section className="p-0 md:p-5 md:pb-0 w-full md:w-fit">
      <div className="w-full md:w-fit max-w-[1000px] h-auto relative overflow-auto border-black border-[2px] shadow-md md:rounded-lg">
        <table className="w-fit min-w-[600px] text-[12px]  sm:text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
            <tr>
              <th
                scope="col"
                className="h-auto px-2 py-3 bg-gray-50 dark:bg-gray-800"
              >
                {groupDevis.mainTitle}
              </th>
              <th scope="col" className="px-2 py-3">
                Quantité
              </th>
              <th scope="col" className="px-2 py-3 bg-gray-50 dark:bg-gray-800">
                Un.
              </th>
              <th scope="col" className="px-2 py-3  dark:bg-gray-800">
                Prix/un
              </th>
              <th scope="col" className="px-2 py-3 bg-gray-50 dark:bg-gray-800">
                Un.
              </th>
              <th scope="col" className="px-2 py-3 ">
                Fourniture
              </th>
              <th scope="col" className="px-2 py-3 bg-gray-50 dark:bg-gray-800">
                heures
              </th>
            </tr>
          </thead>
          <tbody>
            {t.cardDevis
              .filter((item) => item.id === id)
              .flatMap((item) =>
                item.content.map((contentItem, i) => {
                  const {
                    title,
                    qty,
                    qtyUnit,
                    itemPrice,
                    itemPriceUnit,
                    supply,
                    time,
                  } = contentItem;

                  // console.log("item-content", contentItem);

                  return (
                    <RowDevis
                      id={id}
                      key={uuidv4()}
                      title={title}
                      qty={qty}
                      qtyUnit={qtyUnit}
                      itemPrice={itemPrice}
                      itemPriceUnit={itemPriceUnit}
                      supply={supply}
                      supplyResult={(qty * itemPrice).toFixed(2)}
                      time={time}
                      timeResult={(qty * itemPrice).toFixed(2)}
                    />
                  );
                })
              )}

            <tr>
              <th
                scope="row"
                className="px-2 py-1 font-medium text-gray-900 whitespace-wrap bg-gray-50 dark:text-white dark:bg-gray-800"
              >
                SOUS-TOTAL
              </th>
              <td className="px-2 py-1"></td>
              <td className="px-2 py-1 bg-gray-50"></td>
              <td className="px-2 py-1"></td>
              <td className="px-2 py-1 bg-gray-50 dark:bg-gray-800"></td>
              <td className="px-2 py-1">{totalSupplies} €</td>
              <td className="hours px-2 py-1 bg-gray-50 dark:bg-gray-800">
                {totalHours} h
              </td>
            </tr>
            <tr>
              <th
                scope="row"
                className="px-2 py-1 font-medium text-green-600 whitespace-wrap bg-gray-50 dark:text-white dark:bg-gray-800"
              >
                Mes services 25€ TTC/heure
              </th>
              <td className="px-2 py-1"></td>
              <td className="px-2 py-1 bg-gray-50"></td>
              <td className="px-2 py-1"></td>
              <td className="px-2 py-1 bg-gray-50 dark:bg-gray-800"></td>
              <td className="px-2 py-1"></td>
              <td className="hours px-2 py-1 text-green-600 bg-gray-50 dark:bg-gray-800">
                {totalHoursPrice} € TTC
              </td>
            </tr>
            <tr>
              <th
                scope="row"
                className="px-2 py-1 font-medium text-red-500 whitespace-wrap bg-gray-50 dark:text-white dark:bg-gray-800"
              >
                Société classique 42€ HT/heure
              </th>
              <td className="px-2 py-1"></td>
              <td className="px-2 py-1 bg-gray-50 dark:bg-gray-800"></td>
              <td className="px-2 py-1 b"></td>
              <td className="px-2 py-1 bg-gray-50"></td>
              <td className="px-2 py-1 "></td>
              <td className="hours px-2 py-1 text-red-500 bg-gray-50 dark:bg-gray-800">
                {totalHoursElsePrice} € TTC
              </td>
            </tr>
            <tr>
              <th
                scope="row"
                className="px-2 py-1 font-medium text-black  whitespace-wrap bg-gray-50 dark:text-white dark:bg-gray-800"
              >
                Soit <span className="text-green-600">{economyPrice}%</span>{" "}
                d'économie sur la main d'œuvre.
              </th>
              <td className="px-2 py-1"></td>
              <td className="px-2 py-1 bg-gray-50 dark:bg-gray-800"></td>
              <td className="px-2 py-1 b"></td>
              <td className="px-2 py-1 bg-gray-50"></td>
              <td className="px-2 py-1 "></td>
              <td className="hours px-2 py-1 text-red-500 bg-gray-50 dark:bg-gray-800"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Devis;
