import DrawerButton from "components/form/DrawerButton";
import Error from "components/form/Error";
import InputArea from "components/form/InputArea";
import InputValue from "components/form/InputValue";
import LabelArea from "components/form/LabelArea";
import SwitchToggle from "components/form/SwitchToggle";
import Title from "components/form/Title";
import useGoldSubmit from "hooks/useGoldSubmit";
import React, {useState} from "react";
import { Scrollbars } from "react-custom-scrollbars-2";

//internal import

const GoldDrawer = ({ id }) => {
  const {
    onSubmit,
    register,
    errors,
    handleSubmit,
    isSubmitting,
    goldPublished,
    globalSetting,
    selectedDate,
    setPurchasedDate,
    setGoldPublished,
  } = useGoldSubmit(id);

  const [purchaseGram, setPurchaseGram] = useState(0);
  const [wastageGram, setWastageGram] = useState(0);
  const [gramPrice, setGramPrice] = useState(0);
  const [amount, setAmount] = useState(0);

  const currency = globalSetting?.default_currency || "₹";

  return (
    <>

      <div className="w-full relative p-6 border-b border-gray-100 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
        {id ? (
          <Title title={("Update Gold")} description={("UpdateGoldText")} />
        ) : (
          <Title title={("Add New Gold")} description={("Add Gold Details")} />
        )}
      </div>

      <Scrollbars className="w-full md:w-7/12 lg:w-8/12 xl:w-8/12 relative dark:bg-gray-700 dark:text-gray-200">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="p-6 flex-grow scrollbar-hide w-full max-h-full pb-40">
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={("Gold Purchase Name")} />
              <div className="col-span-8 sm:col-span-4">
                <InputArea
                  register={register}
                  label="Gold name"
                  name="goldName"
                  type="text"
                  placeholder="Gold name"
                />
                <Error errorName={errors.name} />
              </div>
            </div>

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                  <LabelArea label="Purchase Date" />
                  <div className="col-span-8 sm:col-span-4">
                  <InputArea
                  register={register}
                    type="date"
                    name="purchasedDate"
                    value={selectedDate}
                    className=""
                    onChange={(e) => setPurchasedDate(e.target.value)}
                  />
              </div>

              <Error errorName={errors.purchasedDate} /> 
            </div>
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={("Purchase Grams")} />
              <div className="col-span-8 sm:col-span-4">
              <InputArea
                  register={register}
                  label="Purchsed Gram"
                  name="purchasedGram"
                  type="number"
                  placeholder="Purchsed Gram"
                  onChange={(event) => setPurchaseGram(Number(event.target.value))}
                />
                <Error errorName={errors.purchasedGram} /> </div>
            </div>

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={("Wastage Grams")} />
              <div className="col-span-8 sm:col-span-4">
              <InputArea
                  register={register}
                  label="Wastage Gram"
                  name="wastageGram"
                  type="number"
                  value={wastageGram}
                  onChange={(event) => setWastageGram(Number(event.target.value))}
                  placeholder="Wastage Gram"
                  
                />
                <Error errorName={errors.wastageGram} /> </div>
            </div>
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={("Price  Grams")} />
              <div className="col-span-8 sm:col-span-4">
              <InputArea
              product
                  register={register}
                  minValue={1}
                  label="Price per Gram"
                  name="gramPrice"
                  type="number"
                  defaultValue={0.0}
                  currency={currency}
                  value={gramPrice}
                  placeholder="Price per Gram"
                  onChange={(event) => setGramPrice(Number(event.target.value))}
                />
                <Error errorName={errors.gramPrice} /> </div>
            </div>

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={("Purchase Amount")} />
              <div className="col-span-8 sm:col-span-4">
              <InputValue
                  product
                  register={register}
                  values={(purchaseGram + wastageGram) * gramPrice}
                  label="Amount"
                  name="amount"
                  disabled
                  currency={currency}
                  
                /></div>
            </div>

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={("Remarks")} />
              <div className="col-span-8 sm:col-span-4">
              <InputArea
                  register={register}
                  label="Remarks"
                  name="remarks"
                  type="text"
                  placeholder="Remarks"
                />
                <Error errorName={errors.remarks} /> </div>
            </div>

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={("Add Golds Published")} />
              <div className="col-span-8 sm:col-span-4">
                <SwitchToggle
                  title={""}
                  handleProcess={setGoldPublished}
                  processOption={goldPublished}
                />
              </div>
            </div>
          </div>

          <DrawerButton id={id} title="Gold" isSubmitting={isSubmitting} />
        </form>
      </Scrollbars>
    </>
  );
};

export default GoldDrawer;
