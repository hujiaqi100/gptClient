import React, { forwardRef, useEffect, useRef, useState, useImperativeHandle } from 'react'
import './index.less'
import { Input, message } from 'antd';
import hljs from 'highlight.js';
// import 'github-markdown-css/github-markdown.css'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { atomDark, twilight, funky, f, ghcolors, vs, vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import ReactMarkdown from 'react-markdown'
import _ from 'lodash'
const { TextArea } = Input;
import axios from 'axios';
import GG from './lolo-rurudo.gif'
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
                    <ReactMarkdown
                        children={val.content}
                        components={{
                            code({ node, inline, className, children, ...props }) {
                                return <SyntaxHighlighter
                                    showLineNumbers={true} // 是否展示左侧行数
                                    lineNumberStyle={{ color: '#00cc99', fontSize: 8 }}
                                    children={String(children)}
                                    style={vscDarkPlus}
                                    language='javascript'
                                    PreTag="div"
                                    {...props}
                                />
                            }
                        }}
                    />
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
                setLoad(false)
                setGg(false)
                await getSession()
            })()
        } else {
            setGg(true)
            setCurretnSession([])
        }
    }, [cur])

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

                    <div className="chatArea" ref={_ref}>
                        {
                            currentSession && currentSession.length > 0 ? (currentSession ?? []).map((val, idx) => {
                                return <Chat key={idx} gg={gg} val={val} idx={idx} />
                            }) : <></>
                        }
                        <div className="xx" style={{ width: '100%' }}>
                            {load && <img src={GG} width="683" height="382.053125" alt="Lolo Rurudo GIF - Lolo Rurudo Maid GIFs" style={{ width: '390px', height: '150px' }} />}
                        </div>

                    </div>
                    <InputArea value={value} setValue={setValue} gg={gg} setGg={setGg}
                        setLoad={setLoad}
                        getSession={getSession}
                        cur={cur}
                    />
                </div>
            }
        </>
    )
}
const InputArea = ({ value, setValue, gg, setGg, setLoad, getSession, cur }) => {
    const ref = useRef()
    useEffect(() => {
        const fo = (e) => {
            if (e.keyCode >= 65 && e.keyCode <= 111) {
                ref.current.focus();
            }
        }
        window.addEventListener('keypress', fo, false)
        return () => {
            window.removeEventListener('keypress', fo, false)
        }
    }, [])
    const onKey = async (e) => {
        const st = ref.current.value
        setValue("")
        setGg(true)
        setLoad(true)
        await axios({
            url: '/test/writeMessage',
            method: "post",
            data: { role: 'user', content: st, file: cur }
        })
        ref.current.value = ""
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
        if (repeat?.data?.message) {
            const res = await axios({
                url: '/test/writeMessage',
                method: "post",
                data: Object.assign(repeat.data.message, { file: cur })
            })
            await getSession()
            res && setGg(false)
            res && setLoad(false)
        } else {
            message.error("ak有误 也许吧。。。")
        }
    }
    // const chatChagne = (e) => {
    //     setValue(e.target.value)
    // }
    return <div className="inputArae">
        <input ref={ref} style={{
            background: '#0009', color: '#fff', width: '100%', height: '100%',
            border: 0,
            fontSize: '16px',
            paddingLeft: '12px'
        }}
            tabIndex={-1}
            onKeyPress={async (e) => {
                if (e.charCode == 13) {
                    onKey(e)
                }
            }} disabled={gg} bordered={false} />
    </div>
}

export default forwardRef(Content)