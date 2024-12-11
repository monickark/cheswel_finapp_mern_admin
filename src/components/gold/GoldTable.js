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

const GoldTable = ({ golds, isCheck, setIsCheck }) => {
  const { serviceId, handleModalOpen, handleUpdate, title } = useToggleDrawer();
  console.log("gold", golds);
  const handleClick = (e) => {
    const { id, checked } = e.target;
    // console.log('click all id', id, checked);
    setIsCheck([...isCheck, id]);
    if (!checked) {
      setIsCheck(isCheck.filter((item) => item !== id));
    }
  };

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

            <TableCell>
              <span className="text-sm">{gold.purchasedDate}</span>{" "}
            </TableCell>

            <TableCell>
                 <span className="text-sm">{gold.purchasedGram}</span>{" "}
            </TableCell>

            <TableCell>
                 <span className="text-sm">{gold.wastageGram}</span>{" "}
            </TableCell>

            <TableCell>
                 <span className="text-sm">{gold.gramPrice}</span>{" "}
            </TableCell>

            <TableCell>
                 <span className="text-sm">{gold.amount}</span>{" "}
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
