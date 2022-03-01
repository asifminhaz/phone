const searchPhone = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // console.log(searchText);

    searchField.value = '';

    const url = ` https://openapi.programming-hero.com/api/phones?search=${searchText}`
    fetch(url)
        .then(res => res.json())
        .then(data => displaySearchResult(data));
}

const displaySearchResult = phones => {
    const SearchResult = document.getElementById('search-result');
    phones.data.forEach(phone => {
        console.log(phones.data);
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card h-100">
                <img  src="${phone.image}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${phone.brand}</h5>
                    <h5>${phone.phone_name}</h5>
                    <h5>${phone.slug}</h5>
                    <p class="card-text"></p>
                    <button onclick="exploreDetails()">Details</button>
                </div>
            </div>
        `;
        SearchResult.appendChild(div);
    })
};

const exploreDetails = () => {
}

const loadPhoneDetails = (phoneId) => {
    const url = ` https://openapi.programming-hero.com/api/phone/$'{phoneId}'`
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhoneDetail(data))

}

const displayPhoneDetail = data => {
    console.log(data);
    const PhoneDetails = document.getElementById('phone-details');
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
        <div class="card-body">
          <h5 class="card-title">${data.name}</h5>
          <h5>${data.releaseDate}</h5>
          <h5>${data.mainFeatures.chipSet}</h5>
          <h5>${data.mainFeatures.memory}</h5>
          <h5>${data.mainFeatures.displaySize}</h5>
          <p class="card-text">${data.slug}</p>
         
         </div>

    `;
    PhoneDetails.appendChild(div);
}