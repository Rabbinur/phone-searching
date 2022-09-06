const loadPhones = async (search, dataLimit) => {
  const url = `https://openapi.programming-hero.com/api/phones?search=${search}`;
  const res = await fetch(url);
  const data = await res.json();
  displayPhone(data.data, dataLimit);
};
const displayPhone = (phones, dataLimit) => {
  console.log(phones);
  //get container
  const phonesContainer = document.getElementById("phone-container");
  phonesContainer.innerText = "";
  //   display 10phone
  const showAll = document.getElementById("show-all");
  if (dataLimit && phones.length > 10) {
    phones = phones.slice(0, 10);

    showAll.classList.remove("d-none");
  } else {
    showAll.classList.add("d-none");
  }
  // phones = phones.slice(0, 10);

  //display message no phone found
  const noPhone = document.getElementById("no-found-message");
  if (phones.length === 0) {
    noPhone.classList.remove("d-none");
  } else {
    noPhone.classList.add("d-none");
  }
  //display all phones
  phones.forEach((phone) => {
    console.log(phone);
    const phoneDiv = document.createElement("div");

    phoneDiv.classList.add("col");
    phoneDiv.innerHTML = `
   
         <div class="card p-4">
            <img src="${phone.image}" class="card-img-top" alt="..." />
                    <div class="card-body">
                        <h5 class="card-title">${phone.phone_name}</h5>
                        <p class="card-text">
                        This is a longer card with supporting text below as a natural
                        lead-in to additional content. This content is a little bit
                        longer.
                        </p>
                        <button onclick="loadPhoneDetails('${phone.slug}')" href="#" class="btn btn-primary" data-bs-toggle="modal"
                        data-bs-target="#phoneDetailModal">Show Details</button>
                        
                    
                        </div>
        </div>
  
    
    
    `;
    //appendChild
    phonesContainer.appendChild(phoneDiv);
  });
  //stop loader /spinner
  toogleSpinner(false);
};

const processSearch = (dataLimit) => {
  toogleSpinner(true); //spinner on

  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;

  loadPhones(searchText, dataLimit);
};

//handle search button
document.getElementById("btn-search").addEventListener("click", function () {
  //start loader /spinner
  // toogleSpinner(true); //spinner on

  // const searchField = document.getElementById("search-field");
  // const searchText = searchField.value;
  // searchField.searchText = "";
  // loadPhones(searchText);

  //caling function
  processSearch(10);
});
//search input field enter key handler
document
  .getElementById("search-field")
  .addEventListener("keypress", function (e) {
    console.log(e.key);

    if (e.key === "Enter") {
      processSearch(10);
    }
  });

//spinner
const toogleSpinner = (isLoading) => {
  //get element
  const loaderSection = document.getElementById("loader");
  //condtion
  if (isLoading) {
    loaderSection.classList.remove("d-none");
  } else {
    loaderSection.classList.add("d-none");
  }
};

// not the best solution to looad show all
document.getElementById("btn-show-all").addEventListener("click", function () {
  processSearch();
});

const loadPhoneDetails = async (id) => {
  const url = ` https://openapi.programming-hero.com/api/phone/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  displayPhoneDetails(data.data);
};
const displayPhoneDetails = (phone) => {
  console.log(phone);
  const modalTitle = document.getElementById("phoneDetailModalLabel");
  modalTitle.innerText = phone.name; //set name ass a title in modal
  const phoneDetails = document.getElementById("phone-details");
  phoneDetails.innerHTML = `
  <p>Release Date: ${
    phone.releaseDate ? phone.releaseDate : " No Release Date Found"
  }</p>
  <p> Brand: ${phone.brand ? phone.brand : " No Brand Information Found"}
  <p> Chipset: ${
    phone.mainFeatures
      ? phone.mainFeatures.chipSet
      : " No Chipset information Found"
  }</p>
  <p> Storage: ${
    phone.mainFeatures
      ? phone.mainFeatures.storage
      : " No Storage information Found"
  }</p>
  <p>Others:${
    phone.others ? phone.others.Bluetooth : " No Bluetooth Informataion "
  } </p>
  
  `;
};
loadPhones("a");
