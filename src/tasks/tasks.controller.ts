import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { TasksService} from './tasks.service';
import { Task, TaskStatus } from './tasks.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';


@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService){}
    
    @Get('filter')
    getFilter( @Query() filterDto: GetTasksFilterDto):  Task [] {
      if(Object.keys(filterDto).length){
        return this.tasksService.getFilter(filterDto);
      }else{
       // return this.tasksService.getAllTasks();
      }     
    }

    @Get('/:id')
    getTaskById(@Param('id') id:string):  Promise<Task>{
        return this.tasksService.getTaskById(id);
    }

    @Get()
    getAllTasks(): Promise<Task[]> {
        return this.tasksService.getAllTasks();
    }

    @Post()
    @UsePipes(ValidationPipe)
    createTask(@Body()  createTaskDto: CreateTaskDto ):  Promise<Task>{
      return  this.tasksService.createTask(createTaskDto);
    }

    @Delete('/:id')
    deleteTask(@Param('id') id:string): void{
         this.tasksService.deleteTassk(id);
    }

    @Patch('/:id')
    updateTaskStatus(
        @Param('id') id: string,
        @Body('status',TaskStatusValidationPipe) status: TaskStatus,
    ): Promise<Task>{
        return this.tasksService.updateTaskStatus(id, status);
    }
}