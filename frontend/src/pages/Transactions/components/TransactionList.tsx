import { createElement, ReactNode } from "react";
import { formatNumberToCurrency } from "../constants/utils";
import { CATEGORY_ICONS, getCategoryColor } from "../../Categories/constants/utils";

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

import { Transaction } from "@/types";
import {
	ArrowDownCircle,
	ArrowUpCircle,
	Edit,
	Tag,
	Trash,
} from "lucide-react";

// Formata para DD/MM/YY conforme o Figma (ex: 30/11/25)
function formatShortDate(dateString?: string | null): string {
	if (!dateString) return "-";
	const date = new Date(dateString);
	if (isNaN(date.getTime())) return "-";
	const day = String(date.getDate()).padStart(2, "0");
	const month = String(date.getMonth() + 1).padStart(2, "0");
	const year = String(date.getFullYear()).slice(-2);
	return `${day}/${month}/${year}`;
}

interface TransactionListProps {
	transactions: Transaction[];
	isLoading?: boolean;
	onEdit: (transaction: Transaction) => void;
	onDelete: (id: string) => void;
	footer?: ReactNode; // Slot para receber a paginação dentro do mesmo container
}

export function TransactionList({
	transactions,
	isLoading,
	onEdit,
	onDelete,
	footer,
}: TransactionListProps) {
	return (
		<div className="rounded-2xl border border-gray-200 bg-white overflow-hidden shadow-2xs">
			<Table className="table-fixed w-full">
				<TableHeader className="border-b border-gray-200">
					<TableRow className="hover:bg-transparent border-b border-gray-200">
						<TableHead className="text-xs font-medium text-gray-500 uppercase tracking-wider py-5 px-6 w-full text-left whitespace-nowrap">
							Descrição
						</TableHead>
						<TableHead className="text-xs font-medium text-gray-500 uppercase tracking-wider py-5 px-6 w-[112px] text-right whitespace-nowrap">
							Data
						</TableHead>
						<TableHead className="text-xs font-medium text-gray-500 uppercase tracking-wider py-5 px-6 w-[200px] text-center whitespace-nowrap">
							Categoria
						</TableHead>
						<TableHead className="text-xs font-medium text-gray-500 uppercase tracking-wider py-5 px-6 w-[136px] text-center whitespace-nowrap">
							Tipo
						</TableHead>
						<TableHead className="text-xs font-medium text-gray-500 uppercase tracking-wider py-5 px-6  w-[200px] text-right whitespace-nowrap">
							Valor
						</TableHead>
						<TableHead className="text-xs font-medium text-gray-500 uppercase tracking-wider py-5 px-6 w-[120px] text-right whitespace-nowrap">
							Ações
						</TableHead>
					</TableRow>
				</TableHeader>

				<TableBody>
					{isLoading ? (
						<TableRow>
							<TableCell colSpan={6} className="h-40 text-center text-[16px] text-gray-500">
								Carregando transações...
							</TableCell>
						</TableRow>
					) : transactions.length === 0 ? (
						<TableRow>
							<TableCell colSpan={6} className="h-40 text-center text-[16px] text-gray-500">
								Nenhuma transação encontrada.
							</TableCell>
						</TableRow>
					) : (
						transactions.map((tx) => {
							const isIncome = tx.type === "INCOME";
							const categoryColor = getCategoryColor(tx.category?.color ?? "");
							const iconObj = CATEGORY_ICONS.find((i) => i.id === tx.category?.icon);

							return (
								<TableRow
									key={tx.id}
									className="hover:bg-gray-50/50 transition-colors border-b border-gray-100 last:border-b-0"
								>
									{/* Descrição com ícone da Categoria */}
									<TableCell className="px-6 w-full">
										<div className="flex items-center gap-4">
											<div
												className={`size-10 rounded-xl flex items-center justify-center shrink-0 ${categoryColor.bgClass} ${categoryColor.textClass}`}
											>
												{iconObj ? (
													createElement(iconObj.icon, { className: "size-4" })
												) : (
													<Tag className="size-4" />
												)}
											</div>
											<span className="text-[16px] font-medium text-gray-800">
												{tx.title}
											</span>
										</div>
									</TableCell>

									{/* Data formato DD/MM/YY */}
									<TableCell className="px-6 text-sm font-normal text-gray-600 w-[112px] whitespace-nowrap">
										{formatShortDate(tx.updatedAt ?? tx.createdAt)}
									</TableCell>

									{/* Categoria Badge */}
									<TableCell className="px-6 w-[200px] text-center whitespace-nowrap">
										{tx.category ? (
											<span
												className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-normal ${categoryColor.bgClass} ${categoryColor.textClass}`}
											>
												{tx.category.name}
											</span>
										) : (
											<span className="text-sm font-normal text-gray-400">Sem categoria</span>
										)}
									</TableCell>

									{/* Tipo: Entrada / Saída */}
									<TableCell className="px-6 w-[136px] text-center whitespace-nowrap">
										{isIncome ? (
											<div className="inline-flex items-center gap-2 text-sm font-medium text-tag-green-base">
												<ArrowUpCircle className="size-4 shrink-0 text-tag-green-base" />
												<span>Entrada</span>
											</div>
										) : (
											<div className="inline-flex items-center gap-2 text-sm font-medium text-tag-red-base">
												<ArrowDownCircle className="size-4 shrink-0 text-tag-red-base" />
												<span>Saída</span>
											</div>
										)}
									</TableCell>

									{/* Valor */}
									<TableCell className="px-6 text-right text-sm font-semibold text-gray-800 whitespace-nowrap w-[200px]">
										{isIncome
											? `+ R$ ${formatNumberToCurrency(tx.amount)}`
											: `- R$ ${formatNumberToCurrency(tx.amount)}`}
									</TableCell>

									{/* Ações */}
									<TableCell className="px-6 text-right w-[120px]">
										<div className="flex items-center justify-between gap-2">
											<Button
												type="button"
												variant="ghost"
												size="icon"
												onClick={() => onDelete(tx.id)}
												className="size-8 rounded-lg border border-gray-300 shadow-none text-tag-red-base  hover:bg-gray-200 hover:text-tag-red-base transition-colors cursor-pointer"
											>
												<Trash className="size-4" />
											</Button>

											<Button
												type="button"
												variant="ghost"
												size="icon"
												onClick={() => onEdit(tx)}
												className="size-8 rounded-lg border border-gray-300 shadow-none text-gray-700  hover:bg-gray-200 hover:text-gray-700 transition-colors cursor-pointer"
											>
												<Edit className="size-4" />
											</Button>
										</div>
									</TableCell>
								</TableRow>
							);
						})
					)}
				</TableBody>
			</Table>

			{/* Rodapé da Paginação encaixado na última linha do container */}
			{
				footer && (
					<div className="border-t border-gray-200 bg-white">
						{footer}
					</div>
				)
			}
		</div >
	);
}