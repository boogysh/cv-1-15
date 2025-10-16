import React from "react";

const RowDevis = ({
  id,
  title,
  type,
  qty,
  qtyUnit,
  itemPrice,
  itemPriceUnit,
  supply,
  supplyResult,
  time,
  timeResult,
}) => {
  const priceUnits =
    itemPriceUnit === "€/m2" ||
    itemPriceUnit === "€/ml" ||
    itemPriceUnit === "€/l" ||
    itemPriceUnit === "€/u";

  const timeUnits =
    itemPriceUnit === "h/m2" ||
    itemPriceUnit === "h/ml" ||
    itemPriceUnit === "h/m3" ||
    itemPriceUnit === "h/u";

  const buyType = type === "buy";
  const workType = type === "work";

  return (
    <tr className="border-b border-gray-200 dark:border-gray-700">
      <th
        scope="row"
        className="px-2 py-1 font-medium text-gray-900 whitespace-wrap bg-gray-50 dark:text-white dark:bg-gray-800"
      >
        {title}
      </th>
      <td className="px-2 py-1">{qty}</td>
      <td className="px-2 py-1 bg-gray-50 dark:bg-gray-800">{qtyUnit}</td>
      <td className="px-2 py-1  dark:bg-gray-800">{itemPrice}</td>
      <td className="px-2 py-1 bg-gray-50 dark:bg-gray-800">{itemPriceUnit}</td>
      {/*  supply or supplyResult */}
      {supply ? (
        <td className={`supplies ${id} px-2 py-1`}>{supply}</td>
      ) : (
        priceUnits &&
        buyType && (
          <td className={`supplies ${id} px-2 py-1`}>{supplyResult}</td>
        )
      )}
       {/* time or time result  */}
      {time ? (
        <td className={`hours ${id} px-2 py-1 bg-gray-50 dark:bg-gray-800 `}>
          {time}
        </td>
      ) : (
        timeUnits &&
        workType && (
          <td className={`hours ${id} px-2 py-1 bg-gray-50 dark:bg-gray-800 `}>
            {timeResult}
          </td>
        )
      )}
      {/* for supply type - time is zero */}
      {buyType && (
        <td className={`hours ${id} px-2 py-1 bg-gray-50 dark:bg-gray-800 `}>
          0
        </td>
      )}
    </tr>
  );
};

export default RowDevis;
