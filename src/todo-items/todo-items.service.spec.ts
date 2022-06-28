import { Test, TestingModule } from '@nestjs/testing';
import { TodoItemsService } from './todo-items.service';
import { TodoItemEntity } from './entities/todo-item.entity';
import { CreateTodoItemDto } from './dto/create-todo-item.dto';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

const createDto: CreateTodoItemDto = {
  title: 'some title',
  description: 'some description',
  isFavorite: false,
  isComplete: false,
};

const createTodoItem = (idx: number): TodoItemEntity => {
  return {
    id: `item id ${idx}`,
    title: `some title ${idx}`,
    description: `some description ${idx}`,
    isFavorite: false,
    isComplete: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    _version: 1,
    author: {
      id: `user id ${idx}`,
      name: `User ${idx}`,
      email: '',
      password: '',
      avatar: '',
      createdAt: new Date(),
      updatedAt: new Date(),
      _version: 1,
    },
  };
};

const todoItem = createTodoItem(1);

const todoItemList: TodoItemEntity[] = [createTodoItem(0), createTodoItem(1), createTodoItem(2), createTodoItem(3)];

describe('TodoItemsService', () => {
  let service: TodoItemsService;
  let entity: Repository<TodoItemEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TodoItemsService,
        {
          provide: getRepositoryToken(TodoItemEntity),
          useValue: {
            create: jest.fn().mockResolvedValue(createDto),
            findAll: jest.fn().mockResolvedValue(todoItemList),
            findOne: jest.fn().mockResolvedValue(todoItem),
          },
        },
      ],
    }).compile();

    service = await module.get<TodoItemsService>(TodoItemsService);
    entity = await module.get<Repository<TodoItemEntity>>(getRepositoryToken(TodoItemEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // describe('create()', () => {
  //   it('should save a todo item in the database', async () => {
  //     const result = await service.create(createDto, 'token');
  //     expect(result.toEqual(createDto));
  //   });
  // });

  describe('findAll()', () => {
    it('should return an array of todo items', async () => {
      const list = await service.findAll('token');
      expect(list).toEqual(todoItemList);
    });
  });

  // describe('findOne()', () => {
  //   it('should return a single todo item', async () => {
  //     const repoSpy = jest.spyOn(entity, 'find');
  //     expect(service.findOne('item id 1', 'token').resolves.toEqual(todoItem));
  //     expect(repoSpy).toBeCalledWith({ id: 'item id 1' });
  //   });
  // });
});
