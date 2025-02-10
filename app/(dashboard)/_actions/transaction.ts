"use server";

import {CreateTransactionSchema, CreateTransactionSchemaType} from "@/schema/transaction";
import {currentUser} from "@clerk/nextjs/server";
import {redirect} from "next/navigation";
import {prisma} from "@/lib/prisma";

export async function CreateTransaction(form: CreateTransactionSchemaType){
    const parsedBody = CreateTransactionSchema.safeParse(form);

    if(!parsedBody.success){
        throw new Error(parsedBody.error.message);
    }

    const user = await currentUser();

    if(!user){
        redirect("/sign-in")
    }
    const {amount, type, description, category, date} = parsedBody.data;

    const categoryRow = await prisma.category.findFirst({
        where:{
            userId: user.id,
            name: category
        }
    })

    if(!categoryRow){
        throw new Error("Category not found");
    }

   await prisma.$transaction([
       // Create transaction
       prisma.transaction.create({
           data: {
               userId: user.id,
               amount,
               type,
               description: description || "",
               category: categoryRow.name,
               categoryIcon: categoryRow.icon,
               date
           }
       }),

       // Update Aggregate
   ])
}