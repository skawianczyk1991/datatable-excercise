import { Category, Subcategory } from "../interfaces/data.types"
import { Subcategories } from "./subcategories"

interface CategoriesProps {
    data: Category
}
export const Categories = (props: CategoriesProps) => {

    return <div className="category">
        <div className="category-name">
            {props.data.name}
        </div>
        <div className="category-items">
            {
                props.data.subcategories.map((subcategory: Subcategory) => {
                    return <Subcategories key={subcategory.subCatId} subcategory={subcategory}></Subcategories>
                })
            }
        </div>
    </div>
}