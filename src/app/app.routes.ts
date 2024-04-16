import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./movie-list/movie-list.component').then((comp) => comp.MovieListComponent)
    },
    {
        path: 'movie/:id',
        loadComponent: () => import('./movie-details/movie-details.component').then((comp) => comp.MovieDetailsComponent)
    }
];
