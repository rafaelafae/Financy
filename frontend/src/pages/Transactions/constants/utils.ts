export function formatNumberToCurrency(value: number): string {
    if (value === 0) return "";
    return new Intl.NumberFormat("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(value);
}

export function formatCurrencyInput(value: string): string {
    const digits = value.replace(/\D/g, "");

    if (!digits) return "";

    const numberValue = Number(digits) / 100;

    return new Intl.NumberFormat("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(numberValue);
}

export function parseCurrencyToNumber(value: string): number {
    if (!value) return 0;
    const cleanString = value.replace(/\./g, "").replace(",", ".");
    return Number(cleanString) || 0;
}

export function formatDate(dateValue?: string | Date | null): string {
    if (!dateValue) return "-";

    const date = typeof dateValue === "string" ? new Date(dateValue) : dateValue;

    if (isNaN(date.getTime())) return "-";

    return date.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    });
}