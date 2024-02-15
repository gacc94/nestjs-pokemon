import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreatePokemonDto } from '../dto/create-pokemon.dto';
import { UpdatePokemonDto } from '../dto/update-pokemon.dto';
import { Model } from 'mongoose';
import { Pokemon } from '../entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';
import { log } from 'console';

@Injectable()
export class PokemonService {

  constructor(
    @InjectModel(Pokemon.name) private readonly pokemonModel: Model<Pokemon>
  ) { }

  async create(createPokemonDto: CreatePokemonDto) {
    try {
      createPokemonDto.name = createPokemonDto.name.toLocaleLowerCase();
      return await this.pokemonModel.create(createPokemonDto);
    } catch (error) {
      if (error.code === 11000) {
        throw new BadRequestException('Pokemon already exists' + error.keyValue.no);
      }
      throw new InternalServerErrorException('Cannot create pokemon - Check your logs');
      console.log(error);
    }
  }

  async findAll() {
    return await this.pokemonModel.find().exec();
  }

  async findOne(id: string) {
    return await this.pokemonModel.findById(id);
  }

  async update(id: string, updatePokemonDto: UpdatePokemonDto) {
    return await this.pokemonModel.findByIdAndUpdate(id, updatePokemonDto, { new: true });
  }

  async remove(id: string) {
    return await this.pokemonModel.findByIdAndDelete(id);
    // return await this.pokemonModel.deleteOne({ _id });
  }
}
