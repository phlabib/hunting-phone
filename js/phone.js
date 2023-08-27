const loadPhone = async () =>{
    const res = await fetch ('https://openapi.programming-hero.com/api/phones?search=iphone');
    const data = await res.json();
    const phones = data.data;
    // console.log(phones);
    displayPhones(phones);

}

    const displayPhones = phones =>{
        // console.log(phones);
        // step 1 : get id
        const phoneContainer = document.getElementById('phone-container');

        phones.forEach(phones => {
            console.log(phones);
            // step 2 : creat a div
            const phoneCard = document.createElement('div')
            phoneCard.classList = `card w-96 bg-gray-100 shadow-xl`;
            // step 3 : set innerHTML
            phoneCard.innerHTML = `
            <figure><img src="${phones.image}" /></figure>
            <div class="card-body">
              <h2 class="card-title">${phones.phone_name}</h2>
              <p>If a dog chews shoes whose shoes does he choose?</p>
              <div class="card-actions justify-end">
                <button class="btn btn-primary">Buy Now</button>
              </div>
            </div>
            `;
            // step 4 : appendChild
            phoneContainer.appendChild(phoneCard);

        });
    }
loadPhone();