import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchPokemons = async ({ pageParam = 0 }) => {
  const limit = 20;
  const response = await axios.get(
    `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${pageParam}`
  );
  
  const pokemonDetails = await Promise.all(
    response.data.results.map(pokemon => 
      axios.get(pokemon.url).then(res => res.data)
    )
  );
  
  return {
    data: pokemonDetails,
    nextPage: pageParam + limit,
    hasMore: pageParam + limit < response.data.count
  };
};

export const usePokemonList = () => {
  return useInfiniteQuery({
    queryKey: ['pokemons'],
    queryFn: fetchPokemons,
    getNextPageParam: (lastPage) => lastPage.hasMore ? lastPage.nextPage : undefined,
    initialPageParam: 0,
    staleTime: 60 * 60 * 1000,
  });
};