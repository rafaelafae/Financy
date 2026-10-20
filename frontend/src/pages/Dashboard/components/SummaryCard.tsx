import { ReactNode } from "react";

import {
	Card,
	CardContent,
	CardHeader,
	CardTitle
} from "@/components/ui/card";

interface SummaryCardProps {
	title: string;
	amount: number;
	icon: ReactNode;
}

export function SummaryCard({ title, amount, icon }: SummaryCardProps) {
	const formattedAmount = new Intl.NumberFormat("pt-BR", {
		style: "currency",
		currency: "BRL",
	}).format(amount);

	return (
		<Card className="rounded-2xl border border-gray-200 bg-white p-6">
			<CardHeader className="flex flex-row items-center gap-2 p-0 space-y-0">
				{icon}
				<CardTitle className="text-xs font-semibold uppercase tracking-wider text-gray-500">
					{title}
				</CardTitle>
			</CardHeader>
			<CardContent className="p-0">
				<span className="text-2xl font-bold tracking-tight text-gray-800">
					{formattedAmount}
				</span>
			</CardContent>
		</Card>
	);
}