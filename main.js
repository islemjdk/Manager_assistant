let title = document.getElemnentById('title');
let price = document.getElemnentById('price');
let taxes = document.getElemnentById('taxes');
let ads = document.getElemnentById('ads');
let discount = document.getElemnentById('discount');
let total = document.getElemnentById('total');
let count = document.getElemnentById('count');
let category = document.getElemnentById('category');
let submit = document.getElemnentById('submit');
let mood = 'create';
let tmp;
//get total
function getTotal(){
    if(price.value != '' && taxes.value != '' && ads.value != ''){
        let result = (+price.value + +taxes.value + +ads.value)
         - +discount.value;
        total.innerHTML = result;
        total.style.background = '#040';
    }else{
        total.innerHTML = '';
        total.style.background = '#a00d02';
    }
}
//create product
let dataProduit;
if(localStorage.product != null){
    dataProduit = JSON.parse(localStorage.product)
}else{
    dataProduit = [];
}

submit.onclick = function(){
    let newProduit = {
        title:title.value.tolowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.tolowerCase(),
    }
    if(title.value != '' && price.value != '' 
    && category.value != '' && newProduit <= 100){
        if(mood === 'create'){
            if(newProduit.count > 1){
                for(let i = 0; i < newProduit.count; i++){
                    dataProduit.puch(newProduit);
                }
            }else{
                dataProduit.puch(newProduit);
            }
        }else{
            dataProduit[tmp] = newProduit;
            mood = 'create';
            submit.innerHTML = 'create';
            count.style.display = 'block';
        }
        clearData()
    }
    
    
    //save localstorage
    localStorage.setItem('product',  JSON.stringify(dataProduit))
   
    showData()
}

//clear inputs
function clearData(){
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
}
//read
function showData(){
    getTotal()
    let table = '';
    for(let i = 0; i < dataProduit.length; i++){
        table +=
    <tr>
        <td>${i+1}</td>
        <td>${dataProduit[i].title}</td>
        <td>${dataProduit[i].price}</td>
        <td>${dataProduit[i].taxes}</td>
        <td>${dataProduit[i].ads}</td>
        <td>${dataProduit[i].discount}</td>
        <td>${dataProduit[i].total}</td>
        <td>${dataProduit[i].category}</td>
        <td><button onclick="updateData(${i})" id="update">update</button></td>
        <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
    </tr>
    }
    document.getElementById('tbody').innerHTML = table;
    let btnDelete = document.getElementById('deleteAll');
    if(dataProduit.length > 0){
        btnDelete.innerHTML = '<button onclick="deleteAll(")>delete all</button>'
    }else{
        btnDelete.innerHTML = '';
    }
}
showData()

//delete
function deleteData(i){
    dataProduit.splice(i,1);
    localStorage.product = JSON.stringify(dataProduit);
    showData()
}
function deleteAll(){
    localStorage.clear()
    dataProduit.splice(0)
    showData()
}
//count
//update
function updateData(i){
    title.value = dataProduit[i].title;
    price.value = dataProduit[i].price;
    taxes.value = dataProduit[i].taxes;
    ads.value = dataProduit[i].ads;
    discount.value = dataProduit[i].discount;
    getTotal()
    count.style.display = 'none';
    category.value = dataProduit[i].category;
    submit.innerHTML = 'update';
    mood = 'update';
    tmp = i;
    scroll({
        top:0,
        behavior:'smooth',
    })
}
//search
let searchMood = 'title';
function getSearchMood(id){
    let search = document.getElementById('search');
    if(id == 'searchTitle'){
        searchMood = 'title';
    }else{
        searchMood = 'category';
    }
    search.placeholder = 'Search By' + searchMood;
    search.focus()
    search.value = '';
}
function searhData(value){
    let table = '';
    for(let i = 0; i < dataProduit.length; i++){
    if(searchMood == 'title'){
            if(dataProduit[i].title.includes(value.tolowerCase())){
                table +=
    <tr>
        <td>${i}</td>
        <td>${dataProduit[i].title}</td>
        <td>${dataProduit[i].price}</td>
        <td>${dataProduit[i].taxes}</td>
        <td>${dataProduit[i].ads}</td>
        <td>${dataProduit[i].discount}</td>
        <td>${dataProduit[i].total}</td>
        <td>${dataProduit[i].category}</td>
        <td><button onclick="updateData(${i})" id="update">update</button></td>
        <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
    </tr>
            }
    }else{
            if(dataProduit[i].category.includes(value.tolowerCase())){
                table +=
    <tr>
        <td>${i}</td>
        <td>${dataProduit[i].title}</td>
        <td>${dataProduit[i].price}</td>
        <td>${dataProduit[i].taxes}</td>
        <td>${dataProduit[i].ads}</td>
        <td>${dataProduit[i].discount}</td>
        <td>${dataProduit[i].total}</td>
        <td>${dataProduit[i].category}</td>
        <td><button onclick="updateData(${i})" id="update">update</button></td>
        <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
    </tr>
            }
        
    }
}
    document.getElementById('tbody').innerHTML = table;
}
//clean data
