export const getImagesBySearch = async (searchTerm) => {
    const searchURL = `https://api.artic.edu/api/v1/artworks/search?q=${searchTerm}`;

    const promise = await fetch(searchURL);
    const data = await promise.json();
}
