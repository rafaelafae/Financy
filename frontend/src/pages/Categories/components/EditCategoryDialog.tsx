import { useMutation } from "@apollo/client/react";
import { UPDATE_CATEGORY } from "@/lib/graphql/mutations/Category";

import { CategoryModal } from "./CategoryModal";
import { Category, CategoryFormData } from "@/types";
import { toast } from "sonner";

interface EditCategoryDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onUpdated?: () => void;
    category: Category | null;
}

export function EditCategoryDialog({
    open,
    onOpenChange,
    onUpdated,
    category,
}: EditCategoryDialogProps) {
    const [updateCategory, { loading }] = useMutation(UPDATE_CATEGORY, {
        onCompleted() {
            toast.success("Categoria atualizada com sucesso!");
            onOpenChange(false);
            onUpdated?.();
        },
        onError(error) {
            toast.error(error.message || "Falha ao atualizar categoria");
        },
    });

    if (!category) return null;

    const handleSave = (data: CategoryFormData) => {
        updateCategory({
            variables: {
                id: category.id,
                data: {
                    name: data.name,
                    description: data.description,
                    icon: data.icon,
                    color: data.color,
                },
            },
        });
    };

    return (
        <CategoryModal
            open={open}
            onOpenChange={onOpenChange}
            title="Editar categoria"
            initialData={category}
            onSave={handleSave}
            isLoading={loading}
        />
    );
}