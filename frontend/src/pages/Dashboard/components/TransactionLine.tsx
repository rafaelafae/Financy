import { ReactNode } from "react";
import { CircleArrowDown, CircleArrowUp } from "lucide-react";
import { Card } from "@/components/ui/card";

export interface TransactionLineProps {
    id: string;
    title: string;
    date: string;
    category: string;
    categoryBadgeClass?: string;
    amount: number;
    type: "INCOME" | "EXPENSE";
    icon: ReactNode;
    iconBgClass?: string;
}

export function TransactionLine({
    title,
    date,
    category,
    categoryBadgeClass = "bg-emerald-50 text-emerald-700",
    amount,
    type,
    icon,
    iconBgClass = "bg-emerald-50 text-emerald-600",
}: TransactionLineProps) {
    const isIncome = type === "INCOME";

    const formattedAmount = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
    }).format(amount);

    return (
        <Card className="flex h-20 flex-row items-center justify-between border-0 rounded-none bg-transparent p-0 hover:bg-gray-50/50 transition-colors">

            <div className="flex flex-1 items-center gap-4 min-w-0 px-6">
                <div
                    className={`flex size-10 items-center justify-center rounded-xl shrink-0 ${iconBgClass}`}
                >
                    {icon}
                </div>
                <div className="min-w-0">
                    <h4 className="text-sm font-semibold text-gray-800 leading-tight truncate">
                        {title}
                    </h4>
                    <span className="text-xs text-gray-600">{date}</span>
                </div>
            </div>

            <div className="hidden sm:flex w-40 items-center justify-center shrink-0 px-6">
                <span
                    className={`rounded-full px-3 py-1 text-sm font-medium ${categoryBadgeClass}`}
                >
                    {category}
                </span>
            </div>

            <div className="flex w-40 items-center justify-end gap-2 shrink-0 px-6">
                <span className="text-sm font-bold text-gray-800 whitespace-nowrap">
                    {isIncome ? `+ ${formattedAmount}` : `- ${formattedAmount}`}
                </span>
                {isIncome ? (
                    <CircleArrowUp className="size-4.5 text-brand-base shrink-0" />
                ) : (
                    <CircleArrowDown className="size-4.5 text-tag-red-base shrink-0" />
                )}
            </div>
        </Card>
    );
}