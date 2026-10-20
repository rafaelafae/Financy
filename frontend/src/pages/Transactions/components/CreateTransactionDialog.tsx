import { useMutation, useQuery } from "@apollo/client/react";
import { CREATE_TRANSACTION } from "@/lib/graphql/mutations/Transaction";
import { LIST_TRANSACTIONS } from "@/lib/graphql/queries/Transaction";
import { LIST_CATEGORIES } from "@/lib/graphql/queries/Category";

import {
    TransactionModal,
} from "./TransactionModal";
import {
    Category,
    TransactionFormData
} from "@/types";
import { toast } from "sonner";


interface CreateTransactionDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onCreated?: () => void;
}

export function CreateTransactionDialog({
    open,
    onOpenChange,
    onCreated,
}: CreateTransactionDialogProps) {
    const { data: categoriesData } = useQuery<{ listCategories: Category[] }>(
        LIST_CATEGORIES
    );

    const [createTransaction, { loading }] = useMutation(CREATE_TRANSACTION, {
        refetchQueries: [{ query: LIST_TRANSACTIONS }],
        onCompleted() {
            toast.success("Transação criada com sucesso!");
            onOpenChange(false);
            onCreated?.();
        },
        onError(error) {
            toast.error(error.message || "Falha ao criar transação");
        },
    });

    const handleSave = (data: TransactionFormData) => {
        createTransaction({
            variables: {
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
            title="Nova transação"
            categories={categories}
            onSave={handleSave}
            isLoading={loading}
        />
    );
}