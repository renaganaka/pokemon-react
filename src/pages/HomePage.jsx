import React from 'react';
import { Tabs } from 'antd';
import PokemonList from '../components/PokemonList';
import BattleArena from '../components/BattleArena';
import usePokemonStore from '../store/pokemonStore';

const { TabPane } = Tabs;

const HomePage = () => {
  const { caughtPokemons } = usePokemonStore();
  
  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: 24 }}>
      <Tabs defaultActiveKey="1" type="card">
        <TabPane tab="Лови их" key="1">
          <PokemonList />
        </TabPane>
        <TabPane 
          tab={
            <span>
              Арена Битвы
              {caughtPokemons.length > 0 && (
                <span style={{ marginLeft: 8, backgroundColor: '#ff4d4f', 
                  borderRadius: '50%', width: 20, height: 20, 
                  display: 'inline-flex', justifyContent: 'center', 
                  alignItems: 'center', color: 'white', fontSize: 12 }}>
                  {caughtPokemons.length}
                </span>
              )}
            </span>
          } 
          key="2"
        >
          <BattleArena />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default HomePage;