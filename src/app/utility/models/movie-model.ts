
export class MovieSummary {
    budget: string = '';
    duration: number = 0;
    id: string = '';
    release_date: string = '';
    title: string = '';
}

export class MovieDetails {
    id: string = '';
    title: string = '';
    duration: number = 0;
    budget: string = '';
    release_date: string = '';
    box_office: string = '';
    cinematographers: string[] = [];
    poster: string = '';
    producers: string[] = [];
    summary: string = '';
}