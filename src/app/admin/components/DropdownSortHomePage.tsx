"use client";

import React, { useState } from "react";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import { Months } from "@/app/db/date";

type Agument = {
  datas: any;
  search: string;
  setSearch: any;
}

const DropdownSortHomePage: React.FC<Agument> = (arg) => {
  const { datas, search, setSearch } = arg;
  return (
    <div className="w-40">
      <Listbox value={search} onChange={setSearch}>
        <ListboxButton
          className={clsx(
            "relative block w-full rounded-lg bg-white/5 py-1.5 pr-8 pl-3 text-left text-sm/6 text-black border",
            "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
          )}
        >
          {search ? search : "All"}
          <ChevronDownIcon
            className="group pointer-events-none absolute top-2.5 right-2.5 size-4 fill-black/60"
            aria-hidden="true"
          />
        </ListboxButton>
        <ListboxOptions
          anchor="bottom"
          transition
          className={clsx(
            "w-[var(--button-width)] rounded-xl border border-white/5 bg-neutral-600 p-1 [--anchor-gap:var(--spacing-1)] focus:outline-none mt-1",
            "transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0"
          )}
        >
          <ListboxOption
            value={``}
            className="group flex cursor-default items-center gap-2 rounded-lg py-0.5 px-3 select-none data-[focus]:bg-white/10"
          >
            <CheckIcon className="invisible size-4 fill-white group-data-[selected]:visible" />
            <div className="text-sm/6 text-white">All</div>
          </ListboxOption>
          {datas.map((data: any, index: number) => (
            <ListboxOption
              key={index}
              value={data}
              className="group flex cursor-default items-center gap-2 rounded-lg py-0.5 px-3 select-none data-[focus]:bg-white/10"
            >
              <CheckIcon className="invisible size-4 fill-white group-data-[selected]:visible" />
              <div className="text-sm/6 text-white">{data}</div>
            </ListboxOption>
          ))}
        </ListboxOptions>
      </Listbox>
    </div>
  );
}

export default DropdownSortHomePage;
