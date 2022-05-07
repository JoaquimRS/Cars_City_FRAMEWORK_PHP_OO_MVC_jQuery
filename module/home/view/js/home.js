function loadSwiper(){
    const swiper = new Swiper('.swiper', {
        loop: true,
        slidesPerView: 3,
        spaceBetween: 50,
        autoplay: {
            delay: 3000,
          },
        pagination: {
        el: '.swiper-pagination',
        },
        centeredSlides: true,
    })
};

function loadCarusel(){
    ajaxPromise('GET', 'JSON', friendlyURL("?module=home&op=brands"))
    .then(function(jsonBrands){

            var swiperBrands = document.createElement('div')
            var pagination = document.createElement('div')
            
            swiperBrands.className="swiper-wrapper"
            
            pagination.className="swiper-pagination"
            
            document.getElementById("swiper").appendChild(swiperBrands)
            $.each(jsonBrands, function(index, brand) {
                var brands = document.createElement('div')
                var IMG = document.createElement('img')
                var brand_name = document.createElement('h2')
                
                brands.className="box highlight swiper-slide"
                brand_name.appendChild(document.createTextNode(brand.nombre_marca))
                
                IMG.src = "view/img/brands/"+brand.url_img
                IMG.className="img-marca zoom brand onClickHome"
                IMG.id = brand.nombre_marca

                brands.appendChild(IMG)
                brands.appendChild(brand_name)
                swiperBrands.appendChild(brands)
                
                
            })
            document.getElementById("swiper").appendChild(pagination)
            loadSwiper()
            Gnews(jsonBrands)
    }).catch(function(){
        console.log("Error brands")
    })


};

function loadFuels(){
    ajaxPromise('GET','JSON',friendlyURL("?module=home&op=fuels"))
    .then(function(jsonFuels){
        $.each(jsonFuels, function(index, fuel) {
            var fuels = document.createElement('section')
            var box = document.createElement('div')
            var a_IMG = document.createElement('a')
            var IMG = document.createElement('img')
            var fuel_info = document.createElement('div')
            var fuel_name = document.createElement('h3')
            var fuel_desc = document.createElement('p')

            fuels.className="col-6 col-12-narrower ximo"

            box.className="box post"
            
            a_IMG.className="image left zoom"

            IMG.src = "view/img/fuels/"+fuel.url_img
            IMG.id = fuel.nombre_combustible
            IMG.className = "fuel onClickHome"
            fuel_info.className = "inner"

            fuel_name.appendChild(document.createTextNode(fuel.nombre_combustible))

            fuel_desc.appendChild(document.createTextNode(fuel.descripcion))

            fuels.appendChild(box)
            box.appendChild(a_IMG)
            a_IMG.appendChild(IMG)
            box.appendChild(fuel_info)
            fuel_info.appendChild(fuel_name)
            fuel_info.appendChild(fuel_desc)
            document.getElementById("root-fuels").appendChild(fuels)
            
            
        })
        
            
    }).catch(function(){
        console.log("Error fuels")
    })
};

function loadCategories(){
    ajaxPromise('GET','JSON',friendlyURL("?module=home&op=categories"))
    .then(function(jsonCategories){
        $.each(jsonCategories, function(index, category) {
            var categories = document.createElement('section')
            var box = document.createElement('div')
            var a_IMG = document.createElement('a')
            var IMG = document.createElement('img')
            var category_info = document.createElement('div')
            var category_name = document.createElement('h3')
            var category_desc = document.createElement('p')

            categories.className="col-6 col-12-narrower ximo"

            box.className="box post"
            
            a_IMG.className="image left zoom"

            IMG.src = "view/img/categories/"+category.url_img
            IMG.id = category.nombre_categoria
            IMG.className = "category onClickHome"
            category_info.className = "inner"

            category_name.appendChild(document.createTextNode(category.nombre_categoria))

            category_desc.appendChild(document.createTextNode(category.descripcion))

            categories.appendChild(box)
            box.appendChild(a_IMG)
            a_IMG.appendChild(IMG)
            box.appendChild(category_info)
            category_info.appendChild(category_name)
            category_info.appendChild(category_desc)
            document.getElementById("root-types").appendChild(categories)
            
            
        })
        
        
    }).catch(function(){
        console.log("Error categories")
    })
};

function loadHome() {
    loadCarusel()
    loadFuels()
    loadCategories()

};
function redirectShop() {
    $(document).on("click", ".onClickHome", function () { 
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
        var value = $(this).attr('id')
        var arrKey = ($(this).attr('class')).split(' ')
        
        $.each(arrKey, (index, key) => {
            switch (key) {
                case "brand":
                    defaultFilters.brand=value;
                    break;
                case "fuel":
                    defaultFilters.fuel=value;
                    break;
                case "category":
                    defaultFilters.category=value;
                    break;
                default:
                    break;
            }
        })
        localStorage.setItem('filters', JSON.stringify(defaultFilters))
        window.location.href = "./index.php?module=controller_shop"
        //tambe es pot utilitzar query-string
    });
};
function loadNews(jsonNews, length = 3) {
    while (document.getElementById('root-news').firstChild) {
        document.getElementById('root-news').removeChild(document.getElementById('root-news').lastChild)
    }
    if (jsonNews){
        for (let index = 0; index < length; index++) {

            var New = jsonNews.articles[index]
            var section = document.createElement('section')
            var div = document.createElement('div')
            var img = document.createElement('img')
            var title = document.createElement('h3')
            var description = document.createElement('p')

            section.className="col-4 col-12-narrower"
            div.className="box highlight zoom news"
            div.setAttribute("url", New.url)
            img.src = New.image
            img.className = "newsImage"
            title.appendChild(document.createTextNode(New.title))
            description.appendChild(document.createTextNode(New.content))

            document.getElementById('root-news').appendChild(section)
            section.appendChild(div)
            div.appendChild(img)
            div.appendChild(title)
            div.appendChild(description)            
            
        }
        $(document).ready(function () {
            $(document.getElementsByClassName("news")).on("click", function() {
                var url = $(this).attr('url')
                console.log(url);
                window.open(url, '_blank')
            })
            
            
        });
    } else {
        var error = document.createElement('p')
        error.appendChild(document.createTextNode("No hay noticas disponibles por favor recargue la pagina"))
        document.getElementById('root-news').appendChild(error)
    }
    
    window.addEventListener('scroll',function(){
        var scrollHeight = document.documentElement.scrollHeight;
        var scrollTop = document.documentElement.scrollTop;
        var clientHeight = document.documentElement.clientHeight;
        if (length <= 6) {
            if( (scrollTop + clientHeight) > (scrollHeight - 1)){
                
                setTimeout((length=length+3), 1000);
                
                loadNews(jsonNews, length);

            }
        }   
    });

}
function Gnews(jsonBrands) {
    var arrBrands = []
    $.each(jsonBrands, (index, brand) => {
        arrBrands.push(brand.nombre_marca)
    })
    var brandPos = Math.floor(Math.random() * arrBrands.length)
    var randBrand = jsonBrands[brandPos].nombre_marca
    
    ajaxPromise('GET','JSON','https://gnews.io/api/v4/search?q=' + randBrand + '&max=9&lang=es&token=496f742b965e88ec8fbcf250f0e26959')
    .then(function(jsonNews){
        loadNews(jsonNews)
    }).catch(function(){
        console.log("Error news")
    })
};


$(document).ready(function() {
    currentMenu("menu-home");
    // redirectShop();
    loadHome();
})