import { useMutation, useQuery } from "@apollo/client/react";
import { UPDATE_TRANSACTION } from "@/lib/graphql/mutations/Transaction";
import { LIST_TRANSACTIONS } from "@/lib/graphql/queries/Transaction";
import { LIST_CATEGORIES } from "@/lib/graphql/queries/Category";

import { TransactionModal } from "./TransactionModal";
import {
	Category,
	Transaction,
	TransactionFormData
} from "@/types";
import { toast } from "sonner";

interface EditTransactionDialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	onUpdated?: () => void;
	transaction: Transaction | null;
}

export function EditTransactionDialog({
	open,
	onOpenChange,
	onUpdated,
	transaction,
}: EditTransactionDialogProps) {
	const { data: categoriesData } = useQuery<{ listCategories: Category[] }>(
		LIST_CATEGORIES
	);

	const [updateTransaction, { loading }] = useMutation(UPDATE_TRANSACTION, {
		refetchQueries: [{ query: LIST_TRANSACTIONS }],
		onCompleted() {
			toast.success("Transação atualizada com sucesso!");
			onOpenChange(false);
			onUpdated?.();
		},
		onError(error) {
			toast.error(error.message || "Falha ao atualizar transação");
		},
	});

	if (!transaction) return null;

	const handleSave = (data: TransactionFormData) => {
		updateTransaction({
			variables: {
				id: transaction.id,
				data: {
					title: data.title,
					amount: data.amount,
					type: data.type,
					categoryId: data.categoryId,
					updatedAt: data.date
				},
			},
		});
	};

	const categories = categoriesData?.listCategories || [];

	return (
		<TransactionModal
			open={open}
			onOpenChange={onOpenChange}
			title="Editar transação"
			categories={categories}
			initialData={{
				id: transaction.id,
				title: transaction.title,
				amount: transaction.amount,
				type: transaction.type,
				categoryId: transaction.categoryId,
				date: transaction.updatedAt ?? transaction.createdAt,
			}}
			onSave={handleSave}
			isLoading={loading}
		/>
	);
}