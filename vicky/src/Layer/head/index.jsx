import React from 'react'
import './index.less'
import { Button } from 'antd'
import axios from 'axios'
const Head = (props) => {
  return (
    <div style={{
      position: "absolute",
      right: '80px',
      top: '3.2px'
    }}>
      {props.children}
    </div>
  )
}

export default Head