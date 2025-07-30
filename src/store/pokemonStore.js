import { create } from 'zustand';

const usePokemonStore = create((set) => ({
  caughtPokemons: [],
  
  catchPokemon: (pokemon) => 
    set((state) => {
      const isAlreadyCaught = state.caughtPokemons.some(p => p.id === pokemon.id);
      if (isAlreadyCaught) return state;
      
      return {
        caughtPokemons: [...state.caughtPokemons, pokemon]
      };
    }),
  
  releasePokemon: (pokemonId) =>
    set((state) => ({
      caughtPokemons: state.caughtPokemons.filter(p => p.id !== pokemonId)
    })),
}));

export default usePokemonStore;