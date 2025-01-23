import { useState, useEffect } from 'react'
import './App.css'
import { Input, Button, Space } from 'antd';
import CryptoJS from 'crypto-js';
import localforage from 'localforage';

// 定义存储键名
const STORAGE_KEYS = {
  normalText: 'crypto_normal_text',
  normalKey: 'crypto_normal_key',
  normalIv: 'crypto_normal_iv',
  normalEncrypted: 'crypto_normal_encrypted',
  normalDecrypted: 'crypto_normal_decrypted',
  aesText: 'crypto_aes_text',
  aesKey: 'crypto_aes_key',
  aesIv: 'crypto_aes_iv',
  aesEncrypted: 'crypto_aes_encrypted',
  aesDecrypted: 'crypto_aes_decrypted',
};

function App() {
  const [normalText, setNormalText] = useState('')
  const [normalKey, setNormalKey] = useState('')
  const [normalIv, setNormalIv] = useState('')
  const [normalEncrypted, setNormalEncrypted] = useState('')
  const [normalDecrypted, setNormalDecrypted] = useState('')

  const [aesText, setAesText] = useState('')
  const [aesKey, setAesKey] = useState('')
  const [aesIv, setAesIv] = useState('')
  const [aesEncrypted, setAesEncrypted] = useState('')
  const [aesDecrypted, setAesDecrypted] = useState('')

  // 加载保存的数据
  useEffect(() => {
    const loadSavedData = async () => {
      try {
        const savedNormalText = await localforage.getItem(STORAGE_KEYS.normalText);
        const savedNormalKey = await localforage.getItem(STORAGE_KEYS.normalKey);
        const savedNormalIv = await localforage.getItem(STORAGE_KEYS.normalIv);
        const savedNormalEncrypted = await localforage.getItem(STORAGE_KEYS.normalEncrypted);
        const savedNormalDecrypted = await localforage.getItem(STORAGE_KEYS.normalDecrypted);
        
        const savedAesText = await localforage.getItem(STORAGE_KEYS.aesText);
        const savedAesKey = await localforage.getItem(STORAGE_KEYS.aesKey);
        const savedAesIv = await localforage.getItem(STORAGE_KEYS.aesIv);
        const savedAesEncrypted = await localforage.getItem(STORAGE_KEYS.aesEncrypted);
        const savedAesDecrypted = await localforage.getItem(STORAGE_KEYS.aesDecrypted);

        if (savedNormalText) setNormalText(savedNormalText as string);
        if (savedNormalKey) setNormalKey(savedNormalKey as string);
        if (savedNormalIv) setNormalIv(savedNormalIv as string);
        if (savedNormalEncrypted) setNormalEncrypted(savedNormalEncrypted as string);
        if (savedNormalDecrypted) setNormalDecrypted(savedNormalDecrypted as string);

        if (savedAesText) setAesText(savedAesText as string);
        if (savedAesKey) setAesKey(savedAesKey as string);
        if (savedAesIv) setAesIv(savedAesIv as string);
        if (savedAesEncrypted) setAesEncrypted(savedAesEncrypted as string);
        if (savedAesDecrypted) setAesDecrypted(savedAesDecrypted as string);
      } catch (error) {
        console.error('Error loading saved data:', error);
      }
    };

    loadSavedData();
  }, []);

  // 保存数据到本地存储
  const saveToLocalStorage = async (key: string, value: string) => {
    try {
      await localforage.setItem(key, value);
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  // 更新输入值的函数
  const updateNormalText = (value: string) => {
    setNormalText(value);
    saveToLocalStorage(STORAGE_KEYS.normalText, value);
  };

  const updateNormalKey = (value: string) => {
    setNormalKey(value);
    saveToLocalStorage(STORAGE_KEYS.normalKey, value);
  };

  const updateNormalIv = (value: string) => {
    setNormalIv(value);
    saveToLocalStorage(STORAGE_KEYS.normalIv, value);
  };

  const updateAesText = (value: string) => {
    setAesText(value);
    saveToLocalStorage(STORAGE_KEYS.aesText, value);
  };

  const updateAesKey = (value: string) => {
    setAesKey(value);
    saveToLocalStorage(STORAGE_KEYS.aesKey, value);
  };

  const updateAesIv = (value: string) => {
    setAesIv(value);
    saveToLocalStorage(STORAGE_KEYS.aesIv, value);
  };

  const updateNormalEncrypted = (value: string) => {
    setNormalEncrypted(value);
    saveToLocalStorage(STORAGE_KEYS.normalEncrypted, value);
  };

  const updateAesEncrypted = (value: string) => {
    setAesEncrypted(value);
    saveToLocalStorage(STORAGE_KEYS.aesEncrypted, value);
  };

  // 普通加密
  const handleNormalEncrypt = () => {
    try {
      const key = CryptoJS.enc.Utf8.parse(normalKey);
      const iv = CryptoJS.enc.Utf8.parse(decodeURI(normalIv));
      const encrypted = CryptoJS.DES.encrypt(normalText, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      });
      const result = encrypted.toString();
      setNormalEncrypted(result);
      saveToLocalStorage(STORAGE_KEYS.normalEncrypted, result);
    } catch (error) {
      console.error('Normal encryption error:', error);
    }
  };

  // 普通解密
  const handleNormalDecrypt = () => {
    try {
      const key = CryptoJS.enc.Utf8.parse(normalKey);
      const iv = CryptoJS.enc.Utf8.parse(decodeURI(normalIv));
      const decrypted = CryptoJS.DES.decrypt(normalEncrypted, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      });
      const result = decrypted.toString(CryptoJS.enc.Utf8);
      setNormalDecrypted(result);
      saveToLocalStorage(STORAGE_KEYS.normalDecrypted, result);
    } catch (error) {
      console.error('Normal decryption error:', error);
    }
  };

  // AES加密
  const handleAesEncrypt = () => {
    try {
      const key = CryptoJS.enc.Utf8.parse(aesKey);
      const iv = CryptoJS.enc.Utf8.parse(aesIv);
      const encrypted = CryptoJS.AES.encrypt(aesText, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      });
      const result = encrypted.toString();
      setAesEncrypted(result);
      saveToLocalStorage(STORAGE_KEYS.aesEncrypted, result);
    } catch (error) {
      console.error('AES encryption error:', error);
    }
  };

  // AES解密
  const handleAesDecrypt = () => {
    try {
      const key = CryptoJS.enc.Utf8.parse(aesKey);
      const iv = CryptoJS.enc.Utf8.parse(aesIv);
      const decrypted = CryptoJS.AES.decrypt(aesEncrypted, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      });
      const result = decrypted.toString(CryptoJS.enc.Utf8);
      setAesDecrypted(result);
      saveToLocalStorage(STORAGE_KEYS.aesDecrypted, result);
    } catch (error) {
      console.error('AES decryption error:', error);
    }
  };

  return (
    <>
      <h1>普通加密</h1>
      <Space direction="vertical" style={{ width: '100%' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ width: '80px' }}>明文：</div>
          <Input 
            size="large" 
            placeholder="请输入要加密的文本" 
            value={normalText}
            onChange={(e) => updateNormalText(e.target.value)}
          />
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ width: '80px' }}>密文：</div>
          <Input 
            size="large"
            value={normalEncrypted}
            onChange={(e) => updateNormalEncrypted(e.target.value)}
            placeholder="加密结果或输入要解密的密文"
          />
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ width: '80px' }}>密钥：</div>
          <Input 
            size="large" 
            placeholder="请输入要加密的秘钥" 
            value={normalKey}
            onChange={(e) => updateNormalKey(e.target.value)}
          />
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ width: '80px' }}>向量：</div>
          <Input 
            size="large" 
            placeholder="请输入要加密的向量" 
            value={normalIv}
            onChange={(e) => updateNormalIv(e.target.value)}
          />
        </div>
        <Space>
          <Button type="primary" onClick={handleNormalEncrypt}>加密</Button>
          <Button onClick={handleNormalDecrypt}>解密</Button>
        </Space>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ width: '80px' }}>解密结果：</div>
          <div>{normalDecrypted}</div>
        </div>
      </Space>

      <h1>AES加密</h1>
      <Space direction="vertical" style={{ width: '100%' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ width: '80px' }}>明文：</div>
          <Input 
            size="large" 
            placeholder="请输入要加密的文本" 
            value={aesText}
            onChange={(e) => updateAesText(e.target.value)}
          />
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ width: '80px' }}>密文：</div>
          <Input 
            size="large"
            value={aesEncrypted}
            onChange={(e) => updateAesEncrypted(e.target.value)}
            placeholder="加密结果或输入要解密的密文"
          />
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ width: '80px' }}>密钥：</div>
          <Input 
            size="large" 
            placeholder="请输入要加密的秘钥" 
            value={aesKey}
            onChange={(e) => updateAesKey(e.target.value)}
          />
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ width: '80px' }}>向量：</div>
          <Input 
            size="large" 
            placeholder="请输入要加密的向量" 
            value={aesIv}
            onChange={(e) => updateAesIv(e.target.value)}
          />
        </div>
        <Space>
          <Button type="primary" onClick={handleAesEncrypt}>加密</Button>
          <Button onClick={handleAesDecrypt}>解密</Button>
        </Space>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ width: '80px' }}>解密结果：</div>
          <div>{aesDecrypted}</div>
        </div>
      </Space>
    </>
  )
}

export default App
