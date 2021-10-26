import fetchApi from "../fetchApi";

describe('testing API', () => {
    it('testing API without seach term', async () => {
        const movies = await fetchApi();
        expect(movies.results[0].id).toBeDefined();
    });

    it('testing API with searh term', async () => {
        const movies = await fetchApi('star wars');
        expect(movies.results[0].title).toContain('Star Wars');
    });
} )

