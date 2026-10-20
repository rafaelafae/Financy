import { CircleArrowDown, CircleArrowUp, Wallet } from "lucide-react";
import { SummaryCard } from "./SummaryCard";

interface FinancialSummaryProps {
    totalBalance?: number;
    monthlyIncome?: number;
    monthlyExpenses?: number;
}

export function FinancialSummary({
    totalBalance = 12847.32,
    monthlyIncome = 4250.0,
    monthlyExpenses = 2180.45,
}: FinancialSummaryProps) {
    return (
        <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <SummaryCard
                title="Saldo Total"
                amount={totalBalance}
                icon={<Wallet className="size-5 text-[#8257E5]" />}
            />

            <SummaryCard
                title="Receitas do Mês"
                amount={monthlyIncome}
                icon={<CircleArrowUp className="size-5 text-emerald-600" />}
            />

            <SummaryCard
                title="Despesas do Mês"
                amount={monthlyExpenses}
                icon={<CircleArrowDown className="size-5 text-rose-500" />}
            />
        </section>
    );
}