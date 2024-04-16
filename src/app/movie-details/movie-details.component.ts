import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MoviesService } from '../utility/services/movies.service';
import { MovieDetails } from '../utility/models/movie-model';
import { DurationPipe } from '../utility/pipes/duration.pipe';
import { CustomCurrencyPipe } from '../utility/pipes/custom-currency.pipe';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [DurationPipe, CustomCurrencyPipe],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.css'
})

export class MovieDetailsComponent implements OnInit {
  router = inject(Router);
  route = inject(ActivatedRoute);
  movieService = inject(MoviesService);
  movieDetails = new MovieDetails();
  showLoader = true;

  ngOnInit(): void {

    this.getMovieDetails(this.route.snapshot.params['id']);
  }

  getMovieDetails(movieId: string): void {
    this.movieService.getMovieDetails(movieId).subscribe((response: MovieDetails) => {
      this.movieDetails = response;
      setTimeout(() => {
        this.showLoader = false;
      }, 500);
    })
  }

  navigateToHome(): void {
    this.router.navigateByUrl('')
  }
}
