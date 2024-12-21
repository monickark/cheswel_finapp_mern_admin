import * as dayjs from 'dayjs';
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

//internal import
import { SidebarContext } from "context/SidebarContext";
import GoldServices from "services/GoldServices";
import { notifyError, notifySuccess } from "utils/toast";

const useGoldSubmit = (id) => {
  const [goldPublished, setGoldPublished] = useState(true);
  const [purchasedDate, setPurchasedDate] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { isDrawerOpen, closeDrawer, setIsUpdate } = useContext(SidebarContext);

  const {
    handleSubmit,
    register,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm();

  const onSubmit = async ({ goldName, purchasedDate, purchasedGram, wastageGram, gramPrice, amount, remarks}) => {
    console.log(id, goldName, purchasedDate, purchasedGram, wastageGram, gramPrice, amount, remarks)
    // return notifyError("CRUD operation is disabled for this option!");
    try {
      setIsSubmitting(true);
      const goldData = {
        goldName, 
        purchasedDate, 
        purchasedGram, 
        wastageGram, 
        gramPrice, 
        amount, 
        remarks,
        status: goldPublished ? "show" : "hide",
      };

      if (id) {
        const res = await GoldServices.updateGold(id, goldData);
        setIsUpdate(true);
        setIsSubmitting(false);
        notifySuccess(res.message);
        closeDrawer();
      } else {
        const res = await GoldServices.addGold(goldData);
        setIsUpdate(true);
        setIsSubmitting(false);
        notifySuccess(res.message);
        closeDrawer();
      }
    } catch (err) {
      console.log();
      notifyError(err ? err?.response?.data?.message : err?.message);
      closeDrawer();
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (!isDrawerOpen) {
      setValue("goldName");
      setPurchasedDate(true);
      setValue("purchasedDate");
      setValue("purchasedGram");
      setValue("wastageGram");
      setValue("purchasedAmount");
      setValue("gramPrice");
      setValue("amount");
      setValue("remarks");
      clearErrors("goldName");
      clearErrors("purchasedDate");
      clearErrors("purchasedGram");
      clearErrors("wastageGram");
      clearErrors("purchasedAmount");
      clearErrors("gramPrice");
      clearErrors("amount");
      clearErrors("remarks");
      return;
    }
    if (id) {
      (async () => {
        try {
          const res = await GoldServices.getGoldById(id);
          if (res) {
            console.log('Update gold dateilas retrieved : ', res);
            setValue("goldName", res.goldName);
            setValue("purchasedDate", dayjs(res.endTime).format('YYYY-MM-DD'));
            setValue("purchasedGram", res.purchasedGram);
            setValue("gramPrice", res.gramPrice);
            setValue("wastageGram", res.wastageGram);
            setValue("purchasedAmount", res.purchasedAmount);
            setValue("amount", res.amount);
            setValue("remarks", res.remarks);
            setGoldPublished(res.status === "show");
            setValue("status", res.status);
          }
        } catch (err) {
          notifyError(err ? err?.response?.data?.message : err?.message);
        }
      })();
    }
  }, [id, setValue, isDrawerOpen, clearErrors]);

  return {
    onSubmit,
    register,
    errors,
    handleSubmit,
    isSubmitting,
    goldPublished,
    setPurchasedDate,
    setGoldPublished,
  };
};

export default useGoldSubmit;
