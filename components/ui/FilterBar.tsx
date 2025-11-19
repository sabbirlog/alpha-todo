"use client";

import { PlusIcon } from "lucide-react";
import React from "react";
import SearchInput from "../forms/SearchInput";
import Button from "./Button";
import FilterDropdown, { DateFilter } from "./FilterDropdown";

interface FilterBarProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    dateFilter: DateFilter | string;
    setDateFilter: (val: string) => void;
    onAddTask: () => void;
    isAdding?: boolean;
}


const FilterBar: React.FC<FilterBarProps> = ({
    searchQuery,
    setSearchQuery,
    dateFilter,
    setDateFilter,
    onAddTask,
    isAdding = false,
}) => {
    return (
        <div className="flex flex-col gap-4 w-full">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full gap-2">
                <div className="flex flex-col gap-1">
                    <h2 className=" text-background-dark font-semibold text-2xl">Todos</h2>
                    <div className="h-0.5 w-12 bg-brand-primary"></div>
                </div>
                <Button
                    variant="primary"
                    onClick={onAddTask}
                    isLoading={isAdding}
                >

                    <span>
                        <PlusIcon />
                    </span> Add New Task
                </Button>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 w-full">
                <div className="flex-1">
                    <SearchInput
                        value={searchQuery}
                        onChange={setSearchQuery}
                        placeholder="Search your tasks..."
                    />
                </div>

                <div className="sm:ml-4">
                    <FilterDropdown dateFilter={dateFilter} setDateFilter={setDateFilter} />
                </div>
            </div>
        </div>
    );
};

export default FilterBar;
