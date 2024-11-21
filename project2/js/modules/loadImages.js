const getImagesBySearch = async (searchTerm) => {
    const searchURL = `https://api.artic.edu/api/v1/artworks/search?q=${searchTerm}`;

    try {
        // get search by name
        const response = await fetch(searchURL);

        // check if response is not ok
        if (!response.ok) {
            throw new Error(`Could not fetch data, fetch returned with ${response.status}.`);
        }

        const data = await response.json();
        return data;
    }
    catch (error) {
        throw new Error(`An error occurred: ${error}`);
    }
}

export default getImagesBySearch;