import getImagesBySearch from "./modules/loadImages.js";

window.onload = (e) => {
    loadContents();
}

const loadContents = () => {
    // get dropdown button
    const dropdown = document.querySelector(".dropbtn");

    // get search button
    const search = document.querySelector("#searchbar button");

    // add event listeners
    dropdown.addEventListener("click", dropdownShow);
    search.addEventListener("click", getSearch);
};

const dropdownShow = (e) => {
    const dropdown = document.querySelector(".dropbtn");
    const dropdownPanel = document.querySelector(".dropdown-content");

    const isShown = dropdownPanel.classList.toggle("show");

    if (isShown) {
        dropdown.classList.add("fa-caret-up");
        dropdown.classList.remove("fa-caret-down");
        dropdown.style.bottom = "15px";
    }
    else {
        dropdown.classList.add("fa-caret-down");
        dropdown.classList.remove("fa-caret-up");
        dropdown.style.bottom = "25px";
    }
};

const getSearch = async (e) => {
    const searchBar = document.querySelector("#searchbar input");
    const resultPanel = document.querySelector("#results");

    const searchTerm = searchBar.value;

    const data = await getImagesBySearch(searchTerm);

    const element = document.createElement("p");
    element.innerHTML = data;

    resultPanel.appendChild(element);
}