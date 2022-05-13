function loadSwiper() {
    const swiper = new Swiper('.swiper', {
        loop: false,
        slidesPerView: 1,
        spaceBetween: 1,
        pagination: {
            el: '.swiper-pagination',
            type: 'fraction',
            },
        centeredSlides: true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
    });
};

function loadSwiperDetails(){
    const swiper = new Swiper('.swiper', {
        initialSlide: 3,
        loop: true,
        slidesPerView: 7,

        direction: 'vertical',
        pagination: {
            el: '.swiper-pagination',
            type: 'fraction',
            },
        centeredSlides: true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
        scrollbar: {
            el: '.swiper-scrollbar',
          },
        mousewheel: {
            invert: false,
          },
    });
};

function loadSwiperGMaps() {
    const swiper_maps = new Swiper('.swiper_gmaps', {
        loop: false,
        slidesPerView: 1,
        spaceBetween: 1,
        centeredSlides: true,
        pagination: {
            el: '.swiper-pagination',
            type: 'fraction',
            },
        centeredSlides: true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
        
    });
};

function redirectDetails() {
   $(document).on("click", ".car-related", function () { //si el usuari fa click en els cotxes relacionats
       var idCar = $(this).attr('id')
       ajaxPromise("GET","JSON",friendlyURL("?module=shop&op=increment_views&param="+idCar))
       .then((sql) => {
           loadDetails(idCar)
            window.location.href="#header"
        }).catch(() => {
            console.log("Error Increment Views");
        })

   });
   $(document).on("click", ".shop_car-info", function () { //si el usuari fa click en la descripcio de cada cotxe
    var idCar = $(this).attr('id')
    ajaxPromise("GET","JSON",friendlyURL("?module=shop&op=increment_views&param="+idCar))
    .then((sql) => {
         loadDetails(idCar)
         window.location.href="#header"
     }).catch(() => {
         console.log("Error Increment Views");
     })

    });
   $(document).on("click", ".redirect_details", function () { // si el usuari fa click en el carrousel dels marcadors de google maps
        var idCar = $(this).attr('id')
        ajaxPromise("GET","JSON",friendlyURL("?module=shop&op=increment_views&param="+idCar))
       .then((sql) => {
            loadDetails(idCar)
            window.location.href="#header"
        }).catch(() => {
            console.log("Error Increment Views");
        })
    });
    $(document).on("click", ".return-shop", function () {
        while (document.getElementById('details').firstChild) {
            document.getElementById('details').removeChild(document.getElementById('details').lastChild)
        }
        queryString();
        changeQueryString();
        loadShop();
    });

};

function loadRealated(carInfo) {
    var relatedTitle = document.createElement('h2')
    var related = document.createElement('div')
    
    relatedTitle.appendChild(document.createTextNode("Relacionados"))
    relatedTitle.className = "centered"
    related.id = "relatedCars"

    document.getElementById("details").appendChild(relatedTitle)
    document.getElementById("details").appendChild(related)
    console.log(carInfo[0]);
    ajaxPromise("POST","JSON",friendlyURL("?module=shop&op=related_cars"), carInfo[0])
    .then((jsonRelatedCars) => {
         $.each(jsonRelatedCars, (index, relatedCar) => { 
            if (relatedCar.id_coche != carInfo[0].id_coche) {
                var divCar = document.createElement('div')
                var img = document.createElement('img')
                var BrandModel = document.createElement('h3')
                var tableInfo = document.createElement('table')
                var thFuel = document.createElement('th')
                var thCity = document.createElement('th')
                var thKms = document.createElement('th')
                var thCategory = document.createElement('th')


                thFuel.appendChild(document.createTextNode(relatedCar.nombre_combustible))
                thCity.appendChild(document.createTextNode(relatedCar.cambio))
                thKms.appendChild(document.createTextNode(relatedCar.kms + " kms"))
                thCategory.appendChild(document.createTextNode(relatedCar.nombre_categoria))
                divCar.id = relatedCar.id_coche
                divCar.className = "zoom car-related"
                if(relatedCar.IMG){
                    img.src = friendlyURLImages("view/img/cars/"+relatedCar.IMG)
                } else {
                    img.src = friendlyURLImages("view/img/cars/error.jpg")
                }

                BrandModel.appendChild(document.createTextNode(relatedCar.nombre_marca + " " + relatedCar.nombre_modelo))
                related.appendChild(divCar)
                divCar.appendChild(img)
                divCar.appendChild(BrandModel)
                divCar.appendChild(tableInfo)
                tableInfo.appendChild(thFuel)
                tableInfo.appendChild(thCity)
                tableInfo.appendChild(thKms)
                tableInfo.appendChild(thCategory)
            }

        });
        // console.log(jsonRelatedCars);
     }).catch(() => {
         console.log("Error Related Cars");
     })

};

