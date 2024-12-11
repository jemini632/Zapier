
import { ReactNode } from "react"


export const SecondaryButton=({children,onClick,size='small'}:{
    children: ReactNode,
    onClick: ()=>void,
    size?: "big"  | "small"
})=>{

    return <div onClick={onClick} className={ `${size=== "small" ? "text-sm" : "text-xl"} ${size==="small" ? "px-8 py-2" : "px-10 py-4"}
    hover:shadow-md  rounded-full cursor-pointer border text-black`}>
         {children}

    </div>
    
}