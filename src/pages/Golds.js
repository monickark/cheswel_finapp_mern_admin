import {
  Button,
  Card,
  CardBody,
  Input,
  Pagination,
  Table,
  TableCell,
  TableContainer,
  TableFooter,
  TableHeader,
} from "@windmill/react-ui";
import { FiPlus } from "react-icons/fi";
import React, { useState, useContext } from "react";
import { useTranslation } from "react-i18next";
import { FiEdit, FiTrash2 } from "react-icons/fi";
//internal import
import BulkActionDrawer from "components/drawer/BulkActionDrawer";
import CheckBox from "components/form/CheckBox";
import GoldTable from "components/gold/GoldTable";
import DeleteModal from "components/modal/DeleteModal";
import TableLoading from "components/preloader/TableLoading";
import NotFound from "components/table/NotFound";
import useAsync from "hooks/useAsync";
import useFilter from "hooks/useFilter";
import useToggleDrawer from "hooks/useToggleDrawer";
import GoldServices from "services/GoldServices";
import PageTitle from "components/Typography/PageTitle";
import { SidebarContext } from "context/SidebarContext";
import GoldDrawer from "components/drawer/GoldDrawer";
import MainDrawer from "components/drawer/MainDrawer";

const Golds = () => {
  const { toggleDrawer } = useContext(SidebarContext);

  const { allId, handleUpdateMany, handleDeleteMany } = useToggleDrawer();
  const { data, loading } = useAsync(GoldServices.getAllGolds);
  console.log("data-Gold", data);
  const {
    totalResults,
    resultsPerPage,
    dataTable,
    GoldRef,
    handleSubmitGold,
    handleChangePage,
  } = useFilter(data);

  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isCheck, setIsCheck] = useState([]);

  const handleSelectAll = () => {
    setIsCheckAll(!isCheckAll);
    setIsCheck(data?.map((li) => li._id));
    if (isCheckAll) {
      setIsCheck([]);
    }
  };

  const { t } = useTranslation();

  return (
    <>
      <PageTitle>Golds</PageTitle>
      <MainDrawer>
        <GoldDrawer />
      </MainDrawer>

      <BulkActionDrawer ids={allId} title="Golds" />

      <DeleteModal ids={allId} setIsCheck={setIsCheck} title="Selected Gold Details" />

      <Card className="min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 mb-5">
        <CardBody>
          <form
            onSubmit={handleSubmitGold}
            className="py-3 grid gap-3 md:flex xl:flex md:justify-between"
          >
            <div className="w-full">
              <Input
                ref={GoldRef}
                type="search"
                className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
                placeholder={t("SearchGold")}
              />
            </div>

            <div className="w-full md:w-56 lg:w-56 xl:w-56">
              <Button
                disabled={isCheck.length < 1}
                onClick={() => handleUpdateMany(isCheck)}
                className="w-full rounded-md h-12 btn-gray text-gray-600"
              >
                <span className="mr-2">
                   <FiEdit />
                </span>
                {t("BulkAction")}
              </Button>
            </div>

            <div className="w-full md:w-32 lg:w-32 xl:w-32">
              <Button
                disabled={isCheck.length < 1}
                onClick={() => handleDeleteMany(isCheck)}
                className="w-full rounded-md h-12 btn-red"
              >
                <span className="mr-2">
                  <FiTrash2 />
                </span>
                {t("Delete")}
              </Button>
            </div>
            <Button onClick={toggleDrawer} className="rounded-md h-12 w-64">
              <span className="mr-2">
                <FiPlus />
              </span>
              Add Gold
            </Button>
          </form>
        </CardBody>
      </Card>

      {loading ? (
        // <Loading loading={loading} />
        <TableLoading row={12} col={7} width={163} height={20} />
      ) : (
        data.length !== 0 && (
          <TableContainer className="mb-8 rounded-b-lg">
            <Table>
              <TableHeader>
                <tr>
                  <TableCell>
                    <CheckBox
                      type="checkbox"
                      name="selectAll"
                      id="selectAll"
                      handleClick={handleSelectAll}
                      isChecked={isCheckAll}
                    />
                  </TableCell>
                  <TableCell>{t("Id")}</TableCell>
                  <TableCell>{t("Name")}</TableCell>
                  <TableCell>{t("Purchase Date")}</TableCell>
                  <TableCell>{t("Purchase Grams")}</TableCell>
                  <TableCell>{t("Watage Grams")}</TableCell>
                  <TableCell>{t("Price per Gram")}</TableCell>
                  <TableCell>{t("Amount")}</TableCell>
                  <TableCell className="text-center">{t("GoldPublished")}</TableCell>
                  <TableCell className="text-right">{t("GoldActions")}</TableCell>
                </tr>
              </TableHeader>
              <GoldTable golds={dataTable} isCheck={isCheck} setIsCheck={setIsCheck} />
            </Table>
            <TableFooter>
              <Pagination
                totalResults={totalResults}
                resultsPerPage={resultsPerPage}
                onChange={handleChangePage}
                label="Table navigation"
              />
            </TableFooter>
          </TableContainer>
        )
      )}
      {!loading && data.length === 0 && <NotFound title="Sorry, There are no Golds right now." />}
    </>
  );
};

export default Golds;
