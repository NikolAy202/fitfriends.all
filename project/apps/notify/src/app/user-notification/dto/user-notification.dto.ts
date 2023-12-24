import { ApiProperty } from "@nestjs/swagger";
import { RequestStatus, RequestType } from "@project/shared/app-types";

export class CreateRequestDto {

  @ApiProperty({
    description: 'Initiator Id'
  })
  public authorId: string;

  @ApiProperty({
    description: 'User Id'
  })
  public userId: string;

  @ApiProperty({
    description: 'Current status of the request',
    enum: RequestStatus, enumName: 'StatusRequest'})
  public status: RequestStatus;

  @ApiProperty({
    description: 'Type request',
    enum: RequestType, enumName: 'TypeRequest'})
  public type: RequestType;
}
