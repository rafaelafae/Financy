import { useMutation } from "@apollo/client/react";
import { CREATE_CATEGORY } from "@/lib/graphql/mutations/Category";

import { CategoryModal } from "./CategoryModal";
import { CategoryFormData } from "@/types";
import { toast } from "sonner";


interface CreateCategoryDialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	onCreated?: () => void;
}

export function CreateCategoryDialog({
	open,
	onOpenChange,
	onCreated,
}: CreateCategoryDialogProps) {
	const [createCategory, { loading }] = useMutation(CREATE_CATEGORY, {
		onCompleted() {
			toast.success("Categoria criada com sucesso!");
			onOpenChange(false);
			onCreated?.();
		},
		onError() {
			toast.error("Falha ao criar categoria");
		},
	});

	const handleSave = (data: CategoryFormData) => {
		createCategory({
			variables: {
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
			title="Nova categoria"
			onSave={handleSave}
			isLoading={loading}
		/>
	);
}