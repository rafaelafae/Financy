import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TransactionPaginationProps {
	currentPage: number;
	totalPages: number;
	totalItems: number;
	itemsPerPage: number;
	onPageChange: (page: number) => void;
}

export function TransactionPagination({
	currentPage,
	totalPages,
	totalItems,
	itemsPerPage,
	onPageChange,
}: TransactionPaginationProps) {
	if (totalItems === 0) return null;

	const startItem = (currentPage - 1) * itemsPerPage + 1;
	const endItem = Math.min(currentPage * itemsPerPage, totalItems);

	const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

	return (
		<div className="flex items-center justify-between px-6 py-5">
			{/* Texto de contagem */}
			<span className="text-sm text-gray-700 font-medium">
				{startItem} <span className="font-normal!">a</span> {endItem} <span className="font-normal!">|</span> {totalItems} <span className="font-normal!">resultados</span>
			</span>

			{/* Controles de página */}
			<div className="flex items-center gap-2">
				<Button
					type="button"
					variant="outline"
					size="icon"
					onClick={() => onPageChange(currentPage - 1)}
					disabled={currentPage <= 1}
					className="size-8 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shadow-none"
				>
					<ChevronLeft className="size-4" />
				</Button>

				{pages.map((p) => {
					const isActive = p === currentPage;
					return (
						<Button
							key={p}
							type="button"
							variant={isActive ? "default" : "outline"}
							onClick={() => onPageChange(p)}
							className={`size-8 rounded-lg text-sm font-medium cursor-pointer shadow-none transition-colors ${isActive
								? "bg-brand-base hover:bg-brand-base text-white border-brand-base"
								: "bg-white border-gray-200 text-gray-700 hover:bg-gray-200"
								}`}
						>
							{p}
						</Button>
					);
				})}

				<Button
					type="button"
					variant="outline"
					size="icon"
					onClick={() => onPageChange(currentPage + 1)}
					disabled={currentPage >= totalPages}
					className="size-8 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shadow-none"
				>
					<ChevronRight className="size-4" />
				</Button>
			</div>
		</div>
	);
}