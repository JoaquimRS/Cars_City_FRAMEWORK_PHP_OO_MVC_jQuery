function loadSearchBrands() {    
    while (document.getElementById("brands").firstChild) {
        document.getElementById("brands").removeChild(document.getElementById("brands").lastChild)
    }
    ajaxPromise('GET','JSON',friendlyURL("?module=search&op=brands"))
    .then(function(jsonBrands){
        var selectBrand = document.createElement('select')
        var blank = document.createElement('option')

        selectBrand.className = "brand"
        selectBrand.setAttribute("placeholder", "Seleccionar Marca")
        blank.value=""
        blank.appendChild(document.createTextNode("Todas las marcas"))
        
        document.getElementById("brands").appendChild(selectBrand)
        selectBrand.appendChild(blank)
        $.each(jsonBrands, function(index, Brand) {
            var brand = document.createElement('option')
            
            if (JSON.parse(localStorage.getItem('filters')).brand==Brand.nombre_marca){
                brand.selected = true
            }

            brand.value=Brand.nombre_marca
            brand.appendChild(document.createTextNode(Brand.nombre_marca))

            selectBrand.appendChild(brand)


        })

        
        $(selectBrand).on("change", ()=>{
            var lsfilters = JSON.parse(localStorage.getItem('filters'))
            var defaultFilters = {
                brand: lsfilters.brand,
                model: "",
                price: "",
                fuel: "",
                category: lsfilters.category,
                city: lsfilters.city,
                order: lsfilters.order,
                page: "1"

            };
            defaultFilters.brand=selectBrand.value
            localStorage.setItem('filters', JSON.stringify(defaultFilters))
            
            loadCities();
        })
        
        
    }).catch(function(){
        console.log("Error brands search")
    });
};

function loadSearchCategories() {
    while (document.getElementById("categories").firstChild) {
        document.getElementById("categories").removeChild(document.getElementById("categories").lastChild)
    }
    ajaxPromise('GET','JSON',friendlyURL("?module=search&op=categories"))
    .then(function(jsonCategories){
        
        var selectCategories = document.createElement('select')
        var blank = document.createElement('option')

        selectCategories.className = "category"
        selectCategories.setAttribute("placeholder", "Seleccionar Categoria")
        blank.value=""
        blank.appendChild(document.createTextNode("Todas las categorias"))
        
        document.getElementById("categories").appendChild(selectCategories)
        selectCategories.appendChild(blank)

        $.each(jsonCategories, function(index, Category) {
            var category = document.createElement('option')
            if (JSON.parse(localStorage.getItem('filters')).category==Category.nombre_categoria){
                category.selected = true
            }
            category.value=Category.nombre_categoria
            category.appendChild(document.createTextNode(Category.nombre_categoria))

            selectCategories.appendChild(category)


        })
        $(selectCategories).on("change", ()=>{
            var lsfilters = JSON.parse(localStorage.getItem('filters'))
            var defaultFilters = {
                brand: lsfilters.brand,
                model: "",
                price: "",
                fuel: "",
                category: lsfilters.category,
                city: lsfilters.city,
                order: lsfilters.order,
                page: "1"

            };
            defaultFilters.category=selectCategories.value
            
            localStorage.setItem('filters', JSON.stringify(defaultFilters))
            loadCities();
        })
       
    }).catch(function(){
        console.log("Error categories search")
    })
};

function loadOrder(){
    while (document.getElementById("order").firstChild) {
        document.getElementById("order").removeChild(document.getElementById("order").lastChild)
    }
        var selectOrder = document.createElement('select')
        var blank = document.createElement('option')
        var price = document.createElement('option')
        var km = document.createElement('option')

        selectOrder.className = "order"
        selectOrder.setAttribute("placeholder", "Ordenar por")
        blank.value=""
        blank.appendChild(document.createTextNode("Sin Orden"))
        price.value="precio"
        price.appendChild(document.createTextNode("Precio"))
        km.value="kms"
        km.appendChild(document.createTextNode("Kilometros"))
        
        switch (JSON.parse(localStorage.getItem('filters')).order) {
            case "precio":
                price.selected = true;
                break;
        
            case "kms":
                km.selected = true;
                break;
            default:
                break;
        }

        document.getElementById("order").appendChild(selectOrder)
        selectOrder.appendChild(blank)
        selectOrder.appendChild(price)
        selectOrder.appendChild(km)

        $(selectOrder).on("change", ()=>{
            var lsfilters = JSON.parse(localStorage.getItem('filters'))
            var defaultFilters = {
                brand: lsfilters.brand,
                model: "",
                price: "",
                fuel: "",
                category: lsfilters.category,
                city: lsfilters.city,
                order: lsfilters.order,
                page: "1"

            };
            defaultFilters.order=selectOrder.value
            
            localStorage.setItem('filters', JSON.stringify(defaultFilters))
            loadCities();
        })
   
};

