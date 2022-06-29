/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.group(() => {
    Route.post('/login', 'AuthController.login')
    Route.get('/logout', 'AuthController.logout').middleware('auth')

    Route.group(() => {
      Route.get('/', 'UsersController.index')
      Route.get('/:id', 'UsersController.show')
      Route.post('/', 'UsersController.create').middleware('isAdmin')
      Route.patch('/:id', 'UsersController.update').middleware('isAdmin')
      Route.delete('/:id', 'UsersController.delete').middleware('isAdmin')
    })
      .prefix('/users')
      .middleware('auth')

    Route.group(() => {
      Route.get('/', 'BooksController.index')
      Route.get('/:id', 'BooksController.show')
      Route.post('/', 'BooksController.create')
      Route.patch('/:id', 'BooksController.update')
      Route.delete('/:id', 'BooksController.delete')
    })
      .prefix('/books')
      .middleware('auth')

    Route.get('/migrate', 'DeploymentController.migrate')
    Route.get('/migrateList', 'DeploymentController.migrateList')
    Route.get('/seed', 'DeploymentController.seed')
  }).prefix('/v1')
}).prefix('/api')
