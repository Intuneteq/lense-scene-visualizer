'use client'

import React from 'react'
import Image from 'next/image';
import { Loader2 } from "lucide-react";
import { Select, SelectItem } from "@heroui/select";
import DropDownSvg from '@assets/svgs/drop-down-svg.svg'

export type SelectorType = {
   key: string
   label: string
}

type Props = {
   id: string
   name: string
   options: SelectorType[]
   isLoading?: boolean
   value?: string
   placeholder?: string
   onChange: (key: string) => void
}

export default function Selector({ id, name, onChange, options, value, placeholder, isLoading = false }: Props) {
   return (
      <Select
         id={id}
         name={name}
         aria-label={name}
         placeholder={placeholder}
         selectedKeys={value && options.length ? [value] : []}
         onSelectionChange={(keys) => {
            const selected = Array.from(keys)[0] as string
            onChange(selected)
         }}
         spinnerProps={{ size: 'lg' }}
         selectorIcon={<Image src={DropDownSvg} alt="Dropdown" width={8} height={8} />}
         classNames={{
            trigger:
               'cursor-pointer border border-[#898989] rounded-sm px-4 w-full max-w-[19.1875rem] h-9 text-sm text-black flex items-center justify-between relative',
            listboxWrapper:
               'max-h-40 overflow-y-auto w-full border border-[#898989] rounded-md bg-white no-scrollbar',
            listbox:
               'text-black text-sm py-0 no-scrollbar',
            selectorIcon:
               'w-3 h-3 text-[#898989] transition-transform duration-200 data-[open=true]:rotate-180 relative right-0',
         }}
      >
         {isLoading ? (
            <SelectItem
               key="loading"
               textValue="Loading"
               className="flex items-center justify-center p-2 text-gray-500 cursor-not-allowed"
            >
               <Loader2 className="animate-spin mr-2 w-4 h-4" />
               Loading...
            </SelectItem>
         ) : (
            options.map((option) => (
               <SelectItem
                  key={option.key}
                  textValue={option.label}
                  className={`
                     relative flex items-center justify-between p-2 rounded-sm
                     data-[hover=true]:bg-gray-100
                     data-[selected=true]:bg-purple-50
                  `}
               >
                  {option.label}
               </SelectItem>
            ))
         )}
      </Select>
   )
}