function loadCityOptions(Cities) {
    while (document.getElementById("cities").firstChild) {
        document.getElementById("cities").removeChild(document.getElementById("cities").lastChild)
    }
    var input = document.createElement('input')
    var selectCities = document.createElement('datalist')
    var blank = document.createElement('option')
    
    input.type="text"
    input.setAttribute("list","list-cities")
    input.className = "city"
    input.setAttribute("placeholder", "Seleccionar Ciudad")
    selectCities.id = "list-cities"
    blank.value=""
    blank.appendChild(document.createTextNode("Todas las ciudades"))
    
    document.getElementById("cities").appendChild(input)
    document.getElementById("cities").appendChild(selectCities)
    selectCities.appendChild(blank)
    
    $.each(Cities, function(index, City) {
        var city = document.createElement('option')
        
        city.value=City.ciudad
        if (JSON.parse(localStorage.getItem('filters')).city==City.ciudad){
            input.value = City.ciudad
        }
        city.appendChild(document.createTextNode(City.ciudad))
        
        selectCities.appendChild(city)
        
        
    })
    $(input).on("change", ()=>{
        var lsfilters = JSON.parse(localStorage.getItem('filters'))
        var defaultFilters = {
            brand: lsfilters.brand,
            model: "",
            price: "",
            fuel: "",
            category: lsfilters.category,
            city: lsfilters.city,
            order: lsfilters.order,
            page: "1"

        };
        defaultFilters.city=input.value
        
        localStorage.setItem('filters', JSON.stringify(defaultFilters))
    })
    
    
    
};

function loadSearchCities(jsonFilteredCities) {
    var notfilters = true;
    filters = JSON.parse(localStorage.getItem('filters'))
    for (let key of Object.keys(filters)) {
        let value = filters[key]
        if(value){
            notfilters=false
            //Existen filtros
        }        
    }
    
    if (jsonFilteredCities) {
        loadCityOptions(jsonFilteredCities);
    } else {
        if (notfilters==false){
            loadCityOptions([{"ciudad": "No existe ninguna ciudad"}]);
        } else {
            ajaxPromise('GET','JSON',friendlyURL("?module=search&op=cities"))
            .then(function(jsonCities){
                loadCityOptions(jsonCities);
                
                
            }).catch(function(){
                console.log("Error cities search")
            }) 
            }
        
    }
    
    
};

function loadCities() {
    filters = JSON.parse(localStorage.getItem('filters'))
    ajaxPromise("POST","JSON",friendlyURL("?module=search&op=filter_cities"), filters)
    .then((jsonFilteredCars) => {
        loadSearchCities(jsonFilteredCars);
    }).catch(() => {
        console.log("Error Cities Filters");
    })
};


function loadSearch() {  
    while (document.getElementById("Search").firstChild) {
        document.getElementById("Search").removeChild(document.getElementById("Search").lastChild)
    }
    var brands = document.createElement('div')
    var categories = document.createElement('div')
    var cities = document.createElement('div')
    var order = document.createElement('div')
    var submit = document.createElement('div')
    var img = document.createElement('img')

    brands.id="brands"
    categories.id="categories"
    cities.id="cities"
    submit.className="submit-img"
    order.id="order"
    img.src=friendlyURLImages("view/img/submit.png")
    

    document.getElementById("Search").appendChild(brands)
    document.getElementById("Search").appendChild(categories)
    document.getElementById("Search").appendChild(order)
    document.getElementById("Search").appendChild(cities)
    document.getElementById("Search").appendChild(submit)
    submit.appendChild(img)

    loadSearchBrands();
    loadSearchCategories();
    loadOrder();
    loadCities();

    
   
    
    $(img).click( ()=> {
        window.location.href = friendlyURL("module=shop&op=view")
        //tambe es pot utilitzar query-string
    });
    $('.search-icon').on('click', function() {
        $(this).toggleClass('active');
        var arrstate = ($(this).attr('class')).split(' ');
        $.each(arrstate, (index, state) => { 
            if(state=="active"){
                document.getElementById("Search").style.display = "flex";
            }
            else {
                document.getElementById("Search").style.display = "none";
            }
        })
        
    });
    
      
    
    
};



$(document).ready(function () {
    try {
        
        localStorage.getItem("filters")
        loadSearch(); 
    } catch (error) {
        var defaultFilters = {
            brand: "",
            model: "",
            price: "",
            fuel: "",
            category: "",
            city: "",
            order: "",
            page: "1"

        };
        localStorage.setItem('filters', JSON.stringify(defaultFilters))
        loadSearch();
    
        
    }    
});