function loadDetails(idCar) {
    while (document.getElementById('details').firstChild) {
        document.getElementById('details').removeChild(document.getElementById('details').lastChild)
    }

    if (document.getElementById('list')){
        document.getElementById('list').remove()
    }
    var returnShop = document.createElement('img')
    var container = document.createElement('main')
    var imageSlider = document.createElement('div')
    var swiper = document.createElement('div')
    var swiperWrapper = document.createElement('div')
    var leftColumn = document.createElement('div')
    var rightColumn = document.createElement('div')
    var productDescription = document.createElement('div')

    returnShop.src=friendlyURLImages("view/img/return.png")
    returnShop.className="return-shop"
    container.className = "container"
    imageSlider.className = "image-slider"
    swiper.className = "swiper"
    swiperWrapper.className = "swiper-wrapper"
    leftColumn.className = "left-column"
    rightColumn.className = "right-column"
    productDescription.className = "product-description"

    document.getElementById("details").appendChild(returnShop)
    document.getElementById("details").appendChild(container)
    container.appendChild(imageSlider)
    imageSlider.appendChild(swiper)
    swiper.appendChild(swiperWrapper)
    container.appendChild(leftColumn)
    container.appendChild(rightColumn)
    rightColumn.appendChild(productDescription)

    ajaxPromise("GET","JSON",friendlyURL("?module=shop&op=carImages&param="+idCar))
            .then(function (carImages) {
                $.each(carImages, function(index, carImg) {
                    var swiperSlide = document.createElement('div')
                    var carImageClick = document.createElement('img')


                    carImageClick.src = friendlyURLImages("view/img/cars/"+carImg.url_img)
                    swiperSlide.className = "swiper-slide"
                    carImageClick.id = carImg.id_img
                    carImageClick.className = "click_img"


                    swiperWrapper.appendChild(swiperSlide)
                    swiperSlide.appendChild(carImageClick)
                    if (index == 1) {
                        var carImage = document.createElement('img')

                        carImage.src = friendlyURLImages("view/img/cars/"+carImg.url_img)
                        carImage.className = "active img"

                        leftColumn.appendChild(carImage)
                    }

                    $(carImageClick).on("click", () => {
                        $.each(carImages, function(index, carImg) {

                            var carImage = document.createElement('img')

                            carImage.src = friendlyURLImages("view/img/cars/"+carImg.url_img)
                            if (carImg.id_img === carImageClick.id) {
                                carImage.className = "active img"
                            }

                            carImage.id = carImg.id_img

                            leftColumn.appendChild(carImage)
                        });

                    })

                });
                loadSwiperDetails();
            }).catch(function(){
                console.log("Error car Images");

            })
    ajaxPromise("GET","JSON",friendlyURL("?module=shop&op=car&param="+idCar))
    .then(function (carsInfo) {
        $.each(carsInfo, (index, carInfo) => {
            var price = document.createElement('span')
            var BrandModel = document.createElement('h2')
            var tableInfo = document.createElement('table')
            var thFuel = document.createElement('th')
            var thCity = document.createElement('th')
            var thKms = document.createElement('th')
            var thCategory = document.createElement('th')
            var mapDetails = document.createElement('div')

            price.appendChild(document.createTextNode(carInfo.precio + '€'))
            BrandModel.appendChild(document.createTextNode(carInfo.nombre_marca + ' ' + carInfo.nombre_modelo))
            thFuel.appendChild(document.createTextNode(carInfo.nombre_combustible))
            thCity.appendChild(document.createTextNode(carInfo.cambio))
            thKms.appendChild(document.createTextNode(carInfo.kms + " kms"))
            thCategory.appendChild(document.createTextNode(carInfo.nombre_categoria))
            mapDetails.id="map_details"

            // productDescription.appendChild(price)
            productDescription.appendChild(BrandModel)
            productDescription.appendChild(tableInfo)
            tableInfo.appendChild(thFuel)
            tableInfo.appendChild(thCity)
            tableInfo.appendChild(thKms)
            tableInfo.appendChild(thCategory)

            productDescription.appendChild(mapDetails)
            loadRealated(carsInfo);
        })
        loadDetailsGMap(carsInfo)
    })
};

