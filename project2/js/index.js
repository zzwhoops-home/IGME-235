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
    createResultDiv(data);

    resultPanel.appendChild(element);
}

const createResultDiv = (dataArr) => {
    dataArr.array.forEach(data => {
        
    });
    let data = dataArr[0];

    // create container div
    const resultDiv = document.createElement('div');
    resultDiv.classList.add('result');
    // set "alt" text for background
    resultDiv.title = data.alt_text;

    // set background image
    resultDiv.style.setProperty('--result-bg-img', `url('${data.image_URL}')`);

    // create star icon
    const starIcon = document.createElement('i');
    starIcon.classList.add('fa-regular', 'fa-star');

    // create link element with title
    const link = document.createElement('a');
    link.href = data.image_URL;
    link.innerHTML = data.title;

    // append to container
    resultDiv.appendChild(starIcon);
    resultDiv.appendChild(link);

    // append to container
    const container = document.querySelector('.result-block');
    container.appendChild(resultDiv);
}