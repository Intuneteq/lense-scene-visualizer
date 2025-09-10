'use client'
import React from 'react'
import { Select, SelectItem } from "@heroui/select";
import { ChevronDownIcon } from '@heroicons/react/24/solid';

export type SelectorType = {
   key: string
   label: string
}

type Props = {
   id: string
   name: string
   options: SelectorType[]
   onChange: (key: string) => void
}

export default function Selector({ id, name, options, onChange }: Props) {
   return (
      <Select
         id={id}
         name={name}
         onChange={(e) => onChange(e.target.value)}
         selectorIcon={<ChevronDownIcon />}
         classNames={{
            trigger:
               'cursor-pointer border border-[#898989] rounded-sm px-4 w-full max-w-[19.1875rem] h-9 text-sm text-black flex items-center justify-between relative',
            listboxWrapper:
               'max-h-40 overflow-y-auto w-full border border-[#898989] rounded-md bg-white no-scrollbar',
            listbox:
               'text-black text-sm py-0 no-scrollbar',
            selectorIcon:
               'w-5 h-5 text-[#898989] transition-transform duration-200 data-[open=true]:rotate-180 relative right-0',
         }}
      >
         {options.map((option) => (
            <SelectItem
               key={option.key}
               className={`
            relative flex items-center justify-between p-2 rounded-sm
            data-[hover=true]:bg-gray-100
            data-[selected=true]:bg-purple-50
          `}
            >
               {option.label}
            </SelectItem>
         ))}
      </Select>
   )
}
