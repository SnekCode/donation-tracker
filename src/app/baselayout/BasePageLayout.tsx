import React from 'react'
import { ContextType } from '../context/ContextType'

const BasePageLayout:React.FC<ContextType> = ({children}) => {
  return (
    <div className={"mx-6"} >{children}</div>
  )
}

export default BasePageLayout