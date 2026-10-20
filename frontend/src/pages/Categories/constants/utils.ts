import {
    BriefcaseBusiness,
    CarFront,
    HeartPulse,
    PiggyBank,
    ShoppingCart,
    Ticket,
    ToolCase,
    Utensils,
    PawPrint,
    House,
    Gift,
    Dumbbell,
    BookOpen,
    BaggageClaim,
    Mailbox,
    ReceiptText,
    LucideIcon,
} from "lucide-react";

export interface IconOption {
    id: string;
    icon: LucideIcon;
}

export const CATEGORY_ICONS: IconOption[] = [
    { id: "briefcase", icon: BriefcaseBusiness },
    { id: "car", icon: CarFront },
    { id: "heart", icon: HeartPulse },
    { id: "piggyBank", icon: PiggyBank },
    { id: "shoppingCart", icon: ShoppingCart },
    { id: "ticket", icon: Ticket },
    { id: "gift", icon: Gift },
    { id: "utensils", icon: Utensils },
    { id: "pawPrint", icon: PawPrint },
    { id: "home", icon: House },
    { id: "dumbbell", icon: Dumbbell },
    { id: "bookOpen", icon: BookOpen },
    { id: "toolCase", icon: ToolCase },
    { id: "shoppingBag", icon: BaggageClaim },
    { id: "mailbox", icon: Mailbox },
    { id: "receipt", icon: ReceiptText },
];

export function getCategoryIcon(iconId: string): LucideIcon {
    const found = CATEGORY_ICONS.find((item) => item.id === iconId);
    return found ? found.icon : Utensils;
}


export interface ColorOption {
    id: string;
    dotBgClass: string;     // Cor sólida do botão no modal
    bgClass: string;        // Fundo suave do badge e do container do ícone
    textClass: string;      // Cor do texto e do ícone
    borderClass: string;    // Borda ao selecionar
}

export const CATEGORY_COLORS: ColorOption[] = [
    {
        id: "green",
        dotBgClass: "bg-tag-green-base",
        bgClass: "bg-tag-green-light",
        textClass: "text-tag-green-dark",
        borderClass: "border-tag-green-base",
    },
    {
        id: "blue",
        dotBgClass: "bg-tag-blue-base",
        bgClass: "bg-tag-blue-light",
        textClass: "text-tag-blue-dark",
        borderClass: "border-tag-blue-base",
    },
    {
        id: "purple",
        dotBgClass: "bg-tag-purple-base",
        bgClass: "bg-tag-purple-light",
        textClass: "text-tag-purple-dark",
        borderClass: "border-tag-purple-base",
    },
    {
        id: "pink",
        dotBgClass: "bg-tag-pink-base",
        bgClass: "bg-tag-pink-light",
        textClass: "text-tag-pink-dark",
        borderClass: "border-tag-pink-base",
    },
    {
        id: "red",
        dotBgClass: "bg-tag-red-base",
        bgClass: "bg-tag-red-light",
        textClass: "text-tag-red-dark",
        borderClass: "border-tag-red-base",
    },
    {
        id: "orange",
        dotBgClass: "bg-tag-orange-base",
        bgClass: "bg-tag-orange-light",
        textClass: "text-tag-orange-dark",
        borderClass: "border-tag-orange-base",
    },
    {
        id: "yellow",
        dotBgClass: "bg-tag-yellow-base",
        bgClass: "bg-tag-yellow-light",
        textClass: "text-tag-yellow-dark",
        borderClass: "border-tag-yellow-base",
    },
];

export function getCategoryColor(colorId: string) {
    return (
        CATEGORY_COLORS.find((c) => c.id === colorId) ?? CATEGORY_COLORS[0]
    );
}