import { Button } from "primereact/button"
import { Product, Subcategory } from "../interfaces/data.types"
import { Products } from "./products"
import { useEffect, useState } from "react"

interface SubcategoriesProps {
    subcategory: Subcategory
}

export const Subcategories = (props: SubcategoriesProps) => {
    const [sortVal, setSortVal] = useState<"nosort"|"asc"|"desc">("nosort")
    const [sortedData, setSortedData] = useState<Product[]>()
    const sortProducts = () => {
        switch (sortVal) {
            case "nosort":
                setSortVal("asc")
                break
            case "asc":
                setSortVal("desc")
                break
            default:
                setSortVal("nosort")
        }
    }

    useEffect(() => {
        setSortedData([...props.subcategory.products])
    }, [props.subcategory])

    useEffect(() => {
        const tempArray = [...props.subcategory.products]
        if (sortVal === "asc") {
            setSortedData(() => (tempArray.sort(compareASC)))

        } else if (sortVal === "desc") {
            setSortedData(() => (tempArray.sort(compareDESC)))

        } else {
            setSortedData(props.subcategory.products)
        }
    }, [sortVal, props.subcategory])

    const compareASC = (a: Product, b: Product) => {
        return a.price - b.price;
    }
    const compareDESC = (a: Product, b: Product) => {
        return b.price - a.price;
    }
    return <div className="subcategory">
        <div className="subcategory-name">
            {props.subcategory.name} <Button label={sortVal} onClick={() => sortProducts()}/>
        </div>

        <div className="subcategory-items">
            <Products products={sortedData || props.subcategory.products}/>
        </div>
    </div>
}
