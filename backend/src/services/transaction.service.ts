import { prismaClient } from "../../prisma/prisma";
import { CreateTransactionInput, UpdateTransactionInput } from "../dtos/input/transaction.input";

export class TransactionService {

    async createTransaction(userId: string, data: CreateTransactionInput) {
        const category = await prismaClient.category.findFirst({
            where: {
                id: data.categoryId,
                userId,
            },
        });

        if (!category) throw new Error("Categoria não encontrada");

        return prismaClient.transaction.create({
            data: {
                title: data.title,
                amount: data.amount,
                type: data.type,
                categoryId: data.categoryId,
                userId,
                updatedAt: data.updatedAt ? new Date(data.updatedAt) : undefined,
            },
            include: {
                category: true,
            },
        });
    };

    async updateTransaction(id: string, userId: string, data: UpdateTransactionInput) {
        const existingTransaction = await prismaClient.transaction.findFirst({
            where: {
                id,
                userId,
            },
        });

        if (!existingTransaction) throw new Error("Transação não encontrada");

        if (data.categoryId) {
            const category = await prismaClient.category.findFirst({
                where: {
                    id: data.categoryId,
                    userId,
                },
            });

            if (!category) throw new Error("Categoria não encontrada");
        }

        return prismaClient.transaction.update({
            where: {
                id,
            },
            data: {
                title: data.title,
                amount: data.amount,
                type: data.type,
                categoryId: data.categoryId,
                updatedAt: data.updatedAt ? new Date(data.updatedAt) : new Date(),
            },
            include: {
                category: true,
            },
        });
    }

    async deleteTransaction(id: string, userId: string) {
        const existingTransaction = await prismaClient.transaction.findFirst({
            where: {
                id,
                userId,
            },
        });

        if (!existingTransaction) throw new Error("Transação não encontrada");

        await prismaClient.transaction.delete({
            where: {
                id,
            },
        });

        return true;
    };

    async listTransactions(userId: string) {
        return prismaClient.transaction.findMany({
            where: {
                userId,
            },
            include: {
                category: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        });
    };

}