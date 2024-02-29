const API_URL = "https://api.themoviedb.org/3/"

export const API_ROUTES = {
    MOVIESEARCH: `${API_URL}search/movie?include_adult=false&language=fr-FR&query=`,
    SERIESEARCH: `${API_URL}search/tv?include_adult=false&language=fr-FR&query=`,
};