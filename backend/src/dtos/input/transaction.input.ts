import { Field, Float, GraphQLISODateTime, InputType } from "type-graphql";

@InputType()
export class CreateTransactionInput {
    @Field(() => String)
    title!: string;

    @Field(() => Float)
    amount!: number;

    @Field(() => String)
    type!: string;

    @Field(() => String)
    categoryId!: string;

    @Field(() => GraphQLISODateTime, { nullable: true })
    updatedAt?: Date;
}

@InputType()
export class UpdateTransactionInput {
    @Field(() => String, { nullable: true })
    title?: string;

    @Field(() => Float, { nullable: true })
    amount?: number;

    @Field(() => String, { nullable: true })
    type?: string;

    @Field(() => String, { nullable: true })
    categoryId?: string;

    @Field(() => GraphQLISODateTime, { nullable: true })
    updatedAt?: Date;
}