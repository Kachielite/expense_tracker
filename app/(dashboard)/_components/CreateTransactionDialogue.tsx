"use client";

import {TransactionType} from "@/lib/types";
import {
    Dialog, DialogClose,
    DialogContent,
    DialogDescription, DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {cn} from "@/lib/utils";
import {CreateTransactionSchema, CreateTransactionSchemaType} from "@/schema/transaction";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormField, FormLabel, FormControl, FormItem, FormDescription, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import CategoryPicker from "@/app/(dashboard)/_components/CategoryPicker";
import {useCallback} from "react";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Button} from "@/components/ui/button";
import {format} from "date-fns";
import {CalendarIcon, Loader2} from "lucide-react";
import {Calendar} from "@/components/ui/calendar";

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
    });

    const handleCategoryChange = useCallback((value: string) => {
        form.setValue("category", value)
    }, [form]);

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
                                render={() => (
                                    <FormItem>
                                        <FormLabel className="mr-2">Category</FormLabel>
                                        <FormControl>
                                            <CategoryPicker
                                                type={type}
                                                onChange={handleCategoryChange}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Select category for this transaction
                                        </FormDescription>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="category"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel className="mr-2">Transaction data</FormLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant={"outline"}
                                                        className={cn(
                                                            "w-[200px] pl-3 text-left font-normal",
                                                            !field.value && "text-muted-foreground"
                                                        )}
                                                    >
                                                        {field.value ?
                                                            (format(field.value, "PPP")) :(
                                                                <span>Pick a date</span>
                                                            )
                                                        }
                                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50"/>
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0">
                                                <Calendar
                                                    mode="single"
                                                    selected={field.value}
                                                    onSelect={field.onChange}
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>
                                        <FormDescription>
                                            Select a date for this
                                        </FormDescription>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                        </div>
                    </form>
                </Form>
                <DialogFooter className="mt-4">
                    <DialogClose asChild>
                        <Button
                            type="button"
                            variant={"secondary"}
                            onClick={() => form.reset()}
                        >
                            Cancel
                        </Button>
                    </DialogClose>
                    <Button
                        onClick={form.handleSubmit(onSubmit)}
                        disabled={isPending}
                    >
                        {!isPending && "Create"}
                        {isPending && <Loader2 className="animate-spin"/>}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}