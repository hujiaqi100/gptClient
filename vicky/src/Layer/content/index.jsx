import React, { forwardRef, useEffect, useRef, useState, useImperativeHandle } from 'react'
import './index.less'
import { Input } from 'antd';
import hljs from 'highlight.js';
// import 'github-markdown-css/github-markdown.css'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import ReactMarkdown from 'react-markdown'
import _ from 'lodash'
const { TextArea } = Input;
import axios from 'axios';
const Chat = (props) => {
    const { val, idx, gg } = props
    return <div key={idx} className='chat'>
        {
            val.role === 'user' ? <div className="user">
                <pre>
                    {val.content}

                </pre>
            </div> : <div className="ass">
                <div>

                </div>
                <div className="wap">
                    <pre>
                        <ReactMarkdown
                            children={val.content}
                            components={{
                                code({ node, inline, className, children, ...props }) {
                                    return <SyntaxHighlighter
                                        showLineNumbers={true} // 是否展示左侧行数
                                        lineNumberStyle={{ color: '#ddd', fontSize: 10 }} // 左侧行数的样式
                                        children={String(children).replace(/\n$/, '')}
                                        style={atomDark}
                                        language='javascript'
                                        // PreTag="div"
                                        {...props}
                                    />
                                }
                            }}
                        />
                    </pre>
                </div>

            </div>
        }

    </div>
}
const Content = (props, ref) => {
    const { cur } = props
    const [value, setValue] = useState("");
    const [currentSession, setCurretnSession] = useState([])
    const [gg, setGg] = useState(false)
    const [load, setLoad] = useState(false)
    const [reRender, setRender] = useState(false)
    const getSession = async () => {
        const data = await axios.get('/test/chooseFile', {
            params: {
                id: cur,
                name: cur
            }
        })
        // data && setGg(true)
        setCurretnSession(() => _.get(data, 'data', []))
    }
    useEffect(() => {
        reRender && setRender(false)
        if (_ref.current) {
            _ref.current.scrollTop = _ref.current.scrollHeight - _ref.current.clientHeight;
        }
    }, [reRender])
    useEffect(() => {
        if (cur) {
            (async () => {
                setGg(false)
                await getSession()
            })()
        } else {
            setGg(true)
            setCurretnSession([])
        }
    }, [cur])
    const chatChagne = (e) => {
        setValue(e.target.value)
    }
    const _ref = useRef()
    useEffect(() => {
        if (_ref?.current) {
            _ref.current.scrollTop = _ref.current.scrollHeight - _ref.current.clientHeight;
        }
    }, [currentSession.length])
    useImperativeHandle(ref, () => ({
        redraw: () => {
            setRender(true)
            setLoad(false)
            setGg(false)
        }
    }))
    return (
        <>
            {
                reRender ? <></> : <div className='content'>
                    {load && <div style={{ textAlign: 'center', width: 'calc(100% - 100px)', position: 'fixed', top: '42px', height: '30px', zIndex: 20, display: 'flex', justifyContent: 'center' }}><div
                        className='xx'
                    >"loading"</div></div>}
                    <div className="chatArea" ref={_ref}>
                        {
                            currentSession && currentSession.length > 0 ? (currentSession ?? []).map((val, idx) => {
                                return <Chat gg={gg} val={val} idx={idx} />
                            }) : <></>
                        }

                    </div>
                    <div className="inputArae">
                        <TextArea value={value} style={{ background: '#0009', color: '#fff9', width: '100%', height: '100%', fontSize: '20px' }} onKeyPress={async (e) => {
                            if (e.charCode == 13) {
                                setValue("")
                                setGg(true)
                                setLoad(true)
                                await axios({
                                    url: '/test/writeMessage',
                                    method: "post",
                                    data: { role: 'user', content: value, file: cur }
                                })
                                await getSession()
                                const data = await axios.get('/test/chooseFile', {
                                    params: {
                                        id: cur,
                                        name: cur
                                    }
                                })
                                const repeat = await axios({
                                    url: '/test/chat',
                                    method: "post",
                                    data: {
                                        model: "gpt-3.5-turbo",
                                        messages: data.data,
                                    }
                                })
                                if (repeat) {
                                    const res = await axios({
                                        url: '/test/writeMessage',
                                        method: "post",
                                        data: Object.assign(repeat.data.message, { file: cur })
                                    })
                                    await getSession()
                                    res && setGg(false)
                                    res && setLoad(false)
                                }
                            }
                        }} disabled={gg} onChange={chatChagne} autoSize={{ minRows: 4, maxRows: 4 }} bordered={false} />
                    </div>
                </div>
            }
        </>
    )
}

export default forwardRef(Content)