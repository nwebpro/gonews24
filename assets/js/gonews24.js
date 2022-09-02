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

const setCategory = category => {
    console.log(category);
    const catDisplay = document.getElementById('cat-display');
    category.forEach(cat => {
        const {category_name} = cat;
        const li = document.createElement('li');
        li.innerHTML = `
            <a href="#" class="block py-2 pr-4 pl-3 mb-2 text-white bg-blue-700 rounded md:bg-transparent md:text-black md:p-0 dark:text-white">${category_name}</a>
        `;
        catDisplay.appendChild(li);
    })
}









loadNewsCategory();