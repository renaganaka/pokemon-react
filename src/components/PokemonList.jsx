import React, { useRef } from 'react';
import { useInView } from 'framer-motion';
import { Spin, Row, Col, Typography } from 'antd';
import PokemonCard from './PokemonCard';
import { usePokemonList } from '../hooks/usePokemon';

const { Title } = Typography;

const PokemonList = () => {
  const { 
    data, 
    fetchNextPage, 
    hasNextPage, 
    isFetchingNextPage, 
    status 
  } = usePokemonList();
  
  const loadMoreRef = useRef();
  const isInView = useInView(loadMoreRef);
  
  React.useEffect(() => {
    if (isInView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [isInView, hasNextPage, isFetchingNextPage, fetchNextPage]);
  
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
  
  return (
    <div>
      <Title level={2} style={{ marginBottom: 24 }}>Дикие Покéмоны</Title>
      
      <Row gutter={[16, 24]}>
        {data.pages.map((page, pageIndex) => (
          <React.Fragment key={pageIndex}>
            {page.data.map(pokemon => (
              <Col key={pokemon.id} xs={24} sm={12} md={8} lg={6}>
                <PokemonCard pokemon={pokemon} />
              </Col>
            ))}
          </React.Fragment>
        ))}
      </Row>
      
      <div ref={loadMoreRef} style={{ textAlign: 'center', padding: 20 }}>
        {isFetchingNextPage ? (
          <Spin />
        ) : hasNextPage ? (
          <p>Идет загрузка Покéмонов...</p>
        ) : (
          <p>Покéмоны закончились</p>
        )}
      </div>
    </div>
  );
};

export default PokemonList;