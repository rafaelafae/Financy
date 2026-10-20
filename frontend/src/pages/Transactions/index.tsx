import { useState, useMemo } from "react";
import { useMutation, useQuery } from "@apollo/client/react";
import { toast } from "sonner";
import { Plus } from "lucide-react";

import { Page } from "@/components/Page";
import { Button } from "@/components/ui/button";
import { CreateTransactionDialog } from "./components/CreateTransactionDialog";
import { EditTransactionDialog } from "./components/EditTransactionDialog";
import {
	TransactionFilters,
	TransactionFilterValues,
} from "./components/TransactionFilters";
import { TransactionList } from "./components/TransactionList";
import { TransactionPagination } from "./components/TransactionPagination";

import { LIST_TRANSACTIONS } from "@/lib/graphql/queries/Transaction";
import { DELETE_TRANSACTION } from "@/lib/graphql/mutations/Transaction";
import { LIST_CATEGORIES } from "@/lib/graphql/queries/Category";
import { Category, Transaction } from "@/types";

const ITEMS_PER_PAGE = 8;

export function TransactionsPage() {
	const [openCreateDialog, setOpenCreateDialog] = useState(false);
	const [openEditDialog, setOpenEditDialog] = useState(false);
	const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);

	const [currentPage, setCurrentPage] = useState(1);
	const [filters, setFilters] = useState<TransactionFilterValues>({
		search: "",
		type: "ALL",
		categoryId: "ALL",
		period: "ALL",
	});

	const { data, loading, refetch } = useQuery<{ listTransactions: Transaction[] }>(
		LIST_TRANSACTIONS
	);

	const { data: categoriesData } = useQuery<{ listCategories: Category[] }>(
		LIST_CATEGORIES
	);

	const [deleteTransaction] = useMutation(DELETE_TRANSACTION, {
		refetchQueries: [{ query: LIST_TRANSACTIONS }],
		onCompleted() {
			toast.success("Transação excluída com sucesso!");
		},
		onError(error) {
			toast.error(error.message || "Erro ao excluir transação");
		},
	});

	function handleDelete(id: string) {
		if (window.confirm("Tem certeza que deseja excluir esta transação?")) {
			deleteTransaction({ variables: { id } });
		}
	}

	function handleOpenCreate() {
		setOpenCreateDialog(true);
	}

	function handleEdit(transaction: Transaction) {
		setSelectedTransaction(transaction);
		setOpenEditDialog(true);
	}

	function handleFilterChange(newFilters: TransactionFilterValues) {
		setFilters(newFilters);
		setCurrentPage(1);
	}

	const rawTransactions = data?.listTransactions || [];
	const categories = categoriesData?.listCategories || [];

	// Extrai os meses/anos únicos existentes nas transações para alimentar o Select
	const availablePeriods = useMemo(() => {
		const periodsSet = new Set<string>();
		rawTransactions.forEach((tx) => {
			const rawDate = tx.updatedAt ?? tx.createdAt;
			if (rawDate) {
				const date = new Date(rawDate);
				if (!isNaN(date.getTime())) {
					const year = date.getFullYear();
					const month = String(date.getMonth() + 1).padStart(2, "0");
					periodsSet.add(`${year}-${month}`);
				}
			}
		});
		return Array.from(periodsSet).sort().reverse();
	}, [rawTransactions]);

	const filteredTransactions = useMemo(() => {
		return rawTransactions.filter((tx) => {
			const matchesSearch =
				filters.search === "" ||
				tx.title.toLowerCase().includes(filters.search.toLowerCase());

			const matchesType =
				filters.type === "ALL" || tx.type === filters.type;

			const matchesCategory =
				filters.categoryId === "ALL" || tx.categoryId === filters.categoryId;

			let matchesPeriod = true;
			if (filters.period !== "ALL") {
				const rawDate = tx.updatedAt ?? tx.createdAt;
				if (rawDate) {
					const date = new Date(rawDate);
					if (!isNaN(date.getTime())) {
						const year = date.getFullYear();
						const month = String(date.getMonth() + 1).padStart(2, "0");
						matchesPeriod = `${year}-${month}` === filters.period;
					}
				}
			}

			return matchesSearch && matchesType && matchesCategory && matchesPeriod;
		});
	}, [rawTransactions, filters]);

	const totalPages = Math.ceil(filteredTransactions.length / ITEMS_PER_PAGE) || 1;
	const paginatedTransactions = useMemo(() => {
		const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
		return filteredTransactions.slice(startIndex, startIndex + ITEMS_PER_PAGE);
	}, [filteredTransactions, currentPage]);

	return (
		<Page>
			{/* Cabeçalho da Página */}
			<div className="flex flex-col sm:flex-row sm:items-center justify-between">
				<div>
					<h1 className="text-2xl font-bold tracking-tight text-gray-800">
						Transações
					</h1>
					<p className="font-normal text-gray-500 tracking-wider">
						Gerencie todas as suas transações financeiras
					</p>
				</div>

				<Button
					onClick={handleOpenCreate}
					disabled={loading}
					className="h-9 px-3 bg-brand-base hover:bg-brand-dark text-white rounded-xl font-medium text-sm flex items-center gap-1.5 cursor-pointer shadow-xs disabled:opacity-50 disabled:cursor-not-allowed"
				>
					<Plus className="size-4 shrink-0" />
					<span>Nova transação</span>
				</Button>
			</div>

			{/* Barra de Filtros */}
			<TransactionFilters
				filters={filters}
				onFilterChange={handleFilterChange}
				categories={categories}
				availablePeriods={availablePeriods}
			/>

			{/* Tabela de Transações */}
			<TransactionList
				transactions={paginatedTransactions}
				isLoading={loading}
				onEdit={handleEdit}
				onDelete={handleDelete}
				footer={
					<TransactionPagination
						currentPage={currentPage}
						totalPages={totalPages}
						totalItems={filteredTransactions.length}
						itemsPerPage={ITEMS_PER_PAGE}
						onPageChange={setCurrentPage}
					/>
				}
			/>


			{/* Modal de Criar Transação */}
			<CreateTransactionDialog
				open={openCreateDialog}
				onOpenChange={setOpenCreateDialog}
				onCreated={() => refetch()}
			/>

			{/* Modal de Editar Transação */}
			<EditTransactionDialog
				open={openEditDialog}
				onOpenChange={setOpenEditDialog}
				onUpdated={() => refetch()}
				transaction={selectedTransaction}
			/>
		</Page>
	);
}