const searchPhone = () => {
    const searchField = document.getElementById('search-field');
    const error = document.getElementById("error");

    const searchText = searchField.value;
    // console.log(searchText);


    searchField.value = '';


    if (isNaN(searchText)) {
        fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
            .then(response => response.json())
            .then(data => errorHandle(data))
        searchField.value = "";
        error.innerHTML = "";
    }

}

const errorHandle = info => {
    if (info.status == true) {
        fetch(`https://openapi.programming-hero.com/api/phones?search=${info}`)
            .then(response => response.json())
            .then(data => displaySearchResult(info.data))
    }
    else if (info.status == false) {
        error.innerHTML = " no match found with this phone name.";
        SearchResult.innerHTML = "";
    }
}


const displaySearchResult = phones => {
    const phone = phones.slice(0, 20)
    const SearchResult = document.getElementById('search-result');
    phone.forEach(phone => {
        console.log(phone);
        const div = document.createElement('div');
        div.classList.add('col');

        div.innerHTML = `
        <div class="card h-100">
                <img src="${phone.image}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${phone.brand}</h5>
                    <h5>${phone.phone_name}</h5>
                    
                    <p class="card-text"></p>
                    <button onclick="exploreDetails('${phone.slug}')">Details</button>
                </div>
            </div>
        `;
        SearchResult.appendChild(div);
    })
};

const exploreDetails = slug => {
    const url = ` https://openapi.programming-hero.com/api/phone/${slug}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhoneDetail(data.data))

};

const displayPhoneDetail = data => {
    console.log(data);
    const PhoneDetails = document.getElementById('phone-details');
    PhoneDetails.textContent = '';
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
        <div class="card-body">
        <img src="${data.image}" class="card-img-top" alt="...">
          <h5 class="card-title">${data.name}</h5>
          <p class="card-text">ReleaseDate:${data.releaseDate}</p>
          <p class="card-text">Main Features:${data.mainFeatures.chipSet}</p>
          <p class="card-text">Memory:${data.mainFeatures.memory}</p>
          <p class="card-text">DisplaySize:${data.mainFeatures.displaySize}</p>
          <p class="card-text">Sensors:${data.mainFeatures.sensors}</p>
          <p class="card-text">Sensors:${data.mainFeatures.storage}</p>
          <p class="card-text">Sensors:${data.mainFeatures.others}</p>
          <p class="card-text">Sensors:${data.mainFeatures.slug}</p>
         </div>

    `;
    PhoneDetails.appendChild(div);
    console.log(data.name);
};