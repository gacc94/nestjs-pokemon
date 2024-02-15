import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { PokeResponse } from './interfaces/pokemon.interface';
import { PokemonService } from 'src/pokemon/services/pokemon.service';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';

@Injectable()
export class SeedService {

  private urlApiPokemon: string = 'https://pokeapi.co/api/v2/pokemon?limit=1000';

  constructor(
    private readonly pokemonService: PokemonService,
    private readonly AxiosAdapter: AxiosAdapter,
  ) { }

  async execSeed() {

    const data = await this.AxiosAdapter.get<PokeResponse>(this.urlApiPokemon);
    const arr: { name: string, no: number }[] = [];

    data.results.forEach(({ name, url }) => {
      const segments = url.split('/');
      const id = segments[segments.length - 2];
      arr.push({ name, no: +id });
    });
    await this.pokemonService.insertData(arr);
    return data.results;
  }
}
