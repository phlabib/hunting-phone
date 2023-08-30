const loadPhone = async (searchText='13', isShowAll) =>{
    const res = await fetch (`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    // console.log(phones);
    displayPhones(phones, isShowAll);

}

    const displayPhones = (phones, isShowAll) =>{
        // console.log(phones);
        // step 1 : get id
        const phoneContainer = document.getElementById('phone-container');
        // clear phone container cards before adding new cards
        phoneContainer.textContent = '';

// display show all buttons if there are more than 12 phones
    const showAllContainer = document.getElementById('show-all-container')   ;
    if (phones.length > 12 && !isShowAll){
        showAllContainer.classList.remove('hidden');
    }
    else{
        showAllContainer.classList.add('hidden');
    }

    // console.log('is show all', isShowAll);
        // display only first 12 phones if not show all
        if (!isShowAll){
            phones = phones.slice(0,12);
        }

        phones.forEach(phones => {
            // console.log(phones);
            // step 2 : creat a div
            const phoneCard = document.createElement('div')
            phoneCard.classList = `card bg-gray-100 p-4 shadow-xl`;
            
            // step 3 : set innerHTML
            phoneCard.innerHTML = `
            <figure><img src="${phones.image}" /></figure>
            <div class="card-body">
              <h2 class="card-title">${phones.phone_name}</h2>
              <p>$999</p>
              <div class="card-actions justify-center">
                <button onclick ="handleShowDetail('${phones.slug}');
                show_details_modal.showModal()"
                 class="btn btn-primary">Show Details</button>
              </div>
            </div>
            `;
            // step 4 : appendChild
            phoneContainer.appendChild(phoneCard);
        });


    // Hide loading spinner
        toggleLoadingSpinner(false);
    }

        const handleShowDetail = async (id) =>{
            // console.log('click', id);
            // load single phone data
            const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
            const data = await res.json();
            const phones = data.data;
            showPhoneDetails(phones);
        }

        const showPhoneDetails = (phones) => {
            console.log(phones);
            const phoneName = document.getElementById('show-detail-phone-name');
            phoneName.innerText = phones.name;

            const showDetailContainer = document.getElementById('show-detail-container');

            showDetailContainer.innerHTML = `
            <img src="${phones.image}" alt=""/> 
            <p><span>Brand : </span>${phones.brand}</p>
                <p><span>Storage : </span>${phones?.mainFeatures?.storage}</p>
                <p><span>Chipset : </span>${phones?.mainFeatures?.chipSet}</p>
                <p><span>displaySize : </span>${phones?.mainFeatures?.displaySize}</p>
                <p><span>Memory : </span>${phones?.mainFeatures?.memory}</p>
                <p><span>ReleaseDate : </span>${phones?.releaseDate}</p>
                <p><span>GPS : </span>${phones?.others?.GPS || 'No GPS'}</p>

            `
            

            // show the modal
            show_details_modal.showModal();
        }


    // handle search button
    const handleSearch = (isShowAll) =>{
        toggleLoadingSpinner(true);
        const searchField = document.getElementById('search-field');
        const searchText = searchField.value;
        console.log(searchText);
        loadPhone(searchText, isShowAll);
    }



    // loading spinner
    const toggleLoadingSpinner = (isLoading) => {
        const loadingSpinner = document.getElementById('loading-spinner');
        if(isLoading){
            loadingSpinner.classList.remove('hidden')
        }
        else{
            loadingSpinner.classList.add('hidden')
        }
    }

    // hanled show all
    const handleShowAll = () =>{
        handleSearch (true);
    }
loadPhone();