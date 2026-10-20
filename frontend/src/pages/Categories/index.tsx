import { useState, useMemo, createElement } from "react";
import { useMutation, useQuery } from "@apollo/client/react";
import { LIST_CATEGORIES } from "@/lib/graphql/queries/Category";
import { DELETE_CATEGORY } from "@/lib/graphql/mutations/Category";

import { Page } from "@/components/Page";
import { Button } from "@/components/ui/button";
import { CategorySummary } from "./components/CategorySummary";
import { CategoryCard } from "./components/CategoryCard";
import { CreateCategoryDialog } from "./components/CreateCategoryDialog";
import { EditCategoryDialog } from "./components/EditCategoryDialog";
import { CATEGORY_ICONS, getCategoryColor } from "./constants/utils";

import { toast } from "sonner";
import { Category } from "@/types";
import { Plus, Tag } from "lucide-react";

export function CategoriesPage() {
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  const { data, loading, refetch } = useQuery<{ listCategories: Category[] }>(LIST_CATEGORIES);

  const [deleteCategory] = useMutation(DELETE_CATEGORY, {
    refetchQueries: [{ query: LIST_CATEGORIES }],
    onCompleted() {
      toast.success("Categoria removida com sucesso!");
      refetch();
    },
    onError(error) {
      toast.error(error.message || "Falha ao remover categoria");
    },
  });

  const categories = data?.listCategories || [];

  // Cálculos dinâmicos em tempo real com ícone e cor
  const { totalTransactions, topCategoryName, topCategoryIcon, topCategoryColorClass } = useMemo(() => {
    if (categories.length === 0) {
      return {
        totalTransactions: 0,
        topCategoryName: "-",
        topCategoryIcon: undefined,
        topCategoryColorClass: undefined,
      };
    }

    let total = 0;
    let topCat: Category | null = null;
    let maxCount = -1;

    for (const cat of categories) {
      const count = cat.transactionCount ?? 0;
      total += count;

      if (count > maxCount) {
        maxCount = count;
        topCat = cat;
      }
    }

    const iconItem = topCat ? CATEGORY_ICONS.find((i) => i.id === topCat?.icon) : null;
    const iconElement = iconItem
      ? createElement(iconItem.icon, { className: "size-5" })
      : <Tag className="size-5" />;

    const colorObj = topCat ? getCategoryColor(topCat.color) : null;

    return {
      totalTransactions: total,
      topCategoryName: total > 0 && topCat ? topCat.name : "-",
      topCategoryIcon: total > 0 ? iconElement : undefined,
      topCategoryColorClass: total > 0 && colorObj ? colorObj.textClass : undefined,
    };
  }, [categories]);

  function handleOpenCreate() {
    setOpenCreateDialog(true);
  }

  function handleEdit(category: Category) {
    setSelectedCategory(category);
    setOpenEditDialog(true);
  }

  function handleDelete(id: string) {
    deleteCategory({
      variables: { id },
    });
  }

  return (
    <Page>
      {/* Cabeçalho da Página */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-800">
            Categorias
          </h1>
          <p className="font-normal text-gray-500 tracking-wider">
            Organize suas transações por categorias
          </p>
        </div>

        <Button
          onClick={handleOpenCreate}
          disabled={loading}
          className="h-9 px-3 bg-brand-base hover:bg-brand-dark text-white rounded-xl font-medium text-sm flex items-center gap-1.5 cursor-pointer shadow-xs disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Plus className="size-4 shrink-0" />
          <span>Nova categoria</span>
        </Button>
      </div>

      {/* Estatísticas do Topo */}
      <CategorySummary
        totalCategories={categories.length}
        totalTransactions={totalTransactions}
        topCategoryName={topCategoryName}
        topCategoryIcon={topCategoryIcon}
        topCategoryColorClass={topCategoryColorClass}
      />

      {/* Grid de Cards das Categorias */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {!loading &&
          categories.map((cat) => (
            <CategoryCard
              key={cat.id}
              id={cat.id}
              name={cat.name}
              description={cat.description}
              itemCount={cat.transactionCount ?? 0}
              icon={cat.icon}
              color={cat.color}
              onEdit={() => handleEdit(cat)}
              onDelete={handleDelete}
            />
          ))}

        {!loading && categories.length === 0 && (
          <p className="col-span-full py-8 text-center text-sm text-gray-500">
            Nenhuma categoria encontrada.
          </p>
        )}
      </section>

      {/* Modal de Criação */}
      <CreateCategoryDialog
        open={openCreateDialog}
        onOpenChange={setOpenCreateDialog}
        onCreated={() => refetch()}
      />

      {/* Modal de Edição */}
      <EditCategoryDialog
        open={openEditDialog}
        onOpenChange={setOpenEditDialog}
        onUpdated={() => refetch()}
        category={selectedCategory}
      />
    </Page>
  );
}