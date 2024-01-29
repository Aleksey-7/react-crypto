import { Layout, Select, Space, Button } from 'antd';
import { useCrypto } from '../../context/CryptoContext';
import { useEffect, useState } from 'react';

const headerStyle = {
  width: '100%',
  textAlign: 'center',
  padding: '1rem',
  height: 60,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

export const AppHeader = () => {
  const [select, setSelect] = useState(false);
  const { crypto } = useCrypto();

  useEffect(() => {
    const keypress = e => {
      if (e.key === '/') {
        setSelect(prev => !prev);
      }
    };
    document.addEventListener('keypress', keypress);
    return () => document.removeEventListener('keypress', keypress);
  }, []);

  function handleSelect(value) {}

  return (
    <Layout.Header style={headerStyle}>
      <Select
        style={{
          width: '250px',
        }}
        open={select}
        onSelect={handleSelect}
        onClick={() => setSelect(prev => !prev)}
        value="press / to open"
        options={crypto.map(coin => ({
          label: coin.name,
          value: coin.id,
          icon: coin.icon,
        }))}
        optionRender={option => (
          <Space>
            <img style={{ width: 20 }} src={option.data.icon} alt={option.data.label} />{' '}
            {option.data.label}
          </Space>
        )}
      />
      <Button type="primary">Add Asset</Button>
    </Layout.Header>
  );
};
