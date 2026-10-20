import { ReactNode } from "react";
import { Card } from "@/components/ui/card";

interface StatCardProps {
	icon: ReactNode;
	iconBgClass?: string;
	value: string | number;
	label: string;
}

export function StatCard({
	icon,
	iconBgClass = "text-gray-800",
	value,
	label,
}: StatCardProps) {
	return (
		<Card className="rounded-2xl border border-gray-200 bg-white p-6 flex flex-row shadow-xs h-26.5 gap-4 items-start">
			<div
				className={`flex size-8 items-center justify-center rounded-xl shrink-0 ${iconBgClass}`}
			>
				{icon}
			</div>
			<div className="flex flex-col">
				<span className="text-2xl font-bold tracking-tight text-gray-800">
					{value}
				</span>

				<span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
					{label}
				</span>
			</div>
		</Card>
	);
}