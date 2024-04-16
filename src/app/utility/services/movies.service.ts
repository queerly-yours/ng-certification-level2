import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpResponse, http } from 'msw';
import { Observable } from 'rxjs';
import { MovieDetails, MovieSummary } from '../models/movie-model';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {

  constructor(private httpClient: HttpClient) { }

  getMoviesList(): Observable<MovieSummary[]> {
    return this.httpClient.get<MovieSummary[]>('/movies');
  }

  getMovieDetails(movieId: string): Observable<MovieDetails> {
    return this.httpClient.get<MovieDetails>(`/movies/${movieId}`);
  }
}
