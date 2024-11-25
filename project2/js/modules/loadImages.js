export const Relevance = {
    NONE: 0,
    LENIENT: 25,
    NORMAL: 50,
    STRICT: 75
}

const getImagesBySearch = async (searchTerm, minScore = 50, page = 1, results = 12) => {
    const searchURL = `https://api.artic.edu/api/v1/artworks/search?q=${searchTerm}&page=${page}&limit=${results}&fields=title,thumbnail,artist_titles,description,dimensions,date_display,api_link`;

    // use data helper function
    const data = await getData(searchURL);

    // get data element, which is an object, get api_links
    const arr = data.data.filter(item => Number(item._score) > minScore).map(item => item.api_link);

    // return data
    const formattedData = await getRawImages(arr);
    return formattedData;
}

const testImageURL = async (imageId) => {
    const baseURL = "https://www.artic.edu/iiif/2/";

    // array of sizes
    const sizes = [843, 400, 200];

    // test each image size
    for (let size of sizes) {
        // format url
        const url = `${baseURL}${imageId}/full/${size},/0/default.jpg`;

        // test URL
        try {
            const response = await fetch(url, { method: "HEAD" });
            if (response.ok) {
                return url; // Return the first valid URL
            }
        } catch (error) {
            console.log("oops");
            console.error(`Failed to fetch: ${url}`, error);
        }
    }
    return null; // No valid URL found
};

const getRawImages = async (apiURLS) => {
    // get image data for all links
    const formattedData = await Promise.all(
        apiURLS.map(async (url) => {
            // get data of image
            const data = await getData(url);

            // image is under data.data object
            const item = data.data;

            // return the result with formatted image URL
            const validURL = await testImageURL(item.image_id);

            return {
                "title": item.title,
                "artist_titles": item.artist_titles,
                "alt_text": item.thumbnail.alt_text,
                "description": item.description,
                "dimensions": item.dimensions,
                "date_start": item.date_start,
                "date_end": item.date_end,
                "date_display": item.date_display,
                "image_URL": validURL
            };
        })
    );

    return formattedData;
}

const getData = async (url) => {
    try {
        // get search by name
        const response = await fetch(url);

        // check if response is not ok
        if (!response.ok) {
            throw new Error(`Could not fetch data, fetch returned with ${response.status}.`);
        }

        // await data json
        const data = await response.json();

        return data;
    }
    catch (error) {
        throw new Error(`An error occurred: ${error}`);
    }
}

export default getImagesBySearch;