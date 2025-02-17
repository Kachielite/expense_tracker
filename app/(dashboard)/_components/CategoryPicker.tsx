"use client";

import {TransactionType} from "@/lib/types";
import {useQuery} from "@tanstack/react-query";
import React, {useCallback, useEffect} from "react";
import {Category} from "@prisma/client";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Button} from "@/components/ui/button";
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandList, CommandItem} from "@/components/ui/command";
import CreateCategoryDialogue from "@/app/(dashboard)/_components/CreateCategoryDialogue";
import {Check, ChevronsUpDown} from "lucide-react";
import {cn} from "@/lib/utils";

type props = {
    type: TransactionType,
    onChange: (value: string) => void
}

export default function CategoryPicker({type, onChange}: props){
    const [isOpen, setIsOpen] = React.useState(false);
    const [value, setValue] = React.useState("");

    const categoriesQuery = useQuery({
        queryKey: ["categories", type],
        queryFn: () => fetch(`/api/categories?type=${type}`).then((res) => res.json())
    })

    const selectedCategory = categoriesQuery.data?.find((category: Category) => category.name == value);

    const successCallback = useCallback((category: Category) => {
        setValue(category.name)
        setIsOpen(prev => !prev)
    }, [setValue, setIsOpen]);

    useEffect(() => {
        if(!value) return;
        onChange(value)
    }, [onChange, value])

    return (
        <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    role={"combobox"}
                    aria-expanded={isOpen}
                    className="w-[200px] justify-between"
                >
                    {selectedCategory ?
                        <CategoryRow category={selectedCategory}/> :
                        "Select category"
                    }
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50"/>
                </Button>
            </PopoverTrigger>
            <PopoverContent>
                <Command
                    onSubmit={e => e.preventDefault()}
                >
                    <CommandInput placeholder="Search category..."/>
                    <CreateCategoryDialogue
                        type={type}
                        successCallback={successCallback}
                    />
                    <CommandEmpty>
                        <p>Category not found</p>
                        <p className="text-xs text-muted-foreground">Tip: Create a new category</p>
                    </CommandEmpty>
                    <CommandGroup>
                        <CommandList>
                            {categoriesQuery.data &&
                                categoriesQuery.data.map((category: Category) => (
                                    <CommandItem
                                        key={category.name}
                                        onSelect={() => {
                                            setValue(category.name)
                                            setIsOpen(prev => !prev)
                                        }}
                                    >
                                        <CategoryRow category={category}/>
                                        <Check className={cn(
                                            "mr-2 w-4 h-4 opacity-0",
                                            value === category.name && "opacity-100"
                                        )}/>
                                    </CommandItem>
                                ))
                            }
                        </CommandList>
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    );
}


function CategoryRow({category} :{category: Category}){
    return(
        <div className="flex items-center gap-2">
            <span role="img">{category.icon}</span>
            <span>{category.name}</span>
        </div>
    )
}