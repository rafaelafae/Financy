import { useState } from "react";
import {
	formatCurrencyInput,
	formatNumberToCurrency,
	parseCurrencyToNumber
} from "../constants/utils";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/DatePicker";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	CategoryOption,
	TransactionFormData,
	TransactionType
} from "@/types";
import { ArrowDownCircle, ArrowUpCircle, X } from "lucide-react";


function TransactionForm({
	initialData,
	onSave,
	categories,
	isLoading,
}: {
	initialData?: TransactionFormData | null;
	onSave: (data: TransactionFormData) => void;
	categories: CategoryOption[];
	isLoading: boolean;
}) {
	const [type, setType] = useState<TransactionType>(
		initialData?.type ?? "EXPENSE"
	);
	const [title, setTitle] = useState(initialData?.title ?? "");
	const [date, setDate] = useState<Date | undefined>(
		initialData?.date ? new Date(initialData.date) : new Date()
	);
	const [amountDisplay, setAmountDisplay] = useState(
		initialData?.amount ? formatNumberToCurrency(initialData.amount) : ""
	);
	const [categoryId, setCategoryId] = useState(
		initialData?.categoryId ?? ""
	);

	function handleAmountChange(e: React.ChangeEvent<HTMLInputElement>) {
		const formatted = formatCurrencyInput(e.target.value);
		setAmountDisplay(formatted);
	}

	function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		const parsedAmount = parseCurrencyToNumber(amountDisplay);

		if (!title.trim() || parsedAmount <= 0 || !categoryId || !date) return;

		onSave({
			id: initialData?.id,
			title: title.trim(),
			amount: parsedAmount,
			date: date.toISOString(),
			type,
			categoryId,
		});
	}

	return (
		<form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-2">
			{/* 1. Toggle */}
			<div className="grid grid-cols-2 gap-2 p-2 mb-2 bg-white border border-gray-200 rounded-2xl">
				<Button
					type="button"
					variant="outline"
					onClick={() => setType("EXPENSE")}
					disabled={isLoading}
					className={`h-11.5 p-3.5 rounded-xl flex items-center justify-center gap-3 transition-all cursor-pointer bg-white hover:bg-white ${type === "EXPENSE"
						? "border border-tag-red-base shadow-xs"
						: "border-transparent shadow-none"
						}`}
				>
					<ArrowDownCircle className={`size-4 shrink-0 ${type === "EXPENSE"
						? "text-tag-red-base"
						: "text-gray-400"}`}
					/>
					<span className={`font-medium text-[16px] ${type === "EXPENSE"
						? "text-gray-800"
						: "text-gray-600"}`}
					>
						Despesa
					</span>
				</Button>

				<Button
					type="button"
					variant="outline"
					onClick={() => setType("INCOME")}
					disabled={isLoading}
					className={`h-11.5 p-3.5 rounded-xl flex items-center justify-center gap-3 transition-all cursor-pointer bg-white hover:bg-white ${type === "INCOME"
						? "border border-tag-green-base shadow-xs"
						: "border-transparent shadow-none"
						}`}
				>
					<ArrowUpCircle className={`size-4 shrink-0 ${type === "INCOME"
						? "text-tag-green-base"
						: "text-gray-400"}`}
					/>
					<span className={`font-medium text-[16px] ${type === "INCOME"
						? "text-gray-800"
						: "text-gray-600"}`}
					>
						Receita
					</span>
				</Button>
			</div>

			<div className="flex flex-col gap-4">
				{/* 2. Descrição */}
				<div className="group flex flex-col items-start gap-1.5 w-full">
					<Label
						htmlFor="transaction-title"
						className="text-sm font-medium text-gray-700 transition-colors group-focus-within:text-brand-base cursor-pointer"
					>
						Descrição
					</Label>

					<Input
						id="transaction-title"
						placeholder="Ex. Almoço no restaurante"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						className="h-12 rounded-xl border border-gray-300 bg-white p-3.5 text-[16px] text-gray-800 placeholder:text-gray-400 transition-all outline-none caret-tag-green-base focus:border-gray-300 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-gray-300 disabled:opacity-50"
						disabled={isLoading}
						required
					/>
				</div>

				{/* 3. Grid de 2 colunas: Data e Valor lado a lado */}
				<div className="grid grid-cols-2 gap-4 w-full">
					{/* Data */}
					<div className="group flex flex-col items-start gap-1.5 w-full">
						<Label
							htmlFor="transaction-date"
							className="text-sm font-medium text-gray-700"
						>
							Data
						</Label>
						<DatePicker
							id="transaction-date"
							date={date}
							onSelect={setDate}
							disabled={isLoading}
							className="h-12 rounded-xl border border-gray-300 bg-white p-3.5 text-[16px] text-gray-800 placeholder:text-gray-400 transition-all outline-none focus:border-gray-300 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-gray-300 disabled:opacity-50"
						/>
					</div>

					{/* Valor com máscara monetária dinâmica */}
					<div className="group flex flex-col items-start gap-1.5 w-full">
						<Label
							htmlFor="transaction-value"
							className="text-sm font-medium text-gray-700 transition-colors group-focus-within:text-brand-base cursor-pointer"
						>
							Valor
						</Label>
						<div className="relative w-full">
							<span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 text-sm font-medium transition-colors group-focus-within:text-brand-base pointer-events-none">
								R$
							</span>
							<Input
								type="text"
								id="transaction-value"
								inputMode="numeric"
								placeholder="0,00"
								value={amountDisplay}
								onChange={handleAmountChange}
								className="h-12 rounded-xl border border-gray-300 bg-white text-[16px] text-gray-800 placeholder:text-gray-400 pl-10 pr-3.5 transition-colors outline-none caret-brand-base focus:border-gray-300 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-gray-300 disabled:opacity-50"
								disabled={isLoading}
								required
							/>
						</div>
					</div>
				</div>

				{/* 4. Categoria (largura total) */}
				<div className="group flex flex-col items-start gap-1.5 w-full">
					<Label className="text-sm font-medium text-gray-700 transition-colors group-focus-within:text-brand-base cursor-pointer">
						Categoria
					</Label>

					<Select
						value={categoryId}
						onValueChange={(val) => setCategoryId(val ?? "")}
						disabled={isLoading}
					>
						<SelectTrigger
							className="h-12 w-full rounded-xl border border-gray-300 bg-white p-3.5 text-[16px] text-gray-800 transition-colors outline-none cursor-pointer focus:border-gray-300 focus-visible:ring-0 focus-visible:ring-offset-0 disabled:opacity-50"
						>
							<SelectValue placeholder="Selecione">
								{categories.find((cat) => cat.id === categoryId)?.name}
							</SelectValue>
						</SelectTrigger>

						{/* Aqui está o segredo para o Base UI: */}
						<SelectContent
							side="bottom"
							align="start"
							sideOffset={4}
							alignItemWithTrigger={false}
							className="w-(--anchor-width) rounded-xl border border-gray-200 bg-white shadow-lg p-1.5 z-50"
						>
							{categories.map((cat) => (
								<SelectItem
									key={cat.id}
									value={cat.id}
									className="cursor-pointer py-2.5 px-3 text-[15px] text-gray-700 hover:bg-gray-100 rounded-lg flex items-center justify-between transition-colors focus:bg-gray-100 focus:text-gray-900"
								>
									{cat.name}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
			</div>

			{/* 5. Botão Salvar */}
			<Button
				type="submit"
				disabled={isLoading || !title.trim() || !amountDisplay || !categoryId}
				className="w-full mt-2 h-12 rounded-xl bg-brand-base hover:bg-brand-dark text-white text-[16px] font-medium cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
			>
				{isLoading ? "Salvando..." : "Salvar"}
			</Button>
		</form>
	);
}

interface TransactionModalProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	onSave: (data: TransactionFormData) => void;
	title?: string;
	initialData?: TransactionFormData | null;
	categories: CategoryOption[];
	isLoading?: boolean;
}

export function TransactionModal({
	open,
	onOpenChange,
	onSave,
	title,
	initialData,
	categories,
	isLoading = false,
}: TransactionModalProps) {
	const modalTitle =
		title || (initialData ? "Editar transação" : "Nova transação");

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-md w-full bg-white border-gray-200 rounded-2xl p-6 [&>button:last-child]:hidden">
				<div className="flex items-start justify-between w-full">
					<DialogHeader className="text-left gap-1!">
						<DialogTitle className="text-[16px] font-semibold text-gray-800">
							{modalTitle}
						</DialogTitle>
						<DialogDescription className="text-sm text-gray-600">
							Registre sua despesa ou receita
						</DialogDescription>
					</DialogHeader>

					<Button
						type="button"
						variant="outline"
						onClick={() => onOpenChange(false)}
						className="size-8 p-0 rounded-xl bg-white border border-gray-300 hover:bg-gray-200 text-gray-700 cursor-pointer shrink-0"
					>
						<X className="size-4" />
					</Button>
				</div>

				{open && (
					<TransactionForm
						key={initialData?.id ?? "new"}
						initialData={initialData}
						onSave={onSave}
						categories={categories}
						isLoading={isLoading}
					/>
				)}
			</DialogContent>
		</Dialog>
	);
}