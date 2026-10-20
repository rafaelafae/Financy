import { ReactNode } from "react";
import { ArrowUpDown, Tag } from "lucide-react";
import { StatCard } from "./StatCard";

interface CategorySummaryProps {
	totalCategories: number;
	totalTransactions: number;
	topCategoryIcon?: ReactNode;
	topCategoryColorClass?: string;
	topCategoryName?: string;
}

export function CategorySummary({
	totalCategories = 0,
	totalTransactions = 0,
	topCategoryIcon,
	topCategoryColorClass,
	topCategoryName = "-",
}: CategorySummaryProps) {
	return (
		<section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
			<StatCard
				icon={<Tag className="size-5" />}
				iconBgClass="text-gray-800"
				value={totalCategories}
				label="Total de Categorias"
			/>

			<StatCard
				icon={<ArrowUpDown className="size-5" />}
				iconBgClass="text-purple-600"
				value={totalTransactions}
				label="Total de Transações"
			/>

			<StatCard
				icon={topCategoryIcon ?? <Tag className="size-5" />}
				iconBgClass={topCategoryColorClass ?? "text-tag-green-base"}
				value={topCategoryName}
				label="Categoria Mais Utilizada"
			/>
		</section>
	);
}