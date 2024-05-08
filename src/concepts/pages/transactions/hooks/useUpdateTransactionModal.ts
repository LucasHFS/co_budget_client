import { useState } from "react";
import moment from "moment";
import { parseDate } from "@/concepts/utils/date";
import { useConfirm } from "material-ui-confirm";
import { useUpdateTransaction } from "@/concepts/transactions/view/hooks/useUpdateTransaction";
import { useDeleteTransaction } from "@/concepts/transactions/view/hooks/useDeleteTransaction";
import { usePayTransaction } from "@/concepts/transactions/view/hooks/usePayTransaction";
import { useUnpayTransaction } from "@/concepts/transactions/view/hooks/useUnpayTransaction";
import { useBudget } from "@/concepts/Budget/hooks/useBudget";

export const useUpdateTransactionModal = ({transaction, handleClose}: any) => {
  const [price, setPrice] = useState(transaction.price)
  const { payTransaction } = usePayTransaction({onSuccess: handleClose})
  const { unPayTransaction } = useUnpayTransaction({onSuccess: handleClose})
  const [dueAt, setDueAt] = useState(() => parseDate(transaction.dueAt));

  const { deleteTransaction} = useDeleteTransaction({onSuccess: handleClose})
  const { selectedBudgetId } = useBudget()

  const onSuccess = () => {
    handleClose()
  }

  const { updateTransaction, isLoading } = useUpdateTransaction({ onSuccess })
  //@ts-ignore
  const modifiedValue = moment(moment(dueAt,"DD/MM/YYYY"),"MM-DD-YYYY");

  const targetTransactionOptions = [
    { value: 'one', name: 'Apenas esta' },
    { value: 'this_and_next', name: 'Essa e as proximas' },
    { value: 'all', name: 'Todas' }
  ]

  //@ts-ignore
  const handleUpdate = async (values, { setSubmitting }) => {
    const data = {
      ...values,
      id: transaction.id,
      dueAt,
      price: Number(price),
      budgetId: selectedBudgetId,
    }

    await updateTransaction(data);
    setSubmitting(false);
  }

  const confirm = useConfirm();
  // @ts-ignore
  const handleExclude = async (transaction) => {
    confirm({ title: 'Tem certeza?', description: 'Essa ação excluira a despesa', titleProps: { color: 'black'}})
      .then(async()=>{
        await deleteTransaction({id: transaction.id, targetTransactions: 'one'});
      })
    .catch((err) => {
      console.log(err)
    });
  }

  const handlePayTransaction = async (id: number) => {
    await payTransaction(id)
  };

  const handleUnpayTransaction = async (id: number) => {
    await unPayTransaction(id)
  };

  return {
    handleUpdate,
    setDueAt,
    setPrice,
    price,
    modifiedValue,
    targetTransactionOptions,
    handleUnpayTransaction,
    handlePayTransaction,
    handleExclude,
    submitText: isLoading ? 'Salvando...' : 'Salvar',
  }
}
