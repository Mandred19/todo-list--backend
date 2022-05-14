export function transformTodoItemValueResponse(response): ITodoItemsResponseValue {
  return {
    id: response._id,
    title: response.title,
    description: response.description,
    createdDate: response.createdDate,
    updatedDate: response.updatedDate,
    isComplete: response.isComplete,
    isFavorite: response.isFavorite,
  };
}

export interface ITodoItemsResponseValue {
  id: string;
  title: string;
  description: string;
  createdDate: Date;
  updatedDate: Date;
  isComplete: boolean;
  isFavorite: boolean;
}