/**
 * Fetch movies
 * If searchStr empty - fetch popular movies
 * 
 * @param {String} searchStr 
 * @returns {Object}
 */
const fetchApi = async (searchStr) => {
    /* This app should use API proxy instead */
    try {
        const apiRequest = searchStr === '' ? '/movie/popular?api_key=' : `/search/movie?query=${searchStr}&api_key=`;
        const url = `${process.env.REACT_APP_API_BASE_URL}${apiRequest}${process.env.REACT_APP_API_KEY}&language=${process.env.REACT_APP_API_LOCALE}`;

        const res = await fetch(url);
        const data = await res.json();

        return data;
    } catch (e) {
        return null;
    }
}

export default fetchApi