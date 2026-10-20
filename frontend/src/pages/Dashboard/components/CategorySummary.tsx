import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CategoryLine } from "./CategoryLine";

export interface DashboardCategoryItem {
	id: string;
	name: string;
	itemCount: number;
	amount: number;
	badgeClass?: string;
}

interface CategorySummaryProps {
	categories: DashboardCategoryItem[];
}

export function CategorySummary({ categories }: CategorySummaryProps) {
	return (
		<Card className="rounded-2xl border border-gray-200 bg-white flex flex-col p-0!">
			<div>
				{/* Cabeçalho */}
				<CardHeader className="flex flex-row items-center justify-between border-b border-gray-200 pl-6 pr-3 py-5! space-y-0">
					<CardTitle className="text-xs font-semibold uppercase tracking-wider text-gray-500">
						Categorias
					</CardTitle>
					<Link
						to="/categories"
						className="flex items-center gap-1 text-xs font-medium text-brand-base hover:underline hover:underline-offset-2"
					>
						Gerenciar
						<ChevronRight className="size-5" />
					</Link>
				</CardHeader>

				{/* Lista de Categorias */}
				<CardContent className="flex flex-col gap-6 divide-y-0 p-6">
					{categories.length === 0 ? (
						<div className="py-8 text-center text-sm text-gray-400">
							Nenhuma categoria com movimentação.
						</div>
					) : (
						categories.slice(0, 5).map((category) => (
							<CategoryLine
								key={category.id}
								id={category.id}
								name={category.name}
								itemCount={category.itemCount}
								amount={category.amount}
								badgeClass={category.badgeClass}
							/>
						))
					)}
				</CardContent>
			</div>
		</Card>
	);
}