import { TableBody, TableCell, TableRow } from "@windmill/react-ui";
import React from "react";

//internal import
import useToggleDrawer from "hooks/useToggleDrawer";
import CheckBox from "components/form/CheckBox";
import ShowHideButton from "components/table/ShowHideButton";
import EditDeleteButton from "components/table/EditDeleteButton";
import MainDrawer from "components/drawer/MainDrawer";
import GoldDrawer from "components/drawer/GoldDrawer";
import DeleteModal from "components/modal/DeleteModal";
import { showDateFormat } from "utils/dateFormate";

const GoldTable = ({ golds, isCheck, setIsCheck, globalSetting }) => {
  const { serviceId, handleModalOpen, handleUpdate, title } = useToggleDrawer();
 // console.log("gold", golds);
  const handleClick = (e) => {
    const { id, checked } = e.target;
    console.log('click all id', id, checked);
    setIsCheck([...isCheck, id]);
    if (!checked) {
      setIsCheck(isCheck.filter((item) => item !== id));
    }
  };

  function format(value) {
    return Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(value);
  }


  return (
    <>
      {isCheck.length < 1 && <DeleteModal id={serviceId} title={title} />}

      <MainDrawer>
        <GoldDrawer id={serviceId} />
      </MainDrawer>

      <TableBody>
        {golds?.map((gold, i) => (
          <TableRow key={gold._id}>
            <TableCell>
              <CheckBox
                type="checkbox"
                name={gold.goldName}
                id={gold._id}
                handleClick={handleClick}
                isChecked={isCheck.includes(gold._id)}
              />
            </TableCell>
            <TableCell>
              <span className="font-semibold uppercase text-xs"> {i + 1}</span>
            </TableCell>

            <TableCell>
              <span className="text-sm">{gold.goldName}</span>{" "}
            </TableCell>

            <TableCell className="text-center">
              <span className="text-sm">
                {showDateFormat(
                  gold.purchasedDate,
                  globalSetting?.default_date_format
                )}
                </span> {" "}
            </TableCell>

            <TableCell className="text-center">
                 <span className="text-sm">{gold.purchasedGram}</span>{" "}
            </TableCell>

            <TableCell className="text-center">
                 <span className="text-sm">{gold.wastageGram}</span>{" "}
            </TableCell>

            <TableCell className="text-center">
                 <span className="text-sm">{gold.gramPrice}</span>{" "}
            </TableCell>

            <TableCell className="text-right">
                 <span className="text-sm">
                 {format(gold.amount)}
                 </span>{" "}
                 
            </TableCell>

            <TableCell className="text-center">
              <ShowHideButton id={gold._id} status={gold.status} />
            </TableCell>

            <TableCell>
              <EditDeleteButton
                id={gold._id}
                handleUpdate={handleUpdate}
                handleModalOpen={handleModalOpen}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </>
  );
};

export default GoldTable;
