import React, { useState, useEffect } from 'react';

export default function (props) {
  const [count, setCount] = useState(0);
  const [set, setOun] = useState(0);
  useEffect(() => {
    setTimeout(() => {
      console.log('请求数据')
    }, 1000)
  }, [])
  return <div>
    <button onClick={() => setCount(count + 1)} style={{ marginRight: 10 }}>count({count}) 加</button>
    <button onClick={() => setOun(set + 1)}>set({set}) 加</button>
  </div>
}