import { useEffect, useState } from 'react';
import { getData } from '../services/getData';
import { Category, Subcategory } from '../interfaces/data.types';
import { Categories } from './categories';
import { FilterBox } from './filterBox';
import { NameContext } from '../contexts/name.context';

const data = getData()

export const Datatable = (): JSX.Element => {
    const [filteredData, setFilteredData] = useState<Category[]>([])
    const [category, setCategory] = useState<Category>()
    const [subcategories, setSubcategories] = useState<Subcategory[]>()
    const [name, setName] = useState("")
    
    useEffect(() => {
        setFilteredData(data)
    }, [data])

    const filterByName = (val: string) => {
        setName(val)
    }

    const filterByCategory = (val: Category) => {
        const dataWithCategory = data.find((element) => element.catId === val.catId);
        
        if (dataWithCategory) {
            setFilteredData([dataWithCategory])
            setCategory({...dataWithCategory})
            setSubcategories(dataWithCategory.subcategories)
        }
    }

    const filterBySubcategory = (val: Subcategory) => {
        if (category) {
            const dataWithSubCategory = category.subcategories.find((element) => element.subCatId === val.subCatId);
            if (dataWithSubCategory) {
                const tempData = [...filteredData]
                tempData[0].subcategories = [dataWithSubCategory]
                setFilteredData(tempData)
            }
        }
    }

    return <div className="container">
        <FilterBox filterByName={filterByName}
            filterByCategory={filterByCategory}
            filterBySubcategory={filterBySubcategory}
            categories={data} subcategories={subcategories || []}></FilterBox>
        <NameContext.Provider value={name}>
            <div className="data-table">
                {
                    filteredData?.map((category: Category) => {
                        return <Categories key={category.catId} data={category}/>
                    })
                }
            </div>
        </NameContext.Provider>
    </div>
}