function loadFilters() {
    while (document.getElementById('root-filters').firstChild) {
        document.getElementById('root-filters').removeChild(document.getElementById('root-filters').lastChild)
    }
    var root_filters = document.createElement('div')
    var filtersTitle = document.createElement('h2')
    var filters = document.createElement('div')
    var removeFilters = document.createElement('img')
    var brandsTitle = document.createElement('b')
    var brands = document.createElement('select')
    var br = document.createElement('br')
    var modelsTitle = document.createElement('b')
    var models = document.createElement('select')
    var priceTitle = document.createElement('b')
    var price = document.createElement('input')
    var fuelTitle = document.createElement('b')
    var fuels = document.createElement('select')
    var categoryTitle = document.createElement('b')
    var categories = document.createElement('select')
    var cityTitle = document.createElement('b')
    var cities = document.createElement('select')
    
    // var doorTitle = document.createElement('b')
    // var doors = document.createElement('input')
    // var seatTitle = document.createElement('b')
    // var seats = document.createElement('input')



    root_filters.className = "filters"
    filters.className = "filtersdiv"
    filtersTitle.appendChild(document.createTextNode("Filtros"))
    removeFilters.src= friendlyURLImages("view/img/filter-remove.png")
    removeFilters.className = "removeFilters"
    brandsTitle.appendChild(document.createTextNode("Marca"))
    brands.className = "onChangeFilters"
    modelsTitle.appendChild(document.createTextNode("Modelo"))
    models.className = "onChangeFilters"
    priceTitle.appendChild(document.createTextNode("Precio"))
    price.setAttribute("type", "number")
    price.className = "onChangeFilters"
    price.id = "price"
    fuelTitle.appendChild(document.createTextNode("Combustible"))
    fuels.className = "onChangeFilters"
    categoryTitle.appendChild(document.createTextNode("Categoria"))
    categories.className = "onChangeFilters"
    cityTitle.appendChild(document.createTextNode("Ciudad"))
    cities.className = "onChangeFilters"
    // doorTitle.appendChild(document.createTextNode("Doors"))
    // doors.setAttribute("type", "number")
    // seatTitle.appendChild(document.createTextNode("Seats"))
    // seats.setAttribute("type", "number")


    document.getElementById("root-filters").appendChild(root_filters)
    root_filters.appendChild(filtersTitle)
    document.getElementById("root-filters").appendChild(filters)
    filters.appendChild(removeFilters)
    filters.appendChild(brandsTitle)
    filters.appendChild(brands)
    filters.appendChild(br)
    filters.appendChild(modelsTitle)
    filters.appendChild(models)
    filters.appendChild(br)
    filters.appendChild(priceTitle)
    filters.appendChild(price)
    filters.appendChild(br)
    filters.appendChild(br)
    filters.appendChild(fuelTitle)
    filters.appendChild(fuels)
    filters.appendChild(br)
    filters.appendChild(categoryTitle)
    filters.appendChild(categories)
    filters.appendChild(br)
    filters.appendChild(cityTitle)
    filters.appendChild(cities)
    filters.appendChild(br)
    // filters.appendChild(doorTitle)
    // filters.appendChild(doors)
    // filters.appendChild(br)
    // filters.appendChild(seatTitle)
    // filters.appendChild(seats)
    // filters.appendChild(br)


    ajaxPromise("GET","JSON",friendlyURL("?module=shop&op=brands_models"))
    .then((jsonBrandsModels) => {
        var Brands = jsonBrandsModels[0]
        var Models = jsonBrandsModels[1]

        var blankBrand = document.createElement('option')

        blankBrand.className = "brand"

        blankBrand.id = "0"
        blankBrand.value = ""

        brands.appendChild(blankBrand)

        $.each(Brands, (index, Brand) => {

            var brand = document.createElement('option')

            brand.id = Brand.id_marca
            brand.appendChild(document.createTextNode(Brand.nombre_marca))
            try {
                var lsbrand = JSON.parse(localStorage.getItem('filters')).brand
                if (Brand.nombre_marca == lsbrand) {
                    brand.selected = true
                }
            } catch (error) {
            }
            brand.className = "brand"

            brands.appendChild(brand)
        })
        $(brands).on("change", () => {
            var id_brand = brands.options[brands.selectedIndex].id
            while (models.firstChild) {
                models.removeChild(models.lastChild)
            }
            var blankModel = document.createElement('option')

            blankModel.className = "model"
            blankModel.id = "0"

            models.appendChild(blankModel)

            $.each(Models, (index, Model) => {
                if (Model.id_marca == id_brand) {
                    var lsmodel = JSON.parse(localStorage.getItem('filters')).model
                    var model = document.createElement('option')

                    model.id = Model.id_modelo
                    model.className = "model"
                    if (model.id == lsmodel) {
                        model.selected = true
                    }
                    model.appendChild(document.createTextNode(Model.nombre_modelo))

                    models.appendChild(model)
                }
            })
        })
        var id_brand = brands.options[brands.selectedIndex].id
        while (models.firstChild) {
            models.removeChild(models.lastChild)
        }
        var blankModel = document.createElement('option')

        blankModel.className = "model"
        blankModel.id = "0"

        models.appendChild(blankModel)

        $.each(Models, (index, Model) => {
            if (Model.id_marca == id_brand) {
                var model = document.createElement('option')

                model.id = Model.id_modelo
                model.className = "model"

                model.appendChild(document.createTextNode(Model.nombre_modelo))
                try {
                    var lsmodel = JSON.parse(localStorage.getItem('filters')).model
                    if (Model.nombre_modelo == lsmodel) {
                        model.selected = true
                    }
                } catch (error) {
                }

                models.appendChild(model)
            }
        })
    }).catch(() => {
        console.log("Error Brands Models");
    })
    try {
        var lsprice = JSON.parse(localStorage.getItem('filters')).price
        price.value = lsprice
    } catch (error) {
    }
    ajaxPromise("GET","JSON",friendlyURL("?module=shop&op=fuels"))
    .then((jsonFuels) => {
        var blank = document.createElement('option')
        blank.className = "fuel"
        fuels.appendChild(blank)
        $.each(jsonFuels, function (index, Fuel) {
            var fuel = document.createElement('option')

            fuel.appendChild(document.createTextNode(Fuel.nombre_combustible))
            fuel.id = Fuel.nombre_combustible
            fuel.className = "fuel"
            try {
                var lsfuel = JSON.parse(localStorage.getItem('filters')).fuel
                if (Fuel.nombre_combustible == lsfuel) {
                    fuel.selected = true
                }
            } catch (error) {
            }
            fuels.appendChild(fuel)
        });
    }).catch(() => {
        console.log("Error Fuels");
    })
    
    ajaxPromise("GET","JSON",friendlyURL("?module=shop&op=categories"))
    .then((jsonCategories) => {
        
        var blank = document.createElement('option')
        blank.className = "category"
        categories.appendChild(blank)
        $.each(jsonCategories, function (index, Category) {
            var category = document.createElement('option')

            category.appendChild(document.createTextNode(Category.nombre_categoria))
            category.id = Category.nombre_categoria
            category.className = "category"
            try {
                var lscategory = JSON.parse(localStorage.getItem('filters')).category
                if (Category.nombre_categoria == lscategory) {
                    category.selected = true
                }
            } catch (error) {
            }
            categories.appendChild(category)
        });
    }).catch(() => {
        console.log("Error Categories");
    })
    ajaxPromise("GET","JSON",friendlyURL("?module=shop&op=cities"))
    .then((jsonCities) => {
        
        var blank = document.createElement('option')
        blank.className = "city"
        cities.appendChild(blank)
        $.each(jsonCities, function (index, City) {
            var city = document.createElement('option')

            city.appendChild(document.createTextNode(City.ciudad))
            city.id = City.ciudad
            city.className = "city"
            try {
                var lscity = JSON.parse(localStorage.getItem('filters')).city
                if (City.ciudad == lscity) {
                    city.selected = true
                }
            } catch (error) {
            }
            cities.appendChild(city)
        });
    }).catch(() => {
        console.log("Error Categories");
    })

    const defaultFilters = {
        brand: JSON.parse(localStorage.getItem("filters")).brand,
        model: JSON.parse(localStorage.getItem("filters")).model,
        price: JSON.parse(localStorage.getItem("filters")).price,
        fuel: JSON.parse(localStorage.getItem("filters")).fuel,
        category: JSON.parse(localStorage.getItem("filters")).category,
        city: JSON.parse(localStorage.getItem("filters")).city,
        order: JSON.parse(localStorage.getItem("filters")).order,
        page: JSON.parse(localStorage.getItem("filters")).page

    };
    $(".onChangeFilters").on("change", function() {


        if ($(this).is("input")){
            var keyFilter = $(this).attr("id");
            var valueFilter = $(this).val();
        } else {
            var keyFilter = $(this).children(":selected").attr("class");
            var valueFilter = $(this).children(":selected").val();

        }
        defaultFilters[keyFilter] = valueFilter
        if (keyFilter=="brand") {
            defaultFilters.model = ""
        }
        localStorage.setItem('filters', JSON.stringify(defaultFilters))
        ajaxForSearch();
        changeQueryString();
    })

    $(".removeFilters").click( function () {
        const defaultFilters = {
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
        changeQueryString();
        loadFilters();
    })

    ajaxForSearch();


};

function loadDetailsGMap(cars) {
    $.each(cars, (index, car) => {
            var carPos = { lat: parseFloat(car.lat), lng: parseFloat(car.lng) };
            
            const mapdetails = new google.maps.Map(document.getElementById("map_details"), {
            zoom: 8,
            center: carPos,
            gestureHandling: "auto",
            zoomControl: true,
            });

            const infowindow = new google.maps.InfoWindow({
                content: '<div id="root-gmaps"></div>' +
                            '<div id="gmaps_content_details">' +
                                '<b>'+car.nombre_marca + " " + car.nombre_modelo+'</b><br>'+
                                '<span>Ciudad: '+car.ciudad+'</span><br>'+
                                '<span>Precio: '+car.precio+'€</span><br>'

            });
                
            const marker = new google.maps.Marker({
            position: carPos,
            map: mapdetails,
            title: car.nombre_marca + " " + car.nombre_modelo,
            animation: google.maps.Animation.DROP, //animacio per a cada marcador
            });
            marker.addListener("click", () => {
                if (infowindow.getMap()) {
                    infowindow.close();  
                }
                else {
                    infowindow.open({
                        anchor: marker,
                        mapdetails,
                        shouldFocus: false,
                        });
                        loadContentDetailsGmaps(car.id_coche);
                    }
                });

        })
};

function loadGMap(cars, notFilters = true) {

    var centerPoint = { lat: 38.78317511958979, lng: -0.7851077280611519 };

    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 8,
      center: centerPoint,
      gestureHandling: "auto",
      zoomControl: true,
    });
    if (notFilters==true){   
        $.each(cars, (index, car) => {
            const carPos = { lat: parseFloat(car.lat), lng: parseFloat(car.lng) };
            
            const infowindow = new google.maps.InfoWindow({
                content: '<div id="root-gmaps"></div>' +
                            '<div id="gmaps_content">' +
                                '<b>'+car.nombre_marca + " " + car.nombre_modelo+'</b><br>'+
                                '<span>Ciudad: '+car.ciudad+'</span><br>'+
                                '<span>Precio: '+car.precio+'€</span><br>'

            });
            
            const marker = new google.maps.Marker({
            position: carPos,
            map,
            title: car.nombre_marca + " " + car.nombre_modelo,
            animation: google.maps.Animation.DROP, //animacio per a cada marcador
            });

            marker.addListener("click", () => {
            if (infowindow.getMap()) {
                infowindow.close();  
            }
            else {
                infowindow.open({
                    anchor: marker,
                    map,
                    shouldFocus: false,
                    });
                    loadContentGmaps(car.id_coche);
                }
            });
            
        })
        $(document).ready(function () {
            $(".shop_car-info").hover( function()  {
                let carId = $(this).attr('id');
                $.each(cars, (index, car) => {
                    if(car.id_coche==carId){
                        const carPos = { lat: parseFloat(car.lat), lng: parseFloat(car.lng) };
                        map.setCenter(carPos);
                        //Centra el mapa en cada cotxe
                    }
                
                })
            })
        });
    }
        
};

