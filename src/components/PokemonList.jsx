import React, { useEffect, useRef } from 'react';
import { Spin, Row, Col, Typography, Button } from 'antd';
import PokemonCard from './PokemonCard';
import { usePokemonList } from '../hooks/usePokemon';

const { Title } = Typography;

const PokemonList = () => {
  const { 
    data, 
    fetchNextPage, 
    hasNextPage, 
    isFetchingNextPage, 
    isFetching,
    status 
  } = usePokemonList();
  
  const loadMoreRef = useRef();
  const observer = useRef();
  
  useEffect(() => {
    if (!hasNextPage || isFetchingNextPage) return;
    
    const callback = (entries) => {
      if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    };
    
    observer.current = new IntersectionObserver(callback, {
      rootMargin: '100px',
      threshold: 0.1
    });
    
    if (loadMoreRef.current) {
      observer.current.observe(loadMoreRef.current);
    }
    
    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);
  
  if (status === 'pending') {
    return (
      <div style={{ textAlign: 'center', padding: 40 }}>
        <Spin size="large" />
      </div>
    );
  }
  
  if (status === 'error') {
    return <div>Ошибка загрузки</div>;
  }
  
  const allPokemons = data.pages.flatMap(page => page.data);
  if (allPokemons.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: 40 }}>
        <Title level={3}>Покемонов нет</Title>
      </div>
    );
  }

  return (
    <div>
      <Title level={2} style={{ marginBottom: 24 }}>Дикие Покéмоны</Title>
      
      <Row gutter={[16, 24]}>
        {allPokemons.map(pokemon => (
          <Col key={pokemon.id} xs={24} sm={12} md={8} lg={6}>
            <PokemonCard pokemon={pokemon} />
          </Col>
        ))}
      </Row>
      
      <div ref={loadMoreRef} style={{ textAlign: 'center', padding: 20 }}>
        {isFetchingNextPage ? (
          <Spin size="large" />
        ) : hasNextPage ? (
          <Button 
            type="primary" 
            onClick={() => fetchNextPage()}
            loading={isFetching}
          >
            Загрузить больше Покéмонов
          </Button>
        ) : (
          <Title level={4} style={{ marginTop: 20 }}>
            Это все Покéмоны
          </Title>
        )}
      </div>
    </div>
  );
};

export default PokemonList;