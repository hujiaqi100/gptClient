import React, { useEffect, useState } from 'react'
import './index.less'
import _ from 'lodash'
import { Menu, Button } from 'antd';
import axios from 'axios';
function getItem(label, key) {
  return {
    key,
    label
  };
}
const Left = (props) => {
  const { getDefault, curRef } = props
  const [dkey, setDKey] = useState('')
  const onClick = (e) => {
    getDefault(e.key)
    setDKey(e.key)
  };
  const [list, setList] = useState([])
  useEffect(() => {
    axios.get('/test/chooseall').then(data => {
      const newList = (data?.data || []).map((val, idx) => {
        return getItem(`#${idx}会话`, val)
      })
      getDefault(data?.data[0])
      setDKey(data?.data[0])
      setList(() => _.cloneDeep(newList || []))
    })
  }, [])
  return (
    <div className='left'>
      <div style={{ position: 'absolute', top: '3px', left: '18px' }}>
        <Button size='small' type='link'
          onClick={async () => {
            await axios.get("/test/createFile", {
              params: {
                id: list.length + 2 + Math.random(),
                name: "new_file"
              }
            })
            await axios.get('/test/chooseall').then(data => {
              const newList = (data?.data || []).map((val, idx) => {
                return getItem(`#${idx}会话`, val)
              })
              getDefault(data?.data[list.length])
              setDKey(data?.data[list.length])
              setList(() => _.cloneDeep(newList || []))
            })
          }}
        >新会话</Button>
      </div>
      <div style={{ position: 'absolute', top: '3px', left: '100px' }}>
        <Button size='small' type='link'
          onClick={async () => {
            const idxs = (list || []).findIndex(d => d.key == dkey)
            if (idxs >= 0) {
              await axios({
                url: '/test/deleteFile',
                method: 'delete',
                data: {
                  file: dkey
                }
              })
              axios.get('/test/chooseall').then(data => {
                const newList = (data?.data || []).map((val, idx) => {
                  return getItem(`#${idx}会话`, val)
                })

                getDefault(idxs == 0 ? data?.data[0] : data?.data[idxs - 1])
                setDKey(idxs == 0 ? data?.data[0] : data?.data[idxs - 1])
                setList(() => _.cloneDeep(newList || []))
              })
            }
          }}
        >删除当前会话</Button>
      </div>
      <div style={{ position: 'absolute', top: '3px', right: '12px' }}>
        <Button size='small' type='link'
          onClick={() => {
            curRef.current.redraw()
          }}
        >Reload</Button>
      </div>
      <Menu
        onClick={onClick}
        selectedKeys={[dkey]}
        style={{
          width: '100%',
          height: '100%',
          overflowX: 'hidden'
        }}
        theme='dark'
        mode="inline"
        items={list}
      />
    </div>
  )
}

export default Left