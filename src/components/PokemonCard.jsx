import React from 'react';
import { Card, Button, Tag, Tooltip } from 'antd';
import { 
  HeartOutlined, 
  HeartFilled, 
  TrophyOutlined 
} from '@ant-design/icons';
import usePokemonStore from '../store/pokemonStore';

const PokemonCard = ({ pokemon }) => {
  const { caughtPokemons, catchPokemon, releasePokemon } = usePokemonStore();
  
  const isCaught = caughtPokemons.some(p => p.id === pokemon.id);
  
  const handleCatchRelease = () => {
    if (isCaught) {
      releasePokemon(pokemon.id);
    } else {
      catchPokemon({
        id: pokemon.id,
        name: pokemon.name,
        height: pokemon.height,
        weight: pokemon.weight,
        stats: pokemon.stats,
        types: pokemon.types,
        sprites: pokemon.sprites
      });
    }
  };
  
  const getStatValue = (statName) => {
    return pokemon.stats.find(s => s.stat.name === statName)?.base_stat || 0;
  };
  
  const totalPower = pokemon.stats.reduce((sum, stat) => sum + stat.base_stat, 0);
  
  return (
    <Card
      hoverable
      cover={
        <div style={{ backgroundColor: '#f5f5f5', padding: 20 }}>
          <img 
            src={pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default} 
            alt={pokemon.name} 
            style={{ height: 140, margin: '0 auto', display: 'block' }}
          />
        </div>
      }
      actions={[
        <Tooltip title={isCaught ? "Release Pokemon" : "Catch Pokemon"}>
          <Button 
            type={isCaught ? "primary" : "default"} 
            shape="circle" 
            icon={isCaught ? <HeartFilled /> : <HeartOutlined />} 
            onClick={handleCatchRelease}
          />
        </Tooltip>,
        <Tooltip title="Total Power">
          <Tag icon={<TrophyOutlined />} color="gold">
            {totalPower}
          </Tag>
        </Tooltip>
      ]}
    >
      <Card.Meta
        title={pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
        description={
          <div>
            <div style={{ marginBottom: 8 }}>
              {pokemon.types.map(type => (
                <Tag key={type.type.name} color="blue">
                  {type.type.name}
                </Tag>
              ))}
            </div>
            <div>
              <span>РОСТ: {pokemon.height / 10}m</span>
              <span style={{ marginLeft: 12 }}>ВЕС: {pokemon.weight / 10}кг</span>
            </div>
          </div>
        }
      />
    </Card>
  );
};

export default PokemonCard;