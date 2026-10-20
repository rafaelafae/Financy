export interface CategoryLineProps {
	id: string;
	name: string;
	itemCount: number;
	amount: number;
	badgeClass?: string;
}

export function CategoryLine({
	name,
	itemCount,
	amount,
	badgeClass = "bg-blue-50 text-blue-700",
}: CategoryLineProps) {
	const formattedAmount = new Intl.NumberFormat("pt-BR", {
		style: "currency",
		currency: "BRL",
	}).format(amount);

	return (
		<div className="flex h-7 items-center justify-between transition-colors">
			{/* Badge da Categoria */}
			<div className="flex items-center min-w-0">
				<span className={`rounded-full px-3 py-1 text-sm font-medium ${badgeClass}`}>
					{name}
				</span>
			</div>

			{/* Quantidade de itens + Valor total */}
			<div className="flex items-center gap-6 shrink-0">
				<span className="text-xs text-gray-500 whitespace-nowrap">
					{itemCount} {itemCount === 1 ? "item" : "itens"}
				</span>
				<span className="text-sm font-bold text-gray-800 whitespace-nowrap min-w-22.5 text-right">
					{formattedAmount}
				</span>
			</div>
		</div>
	);
}