const getImagesBySearch = async (searchTerm, minScore = 75, page = 1, results = 10) => {
    const searchURL = `https://api.artic.edu/api/v1/artworks/search?q=${searchTerm}&page=${page}&limit=${results}`;

    // use data helper function
    const data = await getData(searchURL);

    // get data element, which is an object, get api_links
    const arr = data.data.filter(item => Number(item._score) > minScore).map(item => item.api_link);

    // return data
    const formattedData = await getRawImages(arr);
    return formattedData;
}

const getRawImages = async (apiURLS) => {
    // get image data for all links
    const formattedData = await Promise.all(
        apiURLS.map(async (url) => {
            // get data of image
            const data = await getData(url);

            // image is under data.data object
            const item = data.data;

            // return the result with formatted image URL
            const imageURL = `https://www.artic.edu/iiif/2/${item.image_id}/full/843,/0/default.jpg`;

            return {
                "title": item.title,
                "artist_titles": item.artist_titles,
                "alt_text": item.thumbnail.alt_text,
                "description": item.description,
                "dimensions": item.dimensions,
                "date_display": item.date_display,
                "image_URL": imageURL
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