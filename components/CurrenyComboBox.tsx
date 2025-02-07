"use client"

import * as React from "react"

import {useMediaQuery} from "@/hooks/use-media-query"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Drawer,
  DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {Currencies, Currency} from "@/lib/currencies";
import {useQuery} from "@tanstack/react-query";
import SkeletonWrapper from "@/components/SkeletonWrapper";
import {UserSettings} from "@prisma/client";
import {useEffect} from "react";



export function CurrencyComboBox() {
  const [open, setOpen] = React.useState(false)
  const isDesktop = useMediaQuery("(min-width: 768px)")
  const [selectedOption, setSelectedOption] = React.useState<Currency | null>(
    null
  )

  const userSettings = useQuery<UserSettings>({
    queryKey: ["userSettings"],
    queryFn: async () => {
      const response = await fetch("/api/user-settings");
      return await response.json();
    },
  })

  useEffect(() => {
    if (userSettings.data) {
      setSelectedOption(Currencies.find((currency) => currency.value === userSettings.data.currency) || null)
    }
  }, [userSettings.data])



  if (isDesktop) {
    return (
        <SkeletonWrapper isLoading={userSettings.isFetching}>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-[150px] justify-start">
                {selectedOption ? <>{selectedOption.label}</> : <>+ Set currency</>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0" align="start">
              <StatusList setOpen={setOpen} setSelectedOption={setSelectedOption} />
            </PopoverContent>
          </Popover>
        </SkeletonWrapper>
    )
  }

  return (
      <SkeletonWrapper isLoading={userSettings.isFetching}>
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerTrigger asChild>
            <Button variant="outline" className="w-[150px] justify-start">
              {selectedOption ? <>{selectedOption.label}</> : <>+ Set currency</>}
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle/>
              <DrawerDescription/>
            </DrawerHeader>
            <div className="mt-4 border-t">
              <StatusList setOpen={setOpen} setSelectedOption={setSelectedOption} />
            </div>
          </DrawerContent>
        </Drawer>
      </SkeletonWrapper>
  )
}

function StatusList({
  setOpen, setSelectedOption,
}: {
  setOpen: (open: boolean) => void
  setSelectedOption: (status: Currency | null) => void
}) {
  return (
    <Command>
      <CommandInput placeholder="Filter currencies..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          {Currencies.map((currency: Currency) => (
            <CommandItem
              key={currency.value}
              value={currency.value}
              onSelect={(value) => {
                setSelectedOption(
                  Currencies.find((priority) => priority.value === value) || null
                )
                setOpen(false)
              }}
            >
              {currency.label}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  )
}
