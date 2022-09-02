// Load Category API
const loadNewsCategory = async() => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    try {
        const res = await fetch(url);
        const data = await res.json();
        setCategory(data.data.news_category);
    } catch (error) {
        console.log(error);
    }
}

// Display All Category Dynamically
const setCategory = category => {
    const catDisplay = document.getElementById('cat-display');
    category.forEach(cat => {
        const {category_name, category_id} = cat;
        const li = document.createElement('li');
        li.innerHTML = `
            <a href="#" onclick="loadPostDetails('${category_id}')" class="block py-2 pr-4 pl-3 mb-2 text-white bg-blue-700 rounded md:bg-transparent md:text-black md:p-0 dark:text-white">${category_name}</a>
        `;
        catDisplay.appendChild(li);
    })
}

// Load Category Id
const loadPostDetails = async cat_id => {
    const url = `https://openapi.programming-hero.com/api/news/category/${cat_id}`;
    try {
        const res = await fetch(url);
        const data = await res.json();
        displayPostDetails(data.data);
    } catch (error) {
        console.log(error);
    }
}

// Display Dynamic News by Category Clicked
const displayPostDetails = posts => {
    const newsContainer = document.getElementById('news-container');
    newsContainer.textContent = ``;
    posts.forEach(news => {
        const {thumbnail_url, title, details, author, total_view, rating, _id} = news;
        const {img, name, published_date} = author;
        const {number, badge} = rating;
        const div = document.createElement('div');
        div.innerHTML = `
            <div class="flex flex-col items-center rounded-lg bg-white md:flex-row p-5 mb-5">
                <img class="object-cover w-full h-96 rounded-t-lg md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" src="${thumbnail_url}" alt="">
                <div class="flex-1 flex-col justify-between py-8 md:px-8">
                    <h5 class="mb-3 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">${title ? title : 'Not Found'}</h5>
                    <p class="mb-5 font-normal text-gray-700 dark:text-gray-400">${details.length > 338 ? details.slice(0, 338) + '...' : details}</p>
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 justify-between items-center">
                        <div class="flex flex-wrap items-center space-x-4">
                            <div class="flex-shrink-0">
                                <img class="w-8 h-8 rounded-full" src="${img}" alt="Author Image">
                            </div>
                            <div class="flex-1 min-w-0">
                                <p class="text-sm font-medium text-gray-900">${name ? name : 'Not Found'}</p>
                                <p class="space-x-1 text-sm text-gray-500">${published_date ? published_date : 'Not Found'}</p>
                            </div>
                        </div>
                        <div class="text-center">
                            <div class="flex items-center justify-end md:justify-center">
                                <i class="fa-regular fa-eye"></i>
                                <p class="text-sm font-bold text-gray-600 ml-2">${total_view ? total_view : '0'}</p>
                            </div>
                        </div>
                        <div class="text-center">
                            <div class="flex items-center justify-start md:justify-center">
                                <i class="fa-solid fa-star w-5 h-5 text-yellow-400"></i>
                                <i class="fa-solid fa-star w-5 h-5 text-yellow-400"></i>
                                <i class="fa-solid fa-star w-5 h-5 text-yellow-400"></i>
                                <i class="fa-solid fa-star w-5 h-5 text-yellow-400"></i>
                                <i class="fa-solid fa-star w-5 h-5 text-gray-400"></i>
                            </div>
                        </div>
                        <div class="text-right">
                            <label for="my-modal-3">
                                <i onclick="loadNewsDetails('${_id}')" class="fa-solid fa-arrow-right-long text-blue-600 cursor-pointer"></i>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        `;
        newsContainer.appendChild(div);
    })

}

// Load News Data by News Id
const loadNewsDetails = async mews_id => {
    const url = `https://openapi.programming-hero.com/api/news/${mews_id}`;
    try {
        const res = await fetch(url);
        const data = await res.json();
        displayNewsDetails(data.data[0]);
    } catch (error) {
        console.log(error);
    }
}
// Display Dynamic Modal Details
const displayNewsDetails = news => {
    const {image_url, title, details, author, total_view} = news;
    const {img, name, published_date} = author;
    const modalContainer = document.getElementById('nodal-container');
    modalContainer.textContent = ``;
    modalContainer.innerHTML = `
        <img class="rounded-t-lg" src="${image_url}" alt="">
        <div class="p-5">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">${title}</h5>
            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">${details}</p>
            <div class="grid grid-cols-2 gap-4 justify-between items-center">
            <div class="flex flex-wrap items-center space-x-4">
                <div class="flex-shrink-0">
                    <img class="w-8 h-8 rounded-full" src="${img}" alt="Author Image">
                </div>
                <div class="flex-1 min-w-0">
                    <p class="text-sm font-medium text-gray-900">${name ? name : 'Not Found'}</p>
                    <p class="space-x-1 text-sm text-gray-500">${published_date ? published_date : 'Not Found'}</p>
                </div>
            </div>
            <div class="text-center">
                <div class="flex items-center justify-end md:justify-center">
                    <i class="fa-regular fa-eye"></i>
                    <p class="text-sm font-bold text-gray-600 ml-2">${total_view ? total_view : '0'}</p>
                </div>
            </div>
        </div>
        </div>

    `;
}



loadNewsCategory();