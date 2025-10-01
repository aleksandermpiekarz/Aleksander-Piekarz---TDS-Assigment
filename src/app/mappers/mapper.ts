export abstract class Mapper<T, DTO> {
  abstract toDTO(data: T): DTO;
  abstract fromDTO(data: DTO): T;
}

export interface FromDTO<DTO, T> {
  fromDTO(data: DTO): T;
}

export interface ToDTO<T, DTO> {
  toDTO(data: T): DTO;
}
