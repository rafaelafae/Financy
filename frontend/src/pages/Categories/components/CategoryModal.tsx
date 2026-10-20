import { createElement, useState } from "react";

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
	CATEGORY_COLORS,
	CATEGORY_ICONS,
} from "../constants/utils";
import { CategoryFormData } from "@/types";

import { X } from "lucide-react";


function CategoryForm({
	initialData,
	onSave,
	isLoading,
}: {
	initialData?: CategoryFormData | null;
	onSave: (data: CategoryFormData) => void;
	isLoading: boolean;
}) {
	const [name, setName] = useState(initialData?.name ?? "");
	const [description, setDescription] = useState(initialData?.description ?? "");
	const [selectedIcon, setSelectedIcon] = useState(initialData?.icon ?? CATEGORY_ICONS[0].id);
	const [selectedColor, setSelectedColor] = useState(initialData?.color ?? CATEGORY_COLORS[0].id);

	function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		if (!name.trim()) return;

		onSave({
			id: initialData?.id,
			name: name.trim(),
			description: description.trim() || undefined,
			icon: selectedIcon,
			color: selectedColor,
		});
	}

	return (
		<form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-2">
			{/* Título */}
			<div className="group flex flex-col items-start justify-between h-19">
				<Label
					htmlFor="transaction-title"
					className="text-sm font-medium text-gray-700 transition-colors group-focus-within:text-brand-base cursor-pointer">
					Título
				</Label>
				<Input
					id="transaction-title"
					placeholder="Ex. Alimentação"
					value={name}
					onChange={(e) => setName(e.target.value)}
					className="h-12 rounded-xl border border-gray-300 bg-white p-3.5 text-[16px] text-gray-800 placeholder:text-gray-400 transition-all outline-none caret-tag-green-base focus:border-gray-300 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-gray-300 disabled:opacity-50"
					disabled={isLoading}
					required
				/>
			</div>

			{/* Descrição */}
			<div className="group flex flex-col items-start justify-between h-27.5">
				<div className="flex items-center justify-between">
					<Label
						htmlFor="transaction-description"
						className="text-sm font-medium text-gray-700 transition-colors group-focus-within:text-brand-base cursor-pointer"
					>
						Descrição
					</Label>
				</div>
				<Input
					id="transaction-description"
					placeholder="Descrição da categoria"
					value={description}
					onChange={(e) => setDescription(e.target.value)}
					className="h-12 rounded-xl border border-gray-300 bg-white p-3.5 text-[16px] text-gray-800 placeholder:text-gray-400 transition-all outline-none caret-tag-green-base focus:border-gray-300 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-gray-300 disabled:opacity-50"
					disabled={isLoading}
				/>
				<span className="text-xs text-gray-500">
					Opcional
				</span>
			</div>

			{/* Seletor de Ícones */}
			<div className="flex flex-col items-start justify-between h-30 w-full">
				<Label className="text-sm font-medium text-gray-700">
					Ícone
				</Label>
				<div className="grid grid-cols-8 gap-2 w-full pr-1.5">
					{CATEGORY_ICONS.map((item) => {
						const isSelected = selectedIcon === item.id;

						return (
							<button
								key={item.id}
								type="button"
								disabled={isLoading}
								onClick={() => setSelectedIcon(item.id)}
								className={`flex size-10.5 items-center justify-center rounded-xl border transition-all cursor-pointer ${isSelected
									? "border-brand-base bg-white text-gray-600"
									: "border-gray-300 bg-white text-gray-500"
									}`}
							>
								{createElement(item.icon, { className: "size-5 shrink-0" })}
							</button>
						);
					})}
				</div>
			</div>

			{/* Seletor de Cores */}
			<div className="flex flex-col items-start justify-between h-14.5 w-full">
				<Label className="text-sm font-medium text-gray-700">
					Cor
				</Label>
				<div className="grid grid-cols-7 gap-2 w-full">
					{CATEGORY_COLORS.map((item) => {
						const isSelected = selectedColor === item.id;
						return (
							<Button
								key={item.id}
								variant="outline"
								disabled={isLoading}
								onClick={() => setSelectedColor(item.id)}
								className={`h-7.5 w-full p-1 rounded-lg border transition-all cursor-pointer bg-white
                                    ${isSelected
										? "border-brand-base"
										: "border-gray-300"
									}`}
							>
								<span className={`w-full h-full rounded-md ${item.dotBgClass}`} />
							</Button>
						);
					})}
				</div>
			</div>

			{/* Botão de Salvar */}
			<Button
				type="submit"
				disabled={isLoading || !name.trim()}
				className="w-full mt-2 h-12 rounded-xl bg-brand-base hover:bg-brand-dark text-white text-[16px] font-medium cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
			>
				{isLoading ? "Salvando..." : "Salvar"}
			</Button>
		</form>
	);
}

interface CategoryModalProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	onSave: (data: CategoryFormData) => void;
	title?: string;
	initialData?: CategoryFormData | null;
	isLoading?: boolean;
}

export function CategoryModal({
	open,
	onOpenChange,
	onSave,
	title,
	initialData,
	isLoading = false,
}: CategoryModalProps) {
	const modalTitle = title || (initialData ? "Editar categoria" : "Nova categoria");

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-md w-full bg-white border-gray-200 rounded-2xl p-6 [&>button:last-child]:hidden">
				<div className="flex items-start justify-between w-full">
					<DialogHeader className="text-left gap-1!">
						<DialogTitle className="text-[16px] font-semibold text-gray-800">
							{modalTitle}
						</DialogTitle>
						<DialogDescription className="text-sm text-gray-600">
							Organize suas transações com categorias
						</DialogDescription>
					</DialogHeader>

					<Button
						variant="outline"
						onClick={() => onOpenChange(false)}
						className="size-8 p-0 rounded-xl bg-white border border-gray-300 hover:bg-gray-200 text-gray-700 cursor-pointer shrink-0"
					>
						<X className="size-4" />
					</Button>
				</div>

				{open && (
					<CategoryForm
						key={initialData?.id ?? "new"}
						initialData={initialData}
						onSave={onSave}
						isLoading={isLoading}
					/>
				)}
			</DialogContent>
		</Dialog>
	);
}