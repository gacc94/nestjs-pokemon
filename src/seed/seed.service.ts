import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { PokeResponse } from './interfaces/pokemon.interface';

@Injectable()
export class SeedService {

  async execSeed() {
    const { data } = await axios.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=10');
    data.results.forEach(({ name, url }) => {
      const segments = url.split('/');
      const id = segments[segments.length - 2];
      console.log({ name, id });
    });
    return data.results;
  }
}
