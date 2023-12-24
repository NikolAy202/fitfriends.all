import { TypeTraining } from "@project/shared/app-types";
import { TraningQueryDto } from "./traning.query.dto";

export interface SomeObject {
  [key: string]: any;
}


export class TrainingQuery {

  public limit: number;
  public skip: number;
  public filter?: SomeObject;
  public sort?: SomeObject;

  constructor(query: TraningQueryDto) {
    this.fillQuery(query)
  }

  public fillQuery(query: TraningQueryDto) {
    this.sort = this.getSort(query.sortPrice, query.sortDate);
    this.filter = this.getFilter(query.price, query.caloriesReset, query.rating, query.trainingType, )
    this.limit = this.getLimit(query.limit, query.page);
  }

  public getSort(sortPrice?: number, date?: string) {
    const sortObj: SomeObject = {}
    sortPrice ? sortObj['price'] = sortPrice : '';
    date ? sortObj['createdAt'] = date : sortObj['createdAt'] = -1;


    return sortObj
  }

  public getLimit(limit?: number, page?:number) {
    const limitCount = limit? limit : 50
    const pageNum = page? (page-1) : 0;
    const skip = pageNum*limitCount ;
    const limitNumber = limitCount + skip

    return limitNumber
  }

  public getFilter(filterPrice?: string, caloriesReset?: number[], rating?: number[], trainingType?: TypeTraining[] ) {

    const filterObj: SomeObject = {}
    if (filterPrice) {
      const filte = filterPrice.split(',');
      filterObj['price'] =  { "$gte": filte[0],
                             "$lte": filte[1],
                           };
                        }
    if (caloriesReset) {
      filterObj['caloriesBurnedTraining'] =  { "$gte": caloriesReset[0],
                                      "$lte": caloriesReset[1],
                                   };
                      }
    if (rating) {filterObj['rating'] =  { "$gte": rating[0],
                      "$lte": rating[1],
                    }
                   }
    if (trainingType) {filterObj['typeTraining'] = { "$in": trainingType };}

    return filterObj
  }

  public toObject() {
    return {...this};
  }

}
