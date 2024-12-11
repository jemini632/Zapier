

import { ReactNode } from "react"


export const PrimaryButton=({children,onClick,size='small'}:{
    children: ReactNode,
    onClick: ()=>void,
    size?: "big"  | "small"
})=>{

    return <div onClick={onClick} className={ `${size=== "small" ? "text-sm" : "text-xl"} ${size==="small" ? "px-8 py-2" : "px-10 py-4"} bg-amber-700
    hover:shadow-md text-white rounded-full cursor-pointer text-center`}>
         {children}

    </div>
    
}