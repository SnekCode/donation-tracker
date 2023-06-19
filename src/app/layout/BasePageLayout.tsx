import React from 'react'
import { ContextType } from '../context/ContextType'

const BasePageLayout:React.FC<ContextType> = ({children}) => {
  return (
    <div className={"m-4"} >{children}</div>
  )
}

export default BasePageLayout