export interface Category {
    catId: number
    name: string
    subcategories: Subcategory[]
}

export interface Subcategory {
    subCatId: string
    name: string
    products: Product[]
}

export interface Product {
    index: string
    name: string
    price: number
    quantity: number
}