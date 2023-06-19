import React from 'react'
import { ContextType } from '../context/ContextType'

const BasePageLayout:React.FC<ContextType> = ({children}) => {
  return (
    <div className={"mr-6 p-6"} >{children}</div>
  )
}

export default BasePageLayout