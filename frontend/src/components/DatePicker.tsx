import * as React from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Calendar } from "@/components/ui/calendar";

import { cn } from "@/lib/utils";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";

interface DatePickerProps {
	id?: string;
	date?: Date;
	onSelect: (date: Date | undefined) => void;
	disabled?: boolean;
	className?: string;
}

export function DatePicker({
	id,
	date,
	onSelect,
	disabled,
	className,
}: DatePickerProps) {
	const [open, setOpen] = React.useState(false);

	function handleSelect(selectedDate: Date | undefined) {
		onSelect(selectedDate);
		setOpen(false); // Fecha o calendário automaticamente ao escolher a data
	}

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger
				id={id}
				disabled={disabled}
				className={cn(
					"flex h-12 w-full items-center rounded-xl border border-gray-300 bg-white p-3.5 text-left text-[16px] transition-colors cursor-pointer outline-none focus:border-gray-300 focus-visible:ring-0 focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50",
					!date ? "text-gray-400" : "text-gray-800",
					className
				)}
			>
				<span>
					{date ? format(date, "dd/MM/yyyy") : "Selecione"}
				</span>
			</PopoverTrigger>

			<PopoverContent
				className="w-auto p-0 rounded-2xl bg-white border border-gray-200 shadow-lg z-50"
				align="start"
			>
				<Calendar
					mode="single"
					selected={date}
					onSelect={handleSelect}
					locale={ptBR}
				/>
			</PopoverContent>
		</Popover>
	);
}