function loadPagination(cars, ppp, notfilters=true) {
    while (document.getElementById('root-cars').firstChild) {
        document.getElementById('root-cars').removeChild(document.getElementById('root-cars').lastChild)
    }
    var Content = document.createElement('div')
    var itemsTitle = document.createElement('h2')
    var shopCars = document.createElement('div')
    var pagination = document.createElement('div')

    Content.id = "content"
    Content.className = "content"
    itemsTitle.appendChild(document.createTextNode("Nuestros coches"))
    shopCars.className = "shop_cars-container"
    shopCars.id = "shopCars"
    pagination.id = "root-pagination"
    pagination.className = "pagination"

    document.getElementById('root-cars').appendChild(Content)
    Content.appendChild(itemsTitle)
    Content.appendChild(shopCars)
    Content.appendChild(pagination)
    if (notfilters==true){
        np = Math.ceil(cars.length/ppp)
        var prods = []
        var divcars = []
        let j = 0
        let lng = ppp
        for (let i = 1; i <= np; i++) {
            var number = document.createElement('a')

            number.appendChild(document.createTextNode(i))
            number.id = i
            number.className = "numPag"

            pagination.appendChild(number)

            lng=lng + j
            for (j; j < lng; j++) {
                if (cars[j]){
                    divcars.push(cars[j])   
                } else {
                    break
                }                           
            }
            prods.push(divcars);
            divcars = []
        }

        var actualpage = JSON.parse(localStorage.getItem("filters")).page
        if (actualpage<=np){
            loadCars(prods[actualpage-1], notfilters);
            loadLocation(prods[actualpage-1], notfilters);
        } else {
            var lsfilters = JSON.parse(localStorage.getItem('filters'))
            const defaultFilters = {
                brand: lsfilters.brand,
                model: lsfilters.model,
                price: lsfilters.price,
                fuel: lsfilters.fuel,
                category: lsfilters.category,
                city: lsfilters.city,
                order: lsfilters.order,
                page: lsfilters.page
    
            };
            defaultFilters.page = np
            localStorage.setItem('filters', JSON.stringify(defaultFilters))
            changeQueryString();
            $(document).ready(function () {
                loadCars(prods[np-1], notfilters);
                loadLocation(prods[np-1], notfilters);
                
            });
        }
        $(document).on("click", ".numPag", function () {
            var lsfilters = JSON.parse(localStorage.getItem('filters'))
            const defaultFilters = {
                brand: lsfilters.brand,
                model: lsfilters.model,
                price: lsfilters.price,
                fuel: lsfilters.fuel,
                category: lsfilters.category,
                city: lsfilters.city,
                order: lsfilters.order,
                page: lsfilters.page
    
            };
            var clickPage = $(this).attr("id")
            defaultFilters.page = clickPage
            localStorage.setItem('filters', JSON.stringify(defaultFilters))
            changeQueryString();
            loadCars(prods[clickPage-1], notfilters);
            loadLocation(prods[clickPage-1], notfilters);
            
        })
    }
    else {
       
        loadCars(cars, notfilters);
        loadLocation(cars, notfilters);
    }

};

