import { AfterViewInit, Component, OnInit, inject } from '@angular/core';
import { MovieDetails, MovieSummary } from '../utility/models/movie-model';
import { MoviesService } from '../utility/services/movies.service'
import { CommonModule } from '@angular/common';
import { DurationPipe } from "../utility/pipes/duration.pipe";
import { CustomCurrencyPipe } from "../utility/pipes/custom-currency.pipe";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.css',
  imports: [CommonModule,
    DurationPipe,
    CustomCurrencyPipe,
    FormsModule,
    ReactiveFormsModule]
})
export class MovieListComponent implements OnInit, AfterViewInit {

  movieService = inject(MoviesService);
  moviesList: MovieSummary[] = [];
  filteredMoviesList: MovieSummary[] = [];
  filters!: FormGroup;
  fb = inject(FormBuilder);
  router = inject(Router);

  ngOnInit(): void {
    this.buildFiltersInput();
    this.getMovies();
  }

  buildFiltersInput(): void {
    this.filters = this.fb.group({
      title: [''],
      release_year: ['']
    })
  }

  ngAfterViewInit(): void {
    this.filters.valueChanges.subscribe(
      (value: { title: string, release_year: string }) => {
        this.filteredMoviesList = this.filterMovies(value);
      })
  }

  filterMovies(value: { title: string, release_year: string }): MovieSummary[] {
    return this.moviesList.filter((item: MovieSummary) =>
      this.filterMovieTitle(item.title, value.title) && this.filterMovieReleaseYear(item.release_date, value.release_year)
    )
  }

  filterMovieTitle(existingValue: string, filterValue: string): boolean {
    return existingValue.toLowerCase().indexOf(filterValue.toLowerCase()) > -1;
  }

  filterMovieReleaseYear(release_date: string, filterValue: string): boolean {
    return new Date(release_date).getFullYear().toString().indexOf(filterValue) > -1
  }

  getMovies(): void {
    this.movieService.getMoviesList().subscribe((response) => {
      this.moviesList = response;
      this.filteredMoviesList = response;
    });
  }

  navigateToMovieDetails(movieId: string): void {
    this.router.navigateByUrl(`movie\/${movieId}`);
  }
}
