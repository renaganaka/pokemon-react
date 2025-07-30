import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ConfigProvider, Layout, Typography } from 'antd';
import HomePage from './pages/HomePage';

const { Header, Content } = Layout;
const { Title } = Typography;

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#e3350d',
            borderRadius: 8,
          },
        }}
      >
        <Layout style={{ minHeight: '100vh' }}>
          <Header style={{ 
            backgroundColor: '#e3350d', 
            padding: '0 24px',
            display: 'flex',
            alignItems: 'center'
          }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/9/98/International_Pok%C3%A9mon_logo.svg" 
                alt="Pokémon" 
                style={{ height: 40, marginRight: 16 }}
              />
              <Title level={3} style={{ color: 'white', margin: 0 }}>
                Коллекция Покéмонов
              </Title>
            </div>
          </Header>
          
          <Content style={{ padding: 24, backgroundColor: '#f5f5f5' }}>
            <HomePage />
          </Content>
        </Layout>
      </ConfigProvider>
    </QueryClientProvider>
  );
};

export default App;