function loadCars(cars, notFilters=true) {
    shopCars = document.getElementById("shopCars")
    while (document.getElementById('shopCars').firstChild) {
        document.getElementById('shopCars').removeChild(document.getElementById('shopCars').lastChild)
    }
    if (notFilters==false){
        var noFoundCars = document.createElement('h3')

        noFoundCars.appendChild(document.createTextNode("No existen coches con esos filtros"))

        shopCars.appendChild(noFoundCars)
    } else {
        
        $.each(cars, function (index, car) {
            var shopCar = document.createElement('div')
            var shopCarPreview = document.createElement('div')
            var swiper = document.createElement('div')
            var swiperWrapper = document.createElement('div')
            var swiperPagination = document.createElement('div')
            var swiperButtonPrev = document.createElement('div')
            var swiperButtonNext = document.createElement('div')
            var like = document.createElement('div')
            var shopCarInfo = document.createElement('div')
            var BrandModel = document.createElement('h2')
            var Price = document.createElement('h6')
            var tableInfo = document.createElement('table')
            var thFuel = document.createElement('th')
            var thCity = document.createElement('th')
            var thKms = document.createElement('th')
            var thCategory = document.createElement('th')
            
            var swiperSlide = document.createElement('div')
            var carImage = document.createElement('img')


            shopCar.className="shop_car"
            shopCarInfo.id=car.id_coche
            shopCarPreview.className="shop_car-preview"
            swiper.className = "swiper"
            swiperWrapper.className = "swiper-wrapper"
            swiperPagination.className = "swiper-pagination swiper-pagination-fraction swiper-pagination-horizontal gmaps_pagination"
            swiperButtonPrev.className = "swiper-button-prev hide-button-prev"
            swiperButtonNext.className = "swiper-button-next hide-button-prev"
            like.className="like"
            like.id = "like"+car.id_coche
            shopCarInfo.className="shop_car-info"
            thFuel.appendChild(document.createTextNode(car.nombre_combustible))
            thCity.appendChild(document.createTextNode(car.ciudad))
            thKms.appendChild(document.createTextNode(car.kms + " kms"))
            thCategory.appendChild(document.createTextNode(car.nombre_categoria))
            BrandModel.appendChild(document.createTextNode(car.nombre_marca + ' ' + car.nombre_modelo))
            Price.appendChild(document.createTextNode(car.precio+"€"))
            
            swiperSlide.id = "replace"
            carImage.src=friendlyURLImages("view/img/cars/load_img.gif")


            shopCars.appendChild(shopCar);
            swiper.appendChild(swiperWrapper)
            swiper.appendChild(swiperPagination)
            swiper.appendChild(swiperButtonPrev)
            swiper.appendChild(swiperButtonNext)
            shopCarPreview.appendChild(swiper)
            shopCar.appendChild(shopCarPreview)
            shopCar.appendChild(shopCarInfo)
            shopCar.appendChild(like)
            shopCarInfo.appendChild(BrandModel)
            shopCarInfo.appendChild(Price)
            shopCarInfo.appendChild(tableInfo)
            tableInfo.appendChild(thCity)
            tableInfo.appendChild(thFuel)
            tableInfo.appendChild(thCategory)
            tableInfo.appendChild(thKms)
            swiperWrapper.appendChild(swiperSlide)
            swiperSlide.appendChild(carImage)
            
            ajaxPromiseTimeout(500,"GET","JSON",friendlyURL("?module=shop&op=carImages&param="+car.id_coche))
            .then(function (carImages) {
                document.getElementById("replace").remove()
                $.each(carImages, function(index, carImg) {
                    var swiperSlide = document.createElement('div')
                    var carImage = document.createElement('img')

                    carImage.src = friendlyURLImages("view/img/cars/"+carImg.url_img)
                    carImage.className = "car_img"
                    swiperSlide.className = "swiper-slide"

                    swiperWrapper.appendChild(swiperSlide)
                    swiperSlide.appendChild(carImage)
                });

                loadSwiper()
            }).catch(function(){
                console.log("Error car Images");

            })

            $(like).on("click", ()=>{
                if (localStorage.getItem("token")){
                    ajaxPromiseToken("POST","JSON",friendlyURL("?module=shop&op=mod_user_like&param="+car.id_coche))
                    .then(function(jsonUserLike){
                        if(jsonUserLike.RESULT == 1) {
                            like.classList.remove("like-focus")
                        } else {
                            like.classList.add("like-focus")
                        }
                    }).catch(function(){
                        console.log("Error User Like")
                    });
                } else {
                    var ll = window.location.search
                    localStorage.setItem("ll",ll)
                    window.location.href = friendlyURLLogin("login")
                }
            })


        });
        
        if (localStorage.getItem("token")){
            ajaxPromiseToken("POST","JSON",friendlyURL("?module=shop&op=user_likes"))
            .then(function(jsonLikes){
                $.each(jsonLikes, function (index, id_Car) {
                    likes = document.getElementById("like"+id_Car.id_coche)
                    if(likes){
                        likes.classList.add("like-focus")   
                    }
                });
            }).catch(function(){
                console.log("Error Select User Likes")
            });
        }
    }
    
}

