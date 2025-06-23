import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/CreateTask.dto';
import { UpdateTaskDto } from './dto/UpdateTask.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiTags('Tasks')
@ApiBearerAuth()
@Controller('tasks')
@UseGuards(AuthGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post('/create')
  @ApiOperation({ summary: 'Create task' })
  @ApiResponse({
    status: 201,
    description: 'The Task has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  createTask(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.createTask(createTaskDto);
  }

  @Get('/getAll')
  @ApiOperation({ summary: 'Get all tasks' })
  @ApiResponse({ status: 200, description: 'Returns all tasks.' })
  @ApiResponse({ status: 403, description: 'Unauthorized request.' })
  getAllTasks() {
    return this.tasksService.getAllTasks();
  }

  @Patch('/update/:id')
  @ApiOperation({ summary: 'Update task by ID' })
  @ApiResponse({ status: 200, description: 'Task updated successfully.' })
  @ApiResponse({ status: 404, description: 'Task not found.' })
  @ApiResponse({ status: 400, description: 'Invalid input or parameters.' })
  updateTask(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.updateTask(id, updateTaskDto);
  }

  @Get('/get/:id')
  @ApiOperation({ summary: 'Get task by ID' })
  @ApiResponse({ status: 200, description: 'Task retrieved successfully.' })
  @ApiResponse({ status: 404, description: 'Task not found.' })
  getTaskById(@Param('id') id: string) {
    return this.tasksService.getTaskById(id);
  }

  @Delete('/delete/:id')
  @ApiOperation({ summary: 'Delete task by ID' })
  @ApiResponse({ status: 200, description: 'Task deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Task not found.' })
  deleteTask(@Param('id') id: string) {
    return this.tasksService.deleteTask(id);
  }

  @Get('/get-by-categoryId/:id')
  @ApiOperation({ summary: 'Get tasks by category ID' })
  @ApiResponse({ status: 200, description: 'Tasks filtered by category.' })
  @ApiResponse({
    status: 404,
    description: 'No tasks found for this category.',
  })
  getTasksByCategoryId(@Param('id') id: string) {
    return this.tasksService.getTasksByCategoryId(id);
  }
}
