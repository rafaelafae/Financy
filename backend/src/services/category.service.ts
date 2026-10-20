import { prismaClient } from "../../prisma/prisma";
import { CreateCategoryInput } from "../dtos/input/category.input";


export class CategoryService {

    async createCategory(userId: string, data: CreateCategoryInput) {
        const existingCategory = await prismaClient.category.findUnique({
            where: {
                name_userId: {
                    name: data.name,
                    userId
                }
            }
        });

        if (existingCategory) throw new Error("Categoria já cadastrada");

        return prismaClient.category.create({
            data: {
                name: data.name,
                description: data.description,
                icon: data.icon,
                color: data.color,
                userId
            },
        });
    };

    async updateCategory(id: string, userId: string, data: CreateCategoryInput) {
        const existingCategory = await prismaClient.category.findFirst({
            where: {
                id,
                userId
            }
        });

        if (!existingCategory) throw new Error("Categoria não encontrada");

        if (data.name && data.name !== existingCategory.name) {
            const nameConflict = await prismaClient.category.findUnique({
                where: {
                    name_userId: {
                        name: data.name,
                        userId,
                    },
                },
            });

            if (nameConflict) throw new Error("Já existe uma categoria com este nome");
        }

        return prismaClient.category.update({
            where: {
                id
            },
            data: {
                name: data.name ?? existingCategory.name,
                description: data.description !== undefined ? data.description : existingCategory.description,
                icon: data.icon ?? existingCategory.icon,
                color: data.color ?? existingCategory.color,
            },
        })
    };

    async deleteCategory(id: string, userId: string) {
        const existingCategory = await prismaClient.category.findFirst({
            where: {
                id,
                userId
            }
        });

        if (!existingCategory) throw new Error("Categoria não encontrada");

        await prismaClient.category.delete({
            where: {
                id
            }
        });

        return true;
    }

    async listCategories(userId: string) {
        const categories = await prismaClient.category.findMany({
            where: {
                userId
            },
            include: {
                _count: {
                    select: {
                        transactions: true,
                    },
                },
            },
            orderBy: {
                name: "asc"
            }
        });

        return categories.map((cat) => ({
            ...cat,
            transactionCount: cat._count.transactions,
        }));
    };
}