function loadItems(jsonfilteredCars) {
    var notfilters = true;
    var ppp = 5;
    filters = JSON.parse(localStorage.getItem('filters'))
    for (let key of Object.keys(filters)) {
        let value = filters[key]
        if(value){
            notfilters=false
            //Existen filtros
        }        
    }
    if (jsonfilteredCars.length>0) {
        loadPagination(jsonfilteredCars, ppp);
    } else {
        ajaxPromise("GET","JSON",friendlyURL("?module=shop&op=cars"))
        .then(function(jsonCars){
            loadPagination(jsonCars, ppp, notfilters);
        }).catch(function(){
            console.log("Error cars")
        });
    }
};

function loadContentGmaps(idCar) {
    $(document).ready(function () {
        
        while (document.getElementById('root-gmaps').firstChild) {
            document.getElementById('root-gmaps').removeChild(document.getElementById('root-gmaps').lastChild)
        }
        var swiper = document.createElement('div')
        var swiperWrapper = document.createElement('div')
        var swiperPagination = document.createElement('div')
        var swiperButtonPrev = document.createElement('div')
        var swiperButtonNext = document.createElement('div')

        swiper.className = "swiper_gmaps redirect_details"
        swiper.id=idCar
        swiperWrapper.className = "swiper-wrapper"
        swiperPagination.className = "swiper-pagination"
        swiperButtonPrev.className = "swiper-button-prev"
        swiperButtonNext.className = "swiper-button-next"
        
        document.getElementById('root-gmaps').appendChild(swiper)
        swiper.appendChild(swiperWrapper)
        swiper.appendChild(swiperPagination)
        // swiper.appendChild(swiperButtonPrev)
        // swiper.appendChild(swiperButtonNext)
        ajaxPromise("GET","JSON",friendlyURL("?module=shop&op=carImages&param="+idCar))
        .then(function (carImages) {
            $.each(carImages, function(index, carImg) {
                var swiperSlide = document.createElement('div')
                var carImage = document.createElement('img')
    
                carImage.src = friendlyURLImages("view/img/cars/"+carImg.url_img)
                carImage.className = "gmaps_img"
                swiperSlide.className = "swiper-slide"
    
                swiperWrapper.appendChild(swiperSlide)
                swiperSlide.appendChild(carImage)
            });
    
            loadSwiperGMaps();
        }).catch(function(){
            console.log("Error gmaps car Images");
    
        })
    });
};

