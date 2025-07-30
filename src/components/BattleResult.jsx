import React from 'react';
import { Card, Row, Col, Typography, Progress } from 'antd';

const { Title, Text } = Typography;

const BattleResult = ({ pokemon1, pokemon2 }) => {
  if (!pokemon1 || !pokemon2) return null;
  
  const pokemon1Power = pokemon1.stats.reduce((sum, stat) => sum + stat.base_stat, 0);
  const pokemon2Power = pokemon2.stats.reduce((sum, stat) => sum + stat.base_stat, 0);
  
  const winner = pokemon1Power > pokemon2Power 
    ? pokemon1 
    : pokemon2Power > pokemon1Power 
      ? pokemon2 
      : null;
  
  const getStatValue = (pokemon, statName) => {
    return pokemon.stats.find(s => s.stat.name === statName)?.base_stat || 0;
  };
  
  const stats = [
    { name: 'hp', label: 'HP' },
    { name: 'attack', label: 'Attack' },
    { name: 'defense', label: 'Defense' },
    { name: 'special-attack', label: 'Sp. Atk' },
    { name: 'special-defense', label: 'Sp. Def' },
    { name: 'speed', label: 'Speed' },
  ];
  
  return (
    <div style={{ marginTop: 40 }}>
      <Title level={3} style={{ textAlign: 'center', marginBottom: 24 }}>
        Результаты битвы
      </Title>
      
      {winner ? (
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <Title level={4}>
            Победитель: {winner.name.charAt(0).toUpperCase() + winner.name.slice(1)} 
            <span style={{ color: '#ff4d4f', marginLeft: 8 }}>🏆</span>
          </Title>
          <Text>
            Общая сила: {Math.max(pokemon1Power, pokemon2Power)} vs {Math.min(pokemon1Power, pokemon2Power)}
          </Text>
        </div>
      ) : (
        <Title level={4} style={{ textAlign: 'center' }}>Ничья!</Title>
      )}
      
      <Row gutter={24}>
        <Col span={12}>
          <Card 
            title={pokemon1.name.charAt(0).toUpperCase() + pokemon1.name.slice(1)}
            bordered={false}
          >
            <img 
              src={pokemon1.sprites.other['official-artwork'].front_default || pokemon1.sprites.front_default} 
              alt={pokemon1.name} 
              style={{ height: 120, display: 'block', margin: '0 auto' }}
            />
            
            {stats.map(stat => {
              const value = getStatValue(pokemon1, stat.name);
              const opponentValue = getStatValue(pokemon2, stat.name);
              const isBetter = value > opponentValue;
              
              return (
                <div key={stat.name} style={{ marginTop: 12 }}>
                  <Text strong>{stat.label}:</Text>
                  <Progress 
                    percent={Math.min(100, (value / 150) * 100)} 
                    status={isBetter ? 'active' : 'normal'}
                    strokeColor={isBetter ? '#52c41a' : '#1890ff'}
                    format={() => `${value} ${isBetter ? '👍' : ''}`}
                  />
                </div>
              );
            })}
          </Card>
        </Col>
        
        <Col span={12}>
          <Card 
            title={pokemon2.name.charAt(0).toUpperCase() + pokemon2.name.slice(1)}
            bordered={false}
          >
            <img 
              src={pokemon2.sprites.other['official-artwork'].front_default || pokemon2.sprites.front_default} 
              alt={pokemon2.name} 
              style={{ height: 120, display: 'block', margin: '0 auto' }}
            />
            
            {stats.map(stat => {
              const value = getStatValue(pokemon2, stat.name);
              const opponentValue = getStatValue(pokemon1, stat.name);
              const isBetter = value > opponentValue;
              
              return (
                <div key={stat.name} style={{ marginTop: 12 }}>
                  <Text strong>{stat.label}:</Text>
                  <Progress 
                    percent={Math.min(100, (value / 150) * 100)} 
                    status={isBetter ? 'active' : 'normal'}
                    strokeColor={isBetter ? '#52c41a' : '#1890ff'}
                    format={() => `${value} ${isBetter ? '👍' : ''}`}
                  />
                </div>
              );
            })}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default BattleResult;