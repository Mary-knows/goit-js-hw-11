export default class SearchPixabay {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
        this.totalHits = 0;
    }

    fetchPictures() {
        const API_KEY = '31321557-ae5113305225a26c2527bc1e8';
        const url = `https://pixabay.com/api/?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=40`
        
        return fetch(url)
            .then(response => response.json())
            .then(data => {
                this.page += 1;
                this.totalHits = data.totalHits;
                return data.hits;
            });
    }
    }