function loadContentDetailsGmaps(idCar) {
    $(document).ready(function () {
        
        while (document.getElementById('root-gmaps').firstChild) {
            document.getElementById('root-gmaps').removeChild(document.getElementById('root-gmaps').lastChild)
        }
        var swiper = document.createElement('div')
        var swiperWrapper = document.createElement('div')
        var swiperPagination = document.createElement('div')
        var swiperButtonPrev = document.createElement('div')
        var swiperButtonNext = document.createElement('div')

        swiper.className = "swiper_gmaps"
        swiper.id=idCar
        swiperWrapper.className = "swiper-wrapper"
        swiperPagination.className = "swiper-pagination"
        swiperButtonPrev.className = "swiper-button-prev"
        swiperButtonNext.className = "swiper-button-next"
        
        document.getElementById('root-gmaps').appendChild(swiper)
        swiper.appendChild(swiperWrapper)
        swiper.appendChild(swiperPagination)
        swiper.appendChild(swiperButtonPrev)
        swiper.appendChild(swiperButtonNext)
        ajaxPromise("GET","JSON",friendlyURL("?module=shop&op=carImages&param="+idCar))
        .then(function (carImages) {
            $.each(carImages, function(index, carImg) {
                var swiperSlide = document.createElement('div')
                var carImage = document.createElement('img')
    
                carImage.src = friendlyURLImages("view/img/cars/"+carImg.url_img)
                carImage.className = "gmaps_img"
                swiperSlide.className = "swiper-slide"
    
                swiperWrapper.appendChild(swiperSlide)
                swiperSlide.appendChild(carImage)
            });
    
            loadSwiperGMaps();
        }).catch(function(){
            console.log("Error gmaps car Images");
    
        })
    });
};

