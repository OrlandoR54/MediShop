import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes, CanActivate } from '@angular/router';
import { AuthGuard } from './Security/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'iniciar-sesion',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./Shared/registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'iniciar-sesion',
    loadChildren: () => import('./Shared/iniciar-sesion/iniciar-sesion.module').then( m => m.IniciarSesionPageModule)
  },
  {
    path: 'user-main',
    loadChildren: () => import('./usuario/user-main/user-main.module').then( m => m.UserMainPageModule),
    //canActivate: [AuthGuard]
  },
  {
    path: 'user-update',
    loadChildren: () => import('./usuario/user-update/user-update.module').then( m => m.UserUpdatePageModule)
  },
  {
    path: 'admin-main',
    loadChildren: () => import('./admin/admin-main/admin-main.module').then( m => m.AdminMainPageModule)
  },
  {
    path: 'create-product',
    loadChildren: () => import('./admin/create-product/create-product.module').then( m => m.CreateProductPageModule)
  },
  {
    path: 'product',
    loadChildren: () => import('./admin/product/product.module').then( m => m.ProductPageModule)
  },
  {
    path: 'crear-repartidor',
    loadChildren: () => import('./admin/crear-repartidor/crear-repartidor.module').then( m => m.CrearRepartidorPageModule)
  },
  {
    path: 'show-repartidor',
    loadChildren: () => import('./admin/show-repartidor/show-repartidor.module').then( m => m.ShowRepartidorPageModule)
  },
  {
    path: 'map',
    loadChildren: () => import('./usuario/map/map.module').then( m => m.MapPageModule)
  },
  {
    path: 'carrito',
    loadChildren: () => import('./usuario/carrito/carrito.module').then( m => m.CarritoPageModule)
  },
  {
    path: 'user-product',
    loadChildren: () => import('./usuario/user-product/user-product.module').then( m => m.UserProductPageModule)
  },
  {
    path: 'users',
    loadChildren: () => import('./admin/users/users.module').then( m => m.UsersPageModule)
  },
  {
    path: 'category',
    loadChildren: () => import('./admin/category/category.module').then( m => m.CategoryPageModule)
  },
  {
    path: 'create-category',
    loadChildren: () => import('./admin/create-category/create-category.module').then( m => m.CreateCategoryPageModule)
  },
  {
    path: 'product-x-cat',
    loadChildren: () => import('./usuario/product-x-cat/product-x-cat.module').then( m => m.ProductXCatPageModule)
  },
  {
    path: 'product-detail',
    loadChildren: () => import('./usuario/product-detail/product-detail.module').then( m => m.ProductDetailPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
