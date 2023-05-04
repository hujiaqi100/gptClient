import React, { useEffect, useRef, useState } from 'react';
import _ from 'lodash'
import './app.less'
import Head from './Layer/head'
import Left from './Layer/left'
import Content from './Layer/content'
const { Configuration, OpenAIApi } = require("openai");
const App = (props) => {
    const [cur, setCur] = useState()
    const ref = useRef()
    const getDefault = (res) => {
        setCur(res)
    }
    return (
        <div className='layout'>
            <div className='head'>
                <Head />
            </div>
            <div className="left_content">
                <Left getDefault={getDefault} curRef={ref} />
                <Content cur={cur} ref={ref} />
            </div>
        </div >
    )
}
export default App
