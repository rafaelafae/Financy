import { createElement } from "react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
    getCategoryColor,
    getCategoryIcon
} from "../constants/utils";

import {
    Edit,
    Trash
} from "lucide-react";

export interface CategoryCardProps {
    id: string
    name: string
    description?: string | null
    itemCount: number
    icon: string
    color: string
    onEdit?: (id: string) => void
    onDelete?: (id: string) => void
}


export function CategoryCard({
    id,
    name,
    description,
    itemCount,
    icon,
    color,
    onEdit,
    onDelete,
}: CategoryCardProps) {
    const Icon = getCategoryIcon(icon);
    const colorConfig = getCategoryColor(color);

    return (
        <Card className="rounded-2xl border border-gray-200 bg-white p-6 flex flex-col justify-between shadow-xs h-max[226px] w-max-[284px] gap-5">

            {/* Topo do Card: Ícone e Ações */}
            <div className="flex items-start h-10 justify-between">
                <div
                    className={`flex size-10 items-center justify-center rounded-xl shrink-0 ${colorConfig.bgClass} ${colorConfig.textClass}`}
                >
                    {createElement(Icon, { className: "size-5 shrink-0" })}
                </div>

                <div className="flex items-start gap-2">
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => onDelete?.(id)}
                        className="size-8 rounded-lg border-gray-300 bg-white text-danger hover:bg-gray-200 hover:text-danger cursor-pointer"
                    >
                        <Trash className="size-4" />
                    </Button>

                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => onEdit?.(id)}
                        className="size-8 rounded-lg border-gray-300 bg-white text-gray-700  hover:bg-gray-200 hover:text-gray-700 cursor-pointer"
                    >
                        <Edit className="size-4" />
                    </Button>
                </div>
            </div>

            {/* Título e Descrição */}
            <div className="flex flex-col items-start gap-1 h-17">
                <h3 className="text-base font-semibold text-gray-800 leading-tight">
                    {name}
                </h3>

                <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
                    {description}
                </p>
            </div>

            {/* Base: Badge e contagem de itens */}
            <div className="flex items-center justify-between">
                <span
                    className={`rounded-full px-3 py-1 text-sm font-medium ${colorConfig.bgClass} ${colorConfig.textClass}`}
                >
                    {name}
                </span>

                <span className="text-sm text-gray-600">
                    {itemCount} {itemCount === 1 ? "item" : "itens"}
                </span>
            </div>
        </Card>
    );
}