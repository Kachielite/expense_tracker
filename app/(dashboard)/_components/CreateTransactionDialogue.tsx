"use client";

import {TransactionType} from "@/lib/types";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {cn} from "@/lib/utils";
import {CreateTransactionSchema, CreateTransactionSchemaType} from "@/schema/transaction";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormField, FormLabel, FormControl, FormItem, FormDescription} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import CategoryPicker from "@/app/(dashboard)/_components/CategoryPicker";

type Props = {
    trigger: React.ReactNode,
    type: TransactionType
}

export default function CreateTransactionDialogue({trigger, type}: Props){

    const form = useForm<CreateTransactionSchemaType>({
        resolver: zodResolver(CreateTransactionSchema),
        defaultValues: {
            type,
            date: new Date()
        }
    })

    return(
        <Dialog>
            <DialogTrigger asChild>
                {trigger}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Create new{" "}
                        <span
                            className={cn("m-1.5", type === "income" ? "text-emerald-500" : "text-red-500")}
                        >
                            {type}
                        </span>
                        transaction
                    </DialogTitle>
                    <DialogDescription/>
                </DialogHeader>
                <Form {...form}>
                    <form className="space-y-4">
                        <FormField
                            control={form.control}
                            name="description"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Input defaultValue={""} {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Transaction description (optional)
                                    </FormDescription>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Amount</FormLabel>
                                    <FormControl>
                                        <Input defaultValue={0} type="number" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Transactional amount (required)
                                    </FormDescription>
                                </FormItem>
                            )}
                        />
                        <div className="flex items-center justify-between gap-2">
                            <FormField
                                control={form.control}
                                name="category"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Category</FormLabel>
                                        <FormControl>
                                            <CategoryPicker type={type}/>
                                        </FormControl>
                                        <FormDescription>
                                            Select category for this transaction
                                        </FormDescription>
                                    </FormItem>
                                )}
                            />
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}