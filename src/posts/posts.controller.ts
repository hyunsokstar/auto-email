// import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
// import { PostsService } from './posts.service';
// import { CreatePostDto } from './dto/create-post.dto';
// import { UpdatePostDto } from './dto/update-post.dto';

// @Controller('posts')
// export class PostsController {
//   constructor(private readonly postsService: PostsService) {}

//   @Post()
//   create(@Body() createPostDto: CreatePostDto) {
//     return this.postsService.create(createPostDto);
//   }

//   @Get()
//   findAll() {
//     return this.postsService.findAll();
//   }

//   @Get(':id')
//   findOne(@Param('id') id: string) {
//     return this.postsService.findOne(+id);
//   }

//   @Patch(':id')
//   update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
//     return this.postsService.update(+id, updatePostDto);
//   }

//   @Delete(':id')
//   remove(@Param('id') id: string) {
//     return this.postsService.remove(+id);
//   }
// }

import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { PostsService } from './posts.service';

interface IPost {
  author: string;
  title: string;
  content: string;
  likeCount: number;
  commentCount: number;
}

interface PostModel {
  id: number;
  author: string;
  title: string;
  content: string;
  likeCount: number;
  commentCount: number;
}

let posts: PostModel[] = [
  {
    id: 1,
    author: 'newjeans_official',
    title: '뉴진스 민지',
    content: '메이크업 고치고 있는 민지',
    likeCount: 1000000,
    commentCount: 8989,
  },
  {
    id: 2,
    author: 'newjeans_official',
    title: '뉴진스 민지',
    content: '노래 연습중인 해린',
    likeCount: 1000000,
    commentCount: 8989,
  },
  {
    id: 3,
    author: 'newjeans_official',
    title: '뉴진스 다니엘',
    content: '춤 연습중인 다니엘',
    likeCount: 1000000,
    commentCount: 8989,
  },
];

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) { }

  @Get('')
  getPosts(): PostModel[] {
    return posts;
  }

}