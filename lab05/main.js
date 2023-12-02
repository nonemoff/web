function createAuthorElement(record) {
    let user = record.user || { 'name': { 'first': '', 'last': '' } };
    let authorElement = document.createElement('div');
    authorElement.classList.add('author-name');
    authorElement.innerHTML = user.name.first + ' ' + user.name.last;
    return authorElement;
}

function createUpvotesElement(record) {
    let upvotesElement = document.createElement('div');
    upvotesElement.classList.add('upvotes');
    upvotesElement.innerHTML = record.upvotes;
    return upvotesElement;
}

function createFooterElement(record) {
    let footerElement = document.createElement('div');
    footerElement.classList.add('item-footer');
    footerElement.append(createAuthorElement(record));
    footerElement.append(createUpvotesElement(record));
    return footerElement;
}

function createContentElement(record) {
    let contentElement = document.createElement('div');
    contentElement.classList.add('item-content');
    contentElement.innerHTML = record.text;
    return contentElement;
}

function createListItemElement(record) {
    let itemElement = document.createElement('div');
    itemElement.classList.add('facts-list-item');
    itemElement.append(createContentElement(record));
    itemElement.append(createFooterElement(record));
    return itemElement;
}

function renderRecords(records) {
    let factsList = document.querySelector('.facts-list');
    factsList.innerHTML = '';
    for (let i = 0; i < records.length; i++) {
        factsList.append(createListItemElement(records[i]));
    }
}

function setPaginationInfo(info) {
    document.querySelector('.total-count').innerHTML = info.total_count;
    let start = info.total_count && (info.current_page - 1) * info.per_page + 1;
    document.querySelector('.current-interval-start').innerHTML = start;
    let end = Math.min(info.total_count, start + info.per_page - 1);
    document.querySelector('.current-interval-end').innerHTML = end;
}

function createPageBtn(page, classes = []) {
    let btn = document.createElement('button');
    classes.push('btn');
    for (cls of classes) {
        btn.classList.add(cls);
    }
    btn.dataset.page = page;
    btn.innerHTML = page;
    return btn;
}

function renderPaginationElement(info) {
    let btn;
    let paginationContainer = document.querySelector('.pagination');
    paginationContainer.innerHTML = '';

    btn = createPageBtn(1, ['first-page-btn']);
    btn.innerHTML = 'Первая страница';
    if (info.current_page == 1) {
        btn.style.visibility = 'hidden';
    }
    paginationContainer.append(btn);

    let buttonsContainer = document.createElement('div');
    buttonsContainer.classList.add('pages-btns');
    paginationContainer.append(buttonsContainer);

    let start = Math.max(info.current_page - 2, 1);
    let end = Math.min(info.current_page + 2, info.total_pages);
    for (let i = start; i <= end; i++) {
        btn = createPageBtn(i, i == info.current_page ? ['active'] : []);
        buttonsContainer.append(btn);
    }

    btn = createPageBtn(info.total_pages, ['last-page-btn']);
    btn.innerHTML = 'Последняя страница';
    if (info.current_page == info.total_pages) {
        btn.style.visibility = 'hidden';
    }
    paginationContainer.append(btn);
}

function downloadData(page = 1) {
    let factsList = document.querySelector('.facts-list');
    let url = new URL(factsList.dataset.url);
    let perPage = document.querySelector('.per-page-btn').value;
    let q = "million";
    url.searchParams.append('page', page);
    url.searchParams.append('per-page', perPage);
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.responseType = 'json';
    xhr.onload = function () {
        renderRecords(this.response.records);
        setPaginationInfo(this.response['_pagination']);
        renderPaginationElement(this.response['_pagination']);
    };
    xhr.send();
}

function perPageBtnHandler(event) {
    downloadData(1);
}

function pageBtnHandler(event) {
    if (event.target.dataset.page) {
        downloadData(event.target.dataset.page);
        window.scrollTo(0, 0);
    }
}

function searchBtnHandler() {
    let searchField = document.querySelector('.search-field');
    let searchQuery = searchField.value.trim();

    if (searchQuery !== '') {
        let factsList = document.querySelector('.facts-list');
        let url = new URL(factsList.dataset.url);
        let perPage = document.querySelector('.per-page-btn').value;
        url.searchParams.append('page', 1);
        url.searchParams.append('per-page', perPage);
        url.searchParams.append('q', searchQuery);
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.responseType = 'json';
        xhr.onload = function () {
            renderRecords(this.response.records);
            setPaginationInfo(this.response['_pagination']);
            renderPaginationElement(this.response['_pagination']);
        };
        xhr.send();
    }
}

function showAutocompleteSuggestions(suggestions) {
    let autocompleteDropdown = document.querySelector('.autocomplete-dropdown');
    // Clear existing suggestions
    autocompleteDropdown.innerHTML = '';

    // Display suggestions in the dropdown
    suggestions.forEach((suggestion) => {
        let suggestionItem = document.createElement('div');
        suggestionItem.classList.add('autocomplete-item');
        suggestionItem.textContent = suggestion;
        suggestionItem.addEventListener('click', () => {
            // Set selected suggestion as the search query
            document.querySelector('.search-field').value = suggestion;
            // Hide the autocomplete dropdown
            autocompleteDropdown.innerHTML = '';
        });
        autocompleteDropdown.appendChild(suggestionItem);
    });

    // Show the autocomplete dropdown
    autocompleteDropdown.style.display = 'block';
}

function autocomplete(query) {
    let acUrl = 'http://cat-facts-api.std-900.ist.mospolytech.ru/autocomplete';
    acUrl += "?q=" + query;
    let xhr = new XMLHttpRequest();
    xhr.open('GET', acUrl);
    xhr.responseType = 'json';
    xhr.onload = function () {
        let suggestions = this.response;
        showAutocompleteSuggestions(suggestions);
    };
    xhr.send();
}

function acHandl() {
    let searchField = document.querySelector('.search-field');
    
    let query = searchField.value.trim();
    if (query !== '') {
        autocomplete(query);
    } else {
        // Hide the autocomplete dropdown if the search field is empty
        document.querySelector('.autocomplete-dropdown').style.display = 'none';
    }
}

window.onload = function () {
    downloadData();
    document.querySelector('.pagination').onclick = pageBtnHandler;
    document.querySelector('.per-page-btn').onchange = perPageBtnHandler;
    document.querySelector('.search-btn').onclick = searchBtnHandler;
    
    document.querySelector('.search-field').addEventListener('input', acHandl);
};
