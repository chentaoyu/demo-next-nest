import { Controller, Get, Param, ParseIntPipe, Render } from '@nestjs/common';
import { AppService } from './app.service';
import { map, toArray } from 'rxjs';
import { UseInterceptors } from '@nestjs/common';
import { ParamsInterceptor } from './params.interceptor';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  @UseInterceptors(ParamsInterceptor)
  home() {
    return this.appService.getBlogPosts().pipe(
      toArray(),
      map((blogPosts) => ({ blogPosts })),
    );
  }

  @Get(':id')
  @Render('[id]')
  @UseInterceptors(ParamsInterceptor)
  /**
   * blogPost
   */
  public blogPost() {
    return {};
  }

  @Get('/api/blog-posts')
  /**
   * listBlogPosts
   */
  public listBlogPosts() {
    return this.appService.getBlogPosts();
  }

  @Get('/api/blog-posts/:id')
  /**
   * getBlogPostById
   */
  public getBlogPostById(@Param('id', new ParseIntPipe()) id: number) {
    return this.appService.getBlogPost(id);
  }
}
