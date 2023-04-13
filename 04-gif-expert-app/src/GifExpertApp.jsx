import { useState } from "react"
import { AddCategory, GifGrid } from "./components"

export const GifExpertApp = () => {

    const [categories, setCategories] = useState([ 'One Punch'])

    const onAddCategory = ( newCategory ) => { 

        if (categories.includes(newCategory)) return;

        setCategories([newCategory, ...categories])
        // setCategories(['Ke Personaje', ...categories])
        // setCategories([...categories, 'Ke Personaje'])
        // setCategories(cat => [...cat, 'Ke Personaje'])
    }

  return (
    <>
        {/* titulo */}
        <h1>GifExpertApp</h1>

        {/* Input */}
        <AddCategory onNewCategory={ onAddCategory } 
        // setCategories={ setCategories } 
        />

        {/* Listado de gif */}
            { 
                categories.map( category => (
                    <GifGrid key={ category } category={ category } />
                )) 
            }

            {/* Gif item */}
    </>
  )
}
