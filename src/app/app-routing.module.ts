import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'contrasena-olvidada',
    loadChildren: () => import('./pages/contrasena-olvidada/contrasena-olvidada.module').then( m => m.ContrasenaOlvidadaPageModule)
  },
  {
    path: 'crear-ruta',
    loadChildren: () => import('./pages/crear-ruta/crear-ruta.module').then( m => m.CrearRutaPageModule)
  },
  {
    path: 'lista-vehiculo',
    loadChildren: () => import('./pages/lista-vehiculo/lista-vehiculo.module').then( m => m.ListaVehiculoPageModule)
  },
  {
    path: 'modificar-perfil',
    loadChildren: () => import('./pages/modificar-perfil/modificar-perfil.module').then( m => m.ModificarPerfilPageModule)
  },
  {
    path: 'pantalla-principal',
    loadChildren: () => import('./pages/pantalla-principal/pantalla-principal.module').then( m => m.PantallaPrincipalPageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./pages/perfil/perfil.module').then( m => m.PerfilPageModule)
  },
  {
    path: 'preguntas-frecuentes',
    loadChildren: () => import('./pages/preguntas-frecuentes/preguntas-frecuentes.module').then( m => m.PreguntasFrecuentesPageModule)
  },
  {
    path: 'registro-vehiculo',
    loadChildren: () => import('./pages/registro-vehiculo/registro-vehiculo.module').then( m => m.RegistroVehiculoPageModule)
  },
  {
    path: 'viaje',
    loadChildren: () => import('./pages/viaje/viaje.module').then( m => m.ViajePageModule)
  },
  {
    path: 'ver-recorrido',
    loadChildren: () => import('./pages/ver-recorrido/ver-recorrido.module').then( m => m.VerRecorridoPageModule)
  },
  {
    path: 'cambiar-clave',
    loadChildren: () => import('./pages/cambiar-clave/cambiar-clave.module').then( m => m.CambiarClavePageModule)
  },
  {
    path: 'reportes',
    loadChildren: () => import('./pages/reportes/reportes.module').then( m => m.ReportesPageModule)
  },
  {
    path: 'loading',
    loadChildren: () => import('./pages/loading/loading.module').then( m => m.LoadingPageModule)
  },
  {
    path: 'ruta-actual',
    loadChildren: () => import('./pages/ruta-actual/ruta-actual.module').then( m => m.RutaActualPageModule)
  },
  {
    path: 'paso2-olvidada',
    loadChildren: () => import('./pages/paso2-olvidada/paso2-olvidada.module').then( m => m.Paso2OlvidadaPageModule)
  },
  {
    path: 'ruta-actual-pasajero',
    loadChildren: () => import('./pages/ruta-actual-pasajero/ruta-actual-pasajero.module').then( m => m.RutaActualPasajeroPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
