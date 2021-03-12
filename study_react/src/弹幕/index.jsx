import React, { useEffect, useState } from 'react';
import BulletScreen, { StyledBullet } from 'rc-bullets';

const headUrl = 'https://zerosoul.github.io/rc-bullets/assets/img/heads/girl.jpg';
export default function Demo() {
  // 弹幕屏幕
  const [screen, setScreen] = useState(null);
  // 弹幕内容
  const [bullet, setBullet] = useState('');
  useEffect(() => {
    // 给页面中某个元素初始化弹幕屏幕，一般为一个大区块。此处的配置项全局生效
    let s = new BulletScreen('.screen', { duration: 20 });
    // or
    // let s=new BulletScreen(document.querySelector('.screen));
    setScreen(s);
  }, []);
  // 弹幕内容输入事件处理
  const handleChange = ({ target: { value } }) => {
    setBullet(value);
  };
  // 发送弹幕
  const handleSend = () => {
    if (bullet) {
      // push 纯文本
      // screen.push(bullet);
      // or 使用 StyledBullet

      screen.push(
        <StyledBullet
          top={'50px'}
          head={headUrl}
          msg={bullet}
          backgroundColor={'#fff'}
          size='normal'
        />
      );
    }
  };
  return (
    <main>
      <div className="screen" style={{ width: '100vw', height: '80vh' }}></div>
      <input value={bullet} onChange={handleChange} />
      <button onClick={handleSend}>发送</button>
    </main>
  );
}