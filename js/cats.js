const apiBase = 'https://api.unsplash.com/'
const apiKey = 'vB8oioHwst7vuUvD51ogRL4Y35uMByysMzP0P8Fulx4'
const imgField = document.querySelector('.cat-field');
const refresh = document.querySelector('.refresh');
let page = getRandomInt(1, 50);
let currIndex = 0;
let catArray = [];
let catId = [];

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


const getData = async (url) => {
    const res = await fetch(url);

    if(!res.ok) {
        throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }
    return await res.json();
}

const getCatArray = () => {
    console.log('get');
    getData(`${apiBase}search/photos?page=${page++}&query=cat&client_id=${apiKey}`)
    .then((data) => {
        let newArr = [];
        console.log(data);
        data.results.forEach((item) => {
            newArr.push(item.urls.small);
        });
       catArray = newArr;
       setImage(currIndex++);
    });
}

const setImage = (index) => {
    console.log(index);
    imgField.innerHTML = '';
    imgField.innerHTML = `<img class="cat-img" src=${catArray[index]} alt="cat">`;
}


getCatArray();

refresh.addEventListener('click', () =>{
    if(currIndex < catArray.length) {
        setImage(currIndex++);
    }
    else {
        currIndex = 0;
        getCatArray();
    }
});