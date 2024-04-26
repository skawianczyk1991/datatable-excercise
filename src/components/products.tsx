import { DataTable } from "primereact/datatable"
import { Product } from "../interfaces/data.types"
import { Column } from "primereact/column"
import { NameContext } from "../contexts/name.context"

interface ProductsProps {
    products: Product[]
}

export const Products = (props: ProductsProps) => {

    const filterData = (val: string) => {
        if (val === "") return props.products
        return props.products?.filter(product => product.name.includes(val))
    }
    return <>
        <NameContext.Consumer>
            {(searchStr) => (
                <div className="products">
                    <DataTable value={filterData(searchStr)} scrollable scrollHeight="400px" tableStyle={{ minWidth: '50rem' }} loading={!props.products}>
                        <Column field="index" header="Index"></Column>
                        <Column field="name" header="Name"></Column>
                        <Column field="price" header="Price"></Column>
                        <Column field="quantity" header="Quantity"></Column>
                    </DataTable>
                </div>
            )}
        </NameContext.Consumer>
    </>
}
