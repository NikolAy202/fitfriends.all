import { Body, Controller, Get, HttpStatus, Param, Post, Query } from '@nestjs/common';
import { fillObject } from '@project/util/util-core';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CommentsService } from './comment.service';
import { CommentRdo } from './rdo/comment.rdo';
import { CommentDto } from './dto/comment.dto';
import { CommentQuery } from './query/comment.query';


@ApiTags('comments')
@Controller('comment')
export class CommentsController {
  constructor(
    private readonly commentsService: CommentsService
  ) {}


  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The new post has been successfully created.'
  })
  @Post('create/:trainingId')
  public async create(@Param('trainingId') trainingId: string, @Body() dto: CommentDto) {
    const newComment = await this.commentsService.createComment(trainingId, dto);
    return fillObject(CommentRdo, newComment);
  }

  @ApiResponse({
    type: CommentRdo,
    status: HttpStatus.OK,
    description: 'Comment by trainingId found'
  })
  @Get(':trainingId')
  public async showByTrainingId(@Query() query: CommentQuery, @Param('trainingId') trainingId: string) {
    const comments = await this.commentsService.getTrainingId(trainingId, query);
    return fillObject(CommentRdo, comments);
  }

}
