import { createElement } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Plus, Tag } from "lucide-react";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TransactionLine } from "./TransactionLine";
import { Transaction } from "@/types";
import { CATEGORY_ICONS, getCategoryColor } from "@/pages/Categories/constants/utils";

function formatShortDate(dateString?: string | null): string {
	if (!dateString) return "-";
	const date = new Date(dateString);
	if (isNaN(date.getTime())) return "-";
	const day = String(date.getDate()).padStart(2, "0");
	const month = String(date.getMonth() + 1).padStart(2, "0");
	const year = String(date.getFullYear()).slice(-2);
	return `${day}/${month}/${year}`;
}

interface RecentTransactionProps {
	transactions: Transaction[];
	onOpenCreate: () => void;
}

export function RecentTransaction({ transactions, onOpenCreate }: RecentTransactionProps) {
	const recentList = transactions.slice(0, 5);

	return (
		<Card className="rounded-2xl border border-gray-200 bg-white flex flex-col p-0!">
			<div>
				{/* Cabeçalho */}
				<CardHeader className="flex flex-row items-center justify-between border-b border-gray-200 pl-6 pr-3 py-5! space-y-0">
					<CardTitle className="text-xs font-semibold uppercase tracking-wider text-gray-500">
						Transações Recentes
					</CardTitle>
					<Link
						to="/transactions"
						className="flex items-center gap-1 text-xs font-medium text-brand-base hover:underline hover:underline-offset-2"
					>
						Ver todas
						<ChevronRight className="size-5" />
					</Link>
				</CardHeader>

				{/* Lista de Transações */}
				<CardContent className="p-0 divide-y divide-gray-200">
					{recentList.length === 0 ? (
						<div className="py-12 text-center text-sm text-gray-400">
							Nenhuma transação recente encontrada.
						</div>
					) : (
						recentList.map((tx) => {
							const categoryColor = getCategoryColor(tx.category?.color ?? "");
							const iconObj = CATEGORY_ICONS.find((i) => i.id === tx.category?.icon);

							return (
								<TransactionLine
									key={tx.id}
									id={tx.id}
									title={tx.title}
									date={formatShortDate(tx.updatedAt ?? tx.createdAt)}
									category={tx.category?.name ?? "Sem categoria"}
									categoryBadgeClass={`${categoryColor.bgClass} ${categoryColor.textClass}`}
									amount={tx.amount}
									type={tx.type as "INCOME" | "EXPENSE"}
									icon={
										iconObj ? (
											createElement(iconObj.icon, { className: "size-5" })
										) : (
											<Tag className="size-5" />
										)
									}
									iconBgClass={`${categoryColor.bgClass} ${categoryColor.textClass}`}
								/>
							);
						})
					)}
				</CardContent>

				{/* Botão de Rodapé */}
				<CardFooter className="h-15 border-t border-gray-200 bg-white px-6 py-5 flex justify-center">
					<Button
						type="button"
						variant="ghost"
						onClick={onOpenCreate}
						className="h-auto p-0 text-brand-base hover:text-brand-base hover:underline hover:underline-offset-2 hover:bg-transparent font-medium text-sm flex items-center gap-1.5 cursor-pointer"
					>
						<Plus className="size-5" />
						Nova transação
					</Button>
				</CardFooter>
			</div>
		</Card>
	);
}