var obj = new XMLHttpRequest();
obj.open('GET', './json/new.json');
obj.onload = function () {
    const globalData = JSON.parse(obj.responseText);
    const head = document.getElementById("dicreptions");
    head.innerHTML = `<h3>${globalData.description}</h3>`;
    const orginaldate = new Date(globalData.metadata.creationDate);
    const options = { month: 'short', day: 'numeric', year: 'numeric', weekday: 'short', };
    const formatedate = orginaldate.toLocaleDateString('en-US', options);

    // cards
    const cards = document.getElementById("cards");
    const k = globalData.items;
    k.forEach((element) => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `<h2> ${element.name}</h2>
            <p>Price : ${element.price}</p>
            <p>${element.description}</p>
            <p>${globalData.metadata.author}</p>
            <p>${formatedate}</p>`;
        cards.appendChild(card);
    });

    // 1)Write a JavaScript function to filter items in the array based on price (e.g., show only items over $500).
    // Filter button
    const filt = document.createElement('button');
    const input = document.createElement('input');
    filt.id = "filter";
    input.id = "inputvalue"
    filt.textContent = "filter"
    head.appendChild(filt);
    head.appendChild(input);
    const filterbutton = document.getElementById('filter');
    filterbutton.addEventListener('click', filterfun);
    function filterfun() {
        const inputvalue = document.getElementById('inputvalue').value;
        const fill = document.getElementById('filtediteams');
        fill.innerHTML = "";
        k.forEach(element => {
            if (Number(inputvalue) >= element.price) {
                const card = document.createElement("div");
                card.className = "card";
                card.innerHTML = `<h2> ${element.name}</h2>
                    <p>Price : ${element.price}</p>
                    <p>${element.description}</p>`;
                fill.appendChild(card);
            }
        });
    }

    // 2)Create a function to sort the array of items by name or price in ascending or descending order.
    // Sorting Acending order
    const sort = document.getElementById("sorting");
    const sortbtn = document.createElement('button');
    sortbtn.textContent = "Acending order";
    sort.appendChild(sortbtn);

    function sortedbyname(iteam) {
        return iteam.sort((a, b) => a.name.localeCompare(b.name));
    }

    sortbtn.addEventListener('click', function () {
        const sortediteam = sortedbyname(k);
        sortedcard(sortediteam);
    });

    function sortedcard(y) {
        const sorted = document.getElementById('cards');
        cards.innerHTML = "";
        y.forEach(item => {
            const card = document.createElement("div");
            card.className = "card";
            card.innerHTML = `<h2> ${item.name}</h2>
                <p>Price : ${item.price}</p>
                <p>${item.description}</p>`;
            sorted.appendChild(card);
        });
    }

    // Sorting in decending
    const dec = document.getElementById("sorting");
    const sortbtn2 = document.createElement('button');
    sortbtn2.textContent = "Decensing order";
    dec.appendChild(sortbtn2);

    function sortedbynamedec(iteam) {
        return iteam.sort((a, b) => b.name.localeCompare(a.name));
    }

    sortbtn2.addEventListener('click', function () {
        const sortediteamdec = sortedbynamedec(k);
        sortedcardec(sortediteamdec);
    });

    function sortedcardec(y) {
        const sorteding = document.getElementById('cards');
        cards.innerHTML = "";
        y.forEach(item => {
            const card = document.createElement("div");
            card.className = "card";
            card.innerHTML = `<h2> ${item.name}</h2>
                <p>Price : ${item.price}</p>
                <p>${item.description}</p>`;
            sorteding.appendChild(card);
        });
    }

    // 3)Create a simple form (also add validation) to add a new items to the items array and display it immediately in the card section.
    // Form validation
    const form = document.getElementById("form");
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        const formname = document.getElementById('name').value;
        const formprice = Number(document.getElementById('price').value);
        const newitem = {
            name: formname,
            price: formprice,
            description: ''
        };
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = ` <h2>${newitem.name}</h2> 
            <p>Price: ${newitem.price}</p> 
            <p>${newitem.description}</p>`;
        cards.appendChild(card);
        form.reset();
    })

    // 4)Write a function to retrieve and display the author and creation date from the nested metadata object in the JSON file.
    // Date seting 
    const auth = document.getElementById("author");
    const date = new Date();
    const dates = date.toLocaleTimeString('en-US', options);
    auth.innerHTML = `<h2>Author : ${globalData.metadata.author}</h2><br><h2>${dates}</h2>`;
}
obj.send();


