import { Dropdown } from "primereact/dropdown"
import { InputText } from "primereact/inputtext"
import { useEffect, useState } from "react"
import { Category, Subcategory } from "../interfaces/data.types"

interface FilterBoxProps {
    categories: Category[]
    subcategories: Subcategory[]
    filterByName: (value: string) => void
    filterByCategory: (category: Category) => void
    filterBySubcategory: (subcategory: Subcategory) => void
}

let timeout: any;

export const FilterBox = (props: FilterBoxProps) => {
    const [selectedName, setSelectedName] = useState("")
    const [selectedCategory, setSelectedCategory] = useState<Category>()
    const [selectedSubCategory, setSelectedSubCategory] = useState<Subcategory>()

    useEffect(()=>{
        if (selectedCategory) {
            props.filterByCategory(selectedCategory)
        }
    }, [selectedCategory])

    useEffect(() => {
        selectedSubCategory && props.filterBySubcategory(selectedSubCategory)
    }, [selectedSubCategory])

    const handleChange = (e: any) => {
        setSelectedName(e.target.value)
    }

    useEffect(() => {
        timeout && clearTimeout(timeout)
        timeout = setTimeout(() => {
            if (selectedName.length > 2) {
                props.filterByName(selectedName)
            } else {
                props.filterByName("")
            }
        }, 1000)
    }, [selectedName])

    const selectCategory = (e: any) => {
        setSelectedCategory(e.value)
    }

    const selectSubcategory = (e: any) => {
        setSelectedSubCategory(e.target.value)
    }

    return <div className="filter-box">
        <InputText value={selectedName} placeholder="Username" onChange={handleChange} />
        <Dropdown value={selectedCategory} onChange={selectCategory} options={props.categories} optionLabel="name"
            placeholder="Select category" className="w-full md:w-14rem" disabled={!props.categories}/>
        <Dropdown value={selectedSubCategory} onChange={selectSubcategory} disabled={!props.subcategories} options={props.subcategories} optionLabel="name" 
        placeholder="Select subcategory" className="w-full md:w-14rem" />
    </div>
}
