import { Entity } from '@project/util/util-types';
import { File } from '@project/shared/app-types';

export class FileEntity implements Entity<FileEntity>, File {
  public id: string;
  public hashName: string;
  public mimetype: string;
  public originalName: string;
  public path: string;
  public size: number;
  public appName: string;
  public objectId: string;

  constructor(file: File) {
    this.fillEntity(file);
  }

  public fillEntity(entity) {
    this.id = entity.id;
    this.hashName = entity.hashName;
    this.mimetype = entity.mimetype;
    this.originalName = entity.originalName;
    this.path = entity.path;
    this.size = entity.size;
    this.appName = entity.appName;
    this.objectId = entity.objectId;
  }

  public toObject(): FileEntity {
    return {
      ...this,
    }
  }
}
