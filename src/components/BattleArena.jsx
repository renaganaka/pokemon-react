import React, { useState } from 'react';
import { 
  Row, 
  Col, 
  Select, 
  Card, 
  Button, 
  Typography, 
  Empty 
} from 'antd';
import usePokemonStore from '../store/pokemonStore';
import BattleResult from './BattleResult';

const { Title } = Typography;

const BattleArena = () => {
  const { caughtPokemons } = usePokemonStore();
  const [pokemon1, setPokemon1] = useState(null);
  const [pokemon2, setPokemon2] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const handleBattle = () => {
    if (pokemon1 && pokemon2) {
      setShowResult(true);
    }
  };

  const handleReset = () => {
    setPokemon1(null);
    setPokemon2(null);
    setShowResult(false);
  };

  return (
    <div>
      <Title level={2} style={{ marginBottom: 24 }}>Арена для битвы</Title>
      
      {caughtPokemons.length === 0 ? (
        <Empty
          description="В коллекции никого нет"
          style={{ margin: '40px 0' }}
        />
      ) : (
        <>
          <Row gutter={24}>
            <Col span={10}>
              <Card title="Выбери первого Покéмона" bordered={false}>
                <Select
                  showSearch
                  placeholder="Выбери Покéмона"
                  optionFilterProp="children"
                  style={{ width: '100%' }}
                  onChange={value => {
                    setPokemon1(caughtPokemons.find(p => p.id === value));
                    setShowResult(false);
                  }}
                  filterOption={(input, option) =>
                    option.children.toLowerCase().includes(input.toLowerCase())
                  }
                >
                  {caughtPokemons.map(pokemon => (
                    <Select.Option key={pokemon.id} value={pokemon.id}>
                      {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
                    </Select.Option>
                  ))}
                </Select>
                
                {pokemon1 && (
                  <div style={{ marginTop: 20, textAlign: 'center' }}>
                    <img 
                      src={pokemon1.sprites.other['official-artwork'].front_default || pokemon1.sprites.front_default} 
                      alt={pokemon1.name} 
                      style={{ height: 140 }}
                    />
                    <Title level={4}>
                      {pokemon1.name.charAt(0).toUpperCase() + pokemon1.name.slice(1)}
                    </Title>
                  </div>
                )}
              </Card>
            </Col>
            
            <Col span={4} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ textAlign: 'center' }}>
                <Button 
                  type="primary" 
                  size="large" 
                  onClick={handleBattle}
                  disabled={!pokemon1 || !pokemon2}
                  style={{ marginBottom: 16 }}
                >
                  Бой!
                </Button>
                <br />
                <Button 
                  onClick={handleReset}
                >
                  Сброс 
                </Button>
              </div>
            </Col>
            
            <Col span={10}>
              <Card title="Выбери второго Покéмона" bordered={false}>
                <Select
                  showSearch
                  placeholder="Выбери Покéмона"
                  optionFilterProp="children"
                  style={{ width: '100%' }}
                  onChange={value => {
                    setPokemon2(caughtPokemons.find(p => p.id === value));
                    setShowResult(false);
                  }}
                  filterOption={(input, option) =>
                    option.children.toLowerCase().includes(input.toLowerCase())
                  }
                >
                  {caughtPokemons.map(pokemon => (
                    <Select.Option key={pokemon.id} value={pokemon.id}>
                      {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
                    </Select.Option>
                  ))}
                </Select>
                
                {pokemon2 && (
                  <div style={{ marginTop: 20, textAlign: 'center' }}>
                    <img 
                      src={pokemon2.sprites.other['official-artwork'].front_default || pokemon2.sprites.front_default} 
                      alt={pokemon2.name} 
                      style={{ height: 140 }}
                    />
                    <Title level={4}>
                      {pokemon2.name.charAt(0).toUpperCase() + pokemon2.name.slice(1)}
                    </Title>
                  </div>
                )}
              </Card>
            </Col>
          </Row>
          
          {showResult && pokemon1 && pokemon2 && (
            <BattleResult pokemon1={pokemon1} pokemon2={pokemon2} />
          )}
        </>
      )}
    </div>
  );
};

export default BattleArena;