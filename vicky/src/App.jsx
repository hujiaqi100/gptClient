import React, { useEffect, useRef, useState } from 'react';
import _ from 'lodash'
import './app.less'
import { Input, Button, message } from 'antd'
import Head from './Layer/head'
import Left from './Layer/left'
import Content from './Layer/content'
import axios from 'axios'
const App = (props) => {
    const [cur, setCur] = useState()
    const ref = useRef()
    const [go, setGo] = useState(false)

    const getDefault = (res) => {
        setCur(res)
    }
    useEffect(() => {
        (async () => {
            const res = await axios.get('/test/checkAk')
            setGo(res.data == 1 ? true : false)
        })()
    }, [])
    return (
        <div className='layout'>
            {
                !go ? < Ak go={go} setGo={setGo} /> : <>
                    <div className='head'>
                        <Head >
                            <a style={{ color: 'red' }} onClick={async () => {
                                // setTimeout(() => {
                                await axios.get('/test/reboot')
                                setGo(false)
                                // }, 3000)
                            }}>设置akg</a>
                        </Head>
                    </div>
                    <div className="left_content">
                        <Left getDefault={getDefault} curRef={ref} />
                        <Content cur={cur} ref={ref} />
                    </div>
                </>
            }
        </div >
    )
}
const Ak = ({ setGo }) => {
    const [value, setValue] = useState('')
    const setAk = async () => {
        await axios.get('/test/setAk', { params: { id: value, name: value } })
        setGo(true)
    }
    return <div className="ak">
        <div className="con">
            <Input value={value} onChange={(e) => {
                setValue(e.target.value)
            }} placeholder='你的ak...' bordered={false} />
            <div className="ver">
                <Button onClick={setAk}>验证</Button>
            </div>
        </div>

    </div>
}
export default App
