export default class ImagesApiService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
    }
    fetchImages() {
        const BASE_URL = 'https://pixabay.com/api/';
        const KEY = '23189460-aa79835af7cd31cf0c37fbc18';
        const per_page = 12;

        const url = `${BASE_URL}?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=${per_page}&key=${KEY}`;
        return fetch(url)
            .then(response => response.json());

    }
    incrementPage() {
        this.page += 1;
    }
    resetPage() {
       this.page = 1; 
    }
    get query() {
        return this.searchQuery;
    }

    set query(newQuery) {
        this.searchQuery = newQuery;
    }
}