function loadLocation(cars, notFilters=true) {
    while (document.getElementById('root-location').firstChild) {
        document.getElementById('root-location').removeChild(document.getElementById('root-location').lastChild)
    }
    var sidebar = document.createElement('div')
    var section = document.createElement('section')
    var locationTitle = document.createElement('h2')
    var fixmap = document.createElement('div')
    var map = document.createElement('div')

    sidebar.className = "sidebar2"
    locationTitle.appendChild(document.createTextNode("Localizacion"))
    map.id="map"

    fixmap.className="fixed-map"

    document.getElementById("root-location").appendChild(sidebar)
    sidebar.appendChild(section)
    section.appendChild(locationTitle)
    document.getElementById("root-location").appendChild(fixmap)
    fixmap.appendChild(map)
    loadGMap(cars, notFilters);
    



};

function loadShop() {

    var shop = document.createElement('div')
    var row = document.createElement('div')
    var filters = document.createElement('div')
    var cars = document.createElement('div')
    var location = document.createElement('div')

    shop.id = "list"
    row.className = "row gtr-200"
    filters.className = "col-2"
    filters.id = "root-filters"
    cars.className = "col-6 col-12-narrower imp-narrower"
    cars.id = "root-cars"
    location.className = "col-4"
    location.id = "root-location"

    document.getElementById("shop").appendChild(shop)
    shop.appendChild(row)
    row.appendChild(filters)
    row.appendChild(cars)
    row.appendChild(location)


    loadFilters();
    loadLocation();

};

function loadContent() {
    queryString();
    changeQueryString();
    loadShop();
    redirectDetails();
};

function ajaxForSearch() {

    filters = JSON.parse(localStorage.getItem('filters'))
    
    ajaxPromise("POST","JSON",friendlyURL("?module=shop&op=filter_cars"),filters)
    .then((jsonFilteredCars) => {
        loadItems(jsonFilteredCars);
        // console.log(jsonFilteredCars);
    }).catch(() => {
        console.log("Error Cars Filters");
    })

};

function changeQueryString() {
    if(localStorage.getItem("filters")) {
        var lsfilters = JSON.parse(localStorage.getItem('filters'))
        const querystring = window.location.search
        const params = new URLSearchParams(querystring);
        if (lsfilters){
            for (let key of Object.keys(lsfilters)) {
                let value = lsfilters[key]
                if (value.length>1 || value!=0) {
                    params.set(key, value)
                    window.history.replaceState({}, '', `${window.location.pathname}?${params}`)
                }
                if (value == 0 || value.length<1) {
                    params.delete(key)
                    window.history.replaceState({}, '', `${window.location.pathname}?${params}`)
                }
            }
        }
    }
};

function queryString() {

    if(localStorage.getItem("filters")) {
        var lsfilters = JSON.parse(localStorage.getItem('filters'))
        const querystring = window.location.search
        const params = new URLSearchParams(querystring);



        const defaultFilters = {
            brand: lsfilters.brand,
            model: lsfilters.model,
            price: lsfilters.price,
            fuel: lsfilters.fuel,
            category: lsfilters.category,
            city: lsfilters.city,
            order: lsfilters.order,
            page: lsfilters.page

        };

        for (let filter of params) {
            if (filter[0]!="module") {
            defaultFilters[filter[0]] = filter[1]
            }
        }

        if(Array.from(params).length>1 ){
            localStorage.setItem('filters', JSON.stringify(defaultFilters))
        } else {

        }
    } else {
        const defaultFilters = {
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
        const querystring = window.location.search
        const params = new URLSearchParams(querystring)

        if(Array.from(params).length>1 ){
            queryString();
        }
    }


};

$(document).ready(function() {
    currentMenu("menu-shop");
    loadContent();
});

