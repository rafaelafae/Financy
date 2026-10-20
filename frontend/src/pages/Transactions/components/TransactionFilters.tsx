import { Search, X } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Category, TransactionType } from "@/types";

export interface TransactionFilterValues {
	search: string;
	type: TransactionType | "ALL";
	categoryId: string;
	period: string; // "ALL" ou "YYYY-MM" (ex: "2026-10")
}

interface TransactionFiltersProps {
	filters: TransactionFilterValues;
	onFilterChange: (filters: TransactionFilterValues) => void;
	categories: Category[];
	availablePeriods?: string[]; // Lista de períodos disponíveis em formato "YYYY-MM"
}

// Converte "2026-10" para "Outubro / 2026"
function formatPeriodLabel(periodKey: string): string {
	if (periodKey === "ALL") return "Todos";
	const [year, month] = periodKey.split("-");
	const date = new Date(Number(year), Number(month) - 1, 1);
	const monthName = date.toLocaleDateString("pt-BR", { month: "long" });
	return `${monthName.charAt(0).toUpperCase() + monthName.slice(1)} / ${year}`;
}

export function TransactionFilters({
	filters,
	onFilterChange,
	categories,
	availablePeriods = [],
}: TransactionFiltersProps) {
	const hasActiveFilters =
		filters.search !== "" ||
		filters.type !== "ALL" ||
		filters.categoryId !== "ALL" ||
		filters.period !== "ALL";

	function handleClear() {
		onFilterChange({
			search: "",
			type: "ALL",
			categoryId: "ALL",
			period: "ALL",
		});
	}

	return (
		<div className="flex flex-col gap-4 w-full bg-white px-6 py-5 rounded-2xl border border-gray-200">
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
				{/* 1. Buscar */}
				<div className="group flex flex-col gap-2 w-full">
					<Label
						htmlFor="search"
						className="text-sm font-medium text-gray-700 transition-colors group-focus-within:text-brand-base cursor-pointer"
					>
						Buscar
					</Label>
					<div className="relative w-full">
						<Search
							className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-gray-400 pointer-events-none
						transition-colors group-focus-within:text-brand-base"
						/>
						<Input
							id="search"
							placeholder="Buscar por descrição"
							value={filters.search}
							onChange={(e) =>
								onFilterChange({ ...filters, search: e.target.value })
							}
							className="h-12 rounded-xl border border-gray-300 bg-white text-[16px] text-gray-800 placeholder:text-gray-400 placeholder:front-normal pl-10 pr-3.5 transition-colors outline-none caret-brand-base focus:border-gray-300 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-gray-300 disabled:opacity-50"
						/>
					</div>
				</div>

				{/* 2. Tipo */}
				<div className="group flex flex-col gap-1.5 w-full">
					<Label
						htmlFor="type"
						className="text-sm font-medium text-gray-700 transition-colors group-focus-within:text-brand-base cursor-pointer"
					>Tipo
					</Label>
					<Select
						value={filters.type}
						onValueChange={(val) =>
							onFilterChange({
								...filters,
								type: (val ?? "ALL") as TransactionType | "ALL",
							})
						}
					>
						<SelectTrigger className="h-12 w-full rounded-xl border border-gray-300 bg-white p-3.5 text-[16px] text-gray-800 transition-colors outline-none cursor-pointer focus:border-gray-300 focus-visible:ring-0 focus-visible:ring-offset-0 disabled:opacity-50">
							<SelectValue placeholder="Todos">
								{filters.type === "ALL" && "Todos"}
								{filters.type === "EXPENSE" && "Despesa"}
								{filters.type === "INCOME" && "Receita"}
							</SelectValue>
						</SelectTrigger>
						<SelectContent
							side="bottom"
							align="start"
							sideOffset={4}
							alignItemWithTrigger={false}
							className="w-(--anchor-width) rounded-xl border border-gray-300 bg-white p-1.5 z-50"
						>
							<SelectItem value="ALL" className="cursor-pointer py-2 px-3 text-[16px] rounded-lg">
								Todos
							</SelectItem>
							<SelectItem value="EXPENSE" className="cursor-pointer py-2 px-3 text-[16px] rounded-lg ">
								Despesa
							</SelectItem>
							<SelectItem value="INCOME" className="cursor-pointer py-2 px-3 text-[16px] rounded-lg ">
								Receita
							</SelectItem>
						</SelectContent>
					</Select>
				</div>

				{/* 3. Categoria */}
				<div className="group flex flex-col gap-1.5 w-full">
					<Label className="text-sm font-medium text-gray-700 transition-colors group-focus-within:text-brand-base cursor-pointer">Categoria</Label>
					<Select
						value={filters.categoryId}
						onValueChange={(val) =>
							onFilterChange({ ...filters, categoryId: val ?? "ALL" })
						}
					>
						<SelectTrigger className="h-12 w-full rounded-xl border border-gray-300 bg-white p-3.5 text-[16px] text-gray-800 transition-colors outline-none cursor-pointer focus:border-gray-300 focus-visible:ring-0 focus-visible:ring-offset-0 disabled:opacity-50">
							<SelectValue placeholder="Todas">
								{filters.categoryId === "ALL"
									? "Todas"
									: categories.find((c) => c.id === filters.categoryId)?.name || "Todas"}
							</SelectValue>
						</SelectTrigger>
						<SelectContent
							side="bottom"
							align="start"
							sideOffset={4}
							alignItemWithTrigger={false}
							className="w-(--anchor-width) rounded-xl border border-gray-300 bg-white p-1.5 z-50 max-h-56 overflow-y-auto"
						>
							<SelectItem value="ALL" className="cursor-pointer py-2 px-3 text-[16px] rounded-lg">
								Todas
							</SelectItem>
							{categories.map((cat) => (
								<SelectItem
									key={cat.id}
									value={cat.id}
									className="cursor-pointer py-2 px-3 text-[16px] rounded-lg"
								>
									{cat.name}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>

				{/* 4. Período */}
				<div className="group flex flex-col gap-1.5 w-full">
					<Label className="text-sm font-medium text-gray-700 transition-colors group-focus-within:text-brand-base cursor-pointer">Período</Label>
					<Select
						value={filters.period}
						onValueChange={(val) =>
							onFilterChange({ ...filters, period: val ?? "ALL" })
						}
					>
						<SelectTrigger className="h-12 w-full rounded-xl border border-gray-300 bg-white p-3.5 text-[16px] text-gray-800 transition-colors outline-none cursor-pointer focus:border-gray-300 focus-visible:ring-0 focus-visible:ring-offset-0 disabled:opacity-50">
							<SelectValue placeholder="Todos">
								{formatPeriodLabel(filters.period)}
							</SelectValue>
						</SelectTrigger>
						<SelectContent
							side="bottom"
							align="start"
							sideOffset={4}
							alignItemWithTrigger={false}
							className="w-(--anchor-width) rounded-xl border border-gray-300 bg-white p-1.5 z-50 max-h-56 overflow-y-auto"
						>
							<SelectItem value="ALL" className="cursor-pointer py-2 px-3 text-[16px] rounded-lg">
								Todos
							</SelectItem>
							{availablePeriods.map((periodKey) => (
								<SelectItem
									key={periodKey}
									value={periodKey}
									className="cursor-pointer py-2 px-3 text-[16px] rounded-lg"
								>
									{formatPeriodLabel(periodKey)}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
			</div>

			{/* Botão limpar filtros caso algum esteja ativo */}
			{hasActiveFilters && (
				<div className="flex justify-end pt-1">
					<Button
						type="button"
						variant="ghost"
						onClick={handleClear}
						className="h-auto p-0 border-0 shadow-none text-gray-500 hover:text-gray-500 hover:bg-transparent hover:underline text-sm font-medium flex items-center gap-1.5 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
					>
						<X className="size-4" />
						<span>Limpar filtros</span>
					</Button>
				</div>
			)}
		</div>
	);
}