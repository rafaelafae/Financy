import { useState, useMemo } from "react";
import { useQuery } from "@apollo/client/react";

import { Page } from "@/components/Page";
import { FinancialSummary } from "./components/FinancialSummary";
import { RecentTransaction } from "./components/RecentTransaction";
import { CategorySummary, DashboardCategoryItem } from "./components/CategorySummary";
import { CreateTransactionDialog } from "@/pages/Transactions/components/CreateTransactionDialog";

import { LIST_TRANSACTIONS } from "@/lib/graphql/queries/Transaction";
import { LIST_CATEGORIES } from "@/lib/graphql/queries/Category";
import { Category, Transaction } from "@/types";
import { getCategoryColor } from "@/pages/Categories/constants/utils";

export function Dashboard() {
	const [openCreateDialog, setOpenCreateDialog] = useState(false);

	const { data: txData, refetch: refetchTransactions } = useQuery<{
		listTransactions: Transaction[];
	}>(LIST_TRANSACTIONS);

	const { data: catData, refetch: refetchCategories } = useQuery<{
		listCategories: Category[];
	}>(LIST_CATEGORIES);

	const transactions = txData?.listTransactions || [];
	const categories = catData?.listCategories || [];

	// Cálculos financeiros e resumos
	const { totalBalance, monthlyIncome, monthlyExpenses, sortedRecentTransactions, dashboardCategories } =
		useMemo(() => {
			const now = new Date();
			const currentYear = now.getFullYear();
			const currentMonth = now.getMonth();

			let balance = 0;
			let income = 0;
			let expenses = 0;

			// Agrupador para totais de categorias
			const categoryTotals = new Map<string, { count: number; totalAmount: number }>();

			transactions.forEach((tx) => {
				const isIncome = tx.type === "INCOME";

				// Saldo Geral Total
				if (isIncome) {
					balance += tx.amount;
				} else {
					balance -= tx.amount;
				}

				// Verifica competência do mês atual
				const rawDate = tx.updatedAt ?? tx.createdAt;
				if (rawDate) {
					const txDate = new Date(rawDate);
					if (
						!isNaN(txDate.getTime()) &&
						txDate.getFullYear() === currentYear &&
						txDate.getMonth() === currentMonth
					) {
						if (isIncome) {
							income += tx.amount;
						} else {
							expenses += tx.amount;
						}
					}
				}

				// Agrupamento por categoria
				if (tx.categoryId) {
					const current = categoryTotals.get(tx.categoryId) || { count: 0, totalAmount: 0 };
					categoryTotals.set(tx.categoryId, {
						count: current.count + 1,
						totalAmount: current.totalAmount + tx.amount,
					});
				}
			});

			// Ordena transações recentes pela data decrescente
			const sortedRecent = [...transactions].sort((a, b) => {
				const rawDateA = a.updatedAt ?? a.createdAt;
				const rawDateB = b.updatedAt ?? b.createdAt;

				const dateA = rawDateA ? new Date(rawDateA).getTime() : 0;
				const dateB = rawDateB ? new Date(rawDateB).getTime() : 0;

				return dateB - dateA;
			});

			// Mapeia os dados das categorias para a listagem lateral
			const categoryList: DashboardCategoryItem[] = categories
				.map((cat) => {
					const aggregated = categoryTotals.get(cat.id) || { count: 0, totalAmount: 0 };
					const colorObj = getCategoryColor(cat.color);

					return {
						id: cat.id,
						name: cat.name,
						itemCount: aggregated.count,
						amount: aggregated.totalAmount,
						badgeClass: `${colorObj.bgClass} ${colorObj.textClass}`,
					};
				})
				.filter((cat) => cat.itemCount > 0)
				.sort((a, b) => b.amount - a.amount);

			return {
				totalBalance: balance,
				monthlyIncome: income,
				monthlyExpenses: expenses,
				sortedRecentTransactions: sortedRecent,
				dashboardCategories: categoryList,
			};
		}, [transactions, categories]);

	function handleTransactionCreated() {
		refetchTransactions();
		refetchCategories();
	}

	return (
		<Page>
			{/* 3 Cards de Resumo Financeiro */}
			<FinancialSummary
				totalBalance={totalBalance}
				monthlyIncome={monthlyIncome}
				monthlyExpenses={monthlyExpenses}
			/>

			{/* Grid: Transações Recentes e Categorias */}
			<section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
				<div className="lg:col-span-2">
					<RecentTransaction
						transactions={sortedRecentTransactions}
						onOpenCreate={() => setOpenCreateDialog(true)}
					/>
				</div>

				<div className="lg:col-span-1">
					<CategorySummary categories={dashboardCategories} />
				</div>
			</section>

			{/* Modal para criar nova transação a partir do dashboard */}
			<CreateTransactionDialog
				open={openCreateDialog}
				onOpenChange={setOpenCreateDialog}
				onCreated={handleTransactionCreated}
			/>
		</Page>
	);
}