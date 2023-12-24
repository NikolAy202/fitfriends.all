import { TrainingLevel, UserRole } from "@project/shared/app-types";
import { UsersQueryDto } from "@project/shared/shared-query";

export interface SomeObject {
  [key: string]: any;
}


export class UsersQuery {

  public limit: number;
  public skip: number;
  public filter?: SomeObject;
  public sort?: SomeObject;

  constructor(query: UsersQueryDto) {
    this.fillQuery(query)
  }

  public fillQuery(query: UsersQueryDto) {
    this.sort = this.getSort(query.userRole, query.sortDate);
    this.filter = this.getFilter(query.userRole, query.typeTaining, query.trainingLevel, query.location )
    this.limit = this.getLimit(query.limit, query.page);
  }

  public getSort(userRole?: string, sortDat?: string) {
    const sortObj: SomeObject = {}
    sortDat ? sortObj['createdAt'] = sortDat : -1;


    return sortObj
  }

  public getLimit(limit?: number, page?:number) {
    const limitCount = limit? limit : 50
    const pageNum = page? (page-1) : 0;
    const skip = pageNum*limitCount ;
    const limitNumber = limitCount + skip

    return limitNumber
  }

  public getFilter(userRole?: UserRole, typeTaining?: string[], trainingLevel?: TrainingLevel, location?: string[] ) {

    const filterObj: SomeObject = {}
    if (userRole) {
      filterObj['role'] = userRole;
    }
    if (trainingLevel) {
      filterObj['trainingLevel'] = trainingLevel;
      }
    if (typeTaining) {
      filterObj['type'] =  typeTaining;
      };
    if (location) {
      filterObj['location'] =  location;
      }

    return filterObj
  }

  public toObject() {
    return {...this};
  }

}
