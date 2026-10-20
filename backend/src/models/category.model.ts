import { Field, GraphQLISODateTime, ID, Int, ObjectType } from "type-graphql";


@ObjectType()
export class CategoryModel {

    @Field(() => ID)
    id!: string

    @Field(() => String)
    name!: string

    @Field(() => String, { nullable: true })
    description?: string | null

    @Field(() => String)
    icon!: string

    @Field(() => String)
    color!: string

    @Field(() => String)
    userId!: string

    @Field(() => Int, { defaultValue: 0 })
    transactionCount!: number

    @Field(() => GraphQLISODateTime)
    createdAt!: Date

    @Field(() => GraphQLISODateTime)
    updatedAt!: Date
}