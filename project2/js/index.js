import getImagesBySearch from "./modules/loadImages.js";
import Relevance from "./modules/loadImages.js";

window.onload = (e) => {
    loadContents();
}

const loadContents = () => {
    // get dropdown button
    const dropdown = document.querySelector(".dropbtn");

    // get search button
    const search = document.querySelector("#searchbar button");

    // load relevance filter
    const relevanceFilter = document.querySelector('select[name="relevance"]');
    // load max # results
    const resultCountFilter = document.querySelector('select[name="result-count"]');
    // load sort and ascending
    const sortFilter = document.querySelector('select[name="sort"]');
    const ascendingCheckbox = document.querySelector('input[type="checkbox"]');

    // get values from localstorage
    const relevanceValue = localStorage.getItem('relevanceFilter');
    const resultCountValue = localStorage.getItem('resultCountFilter');
    const sortValue = localStorage.getItem('sortFilter');
    const ascendingValue = localStorage.getItem('ascendingFilter');

    // set values, if they already exist/have been set
    if (relevanceValue) relevanceFilter.value = relevanceValue;
    if (resultCountValue) resultCountFilter.value = resultCountValue;
    if (sortValue) sortFilter.value = sortValue;
    if (ascendingValue) ascendingCheckbox.checked = ascendingValue === 'true';

    // add event listeners
    dropdown.addEventListener("click", dropdownShow);
    search.addEventListener("click", getSearch);
    relevanceFilter.addEventListener("change", updateRelevanceFilter);
    resultCountFilter.addEventListener("change", updateResCountFilter);
    sortFilter.addEventListener("change", updateSort);
    ascendingCheckbox.addEventListener("change", updateAscendingFilter);
};

const dropdownShow = (e) => {
    const dropdown = document.querySelector(".dropbtn");
    const dropdownPanel = document.querySelector(".dropdown-content");

    if (dropdownPanel.style.height === "0px" || !dropdownPanel.style.height) {
        // change dropdown panel height and opacity
        dropdownPanel.style.height = "180px";
        dropdownPanel.style.opacity = 1;
        dropdownPanel.style.marginBottom = "0px";

        // set dropdown arrow state
        dropdown.classList.add("fa-caret-up");
        dropdown.classList.remove("fa-caret-down");
        dropdown.style.bottom = "15px";
    } else {
        // change dropdown panel height and opacity
        dropdownPanel.style.height = "0px";
        dropdownPanel.style.opacity = 0;
        dropdownPanel.style.marginBottom = "-60px";
        
        // set dropdown arrow state
        dropdown.classList.add("fa-caret-down");
        dropdown.classList.remove("fa-caret-up");
        dropdown.style.bottom = "25px";
    }
};

const getSearch = async (e) => {
    // get searchbar term
    const searchBar = document.querySelector("#searchbar input");
    const searchTerm = searchBar.value;

    // get data
    const data = await getImagesBySearch(searchTerm);

    // store in localstorage
    localStorage.setItem('curSearch', JSON.stringify(data));

    // update divs
    updateResultDivs(data);
}

const updateResultDivs = (dataArr) => {
    // get results
    const results = document.querySelector("#results");

    // clear content
    results.innerHTML = ""

    dataArr.forEach(data => {
        // create container div
        const resultDiv = document.createElement('div');
        resultDiv.classList.add('result');
        // set "alt" text for background
        resultDiv.title = data.alt_text;

        // add result div data tags
        resultDiv.setAttribute('data-year', data.date_end);
        resultDiv.setAttribute('data-title', data.title);
        
        // set background image
        resultDiv.style.setProperty('--result-bg-img', `url('${data.image_URL}')`);
        
        // create star icon
        const starIcon = document.createElement('i');
        starIcon.classList.add('fa-regular', 'fa-star');
        
        // create result wrapper (contains a element)
        const resultWrapperDiv = document.createElement('div');
        resultWrapperDiv.classList.add('result-wrapper');
        
        // create link element with title
        const link = document.createElement('a');
        link.href = data.image_URL;
        // format year with bc/ad
        const yearString = Number(data.date_end) < 0 ? `${Number(Math.abs(data.date_end))} B.C.` : `${data.date_end} A.D.`;
        link.innerHTML = `${data.title} - ${yearString}`;
    
        // append to container
        resultDiv.appendChild(starIcon);
        resultWrapperDiv.appendChild(link);
        resultDiv.appendChild(resultWrapperDiv);

        // append to container
        const container = document.querySelectorAll('.result-block');
        const lastContainer = container[container.length - 1];

        // if the container is full, create a new result block
        if (!lastContainer || lastContainer.childElementCount >= 3) {
            // create new result block
            const resultBlockDiv = document.createElement('div');
            resultBlockDiv.classList.add('result-block');

            // add result block
            results.appendChild(resultBlockDiv);

            // append first result div
            resultBlockDiv.appendChild(resultDiv);
        }
        else {
            // otherwise, just append
            lastContainer.appendChild(resultDiv);
        }
    });
}

const updateRelevanceFilter = (e) => {
    const relevanceValue = e.target.value;
    localStorage.setItem('relevanceFilter', relevanceValue);
};

const updateResCountFilter = (e) => {
    const resultCount = e.target.value;
    localStorage.setItem('resultCountFilter', resultCount);
};

const updateSort = (e) => {
    const sortValue = e.target.value;
    localStorage.setItem('sortFilter', sortValue);
};

const updateAscendingFilter = (e) => {
    const ascendingValue = e.target.checked;
    localStorage.setItem('ascendingFilter', ascendingValue);
};