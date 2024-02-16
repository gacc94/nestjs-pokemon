import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreatePokemonDto } from '../dto/create-pokemon.dto';
import { UpdatePokemonDto } from '../dto/update-pokemon.dto';
import { Model } from 'mongoose';
import { Pokemon } from '../entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PokemonService {

  private defaultLimit: number;

  constructor(
    @InjectModel(Pokemon.name) private readonly pokemonModel: Model<Pokemon>,
    private readonly configService: ConfigService,
  ) {
    this.defaultLimit = this.configService.get<number>('DEFAULT_LIMIT');
  }

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

  async findAll(paginationDto: PaginationDto) {
    return await this.pokemonModel.find()
      .limit(paginationDto.limit)
      .skip(paginationDto.offset)
      .sort().exec();
  }

  async findOne(id: string) {
    return await this.pokemonModel.findById(id).exec();
  }

  async update(id: string, updatePokemonDto: UpdatePokemonDto) {
    return await this.pokemonModel.findByIdAndUpdate(id, updatePokemonDto, { new: true });
  }

  async remove(id: string) {
    return await this.pokemonModel.findByIdAndDelete(id);
    // return await this.pokemonModel.deleteOne({ _id });
  }

  async insertData(data: any[]): Promise<void> {
    await this.pokemonModel.insertMany(data);
  }
}
