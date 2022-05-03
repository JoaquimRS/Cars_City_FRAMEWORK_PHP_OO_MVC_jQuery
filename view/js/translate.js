function changeLang(lang) {
    lang = lang || localStorage.getItem('app-lang') || 'en';
    localStorage.setItem('app-lang', lang);
    var elmnts = document.querySelectorAll('[data-tr]');

    $.ajax({
        url: 'http://ximo.com/tema6_ximo/4_framework_PHP_OO_MVC/view/lang/' + lang + '.json',
            type: 'POST',
            dataType: 'JSON',
            success: function (data) {
                for (var i = 0; i < elmnts.length; i++) {
                    elmnts[i].innerHTML = data.hasOwnProperty(lang) ? data[lang][elmnts[i].dataset.tr] : elmnts[i].dataset.tr;
                }
            }
    })
}

$(document).ready(function() {
    changeLang();
    
    $("button#btn-es").on("click", function() {
        changeLang('es');
        });
    $("button#btn-en").on("click", function() {
        changeLang('en');
        });
    $("button#btn-val").on("click", function() {
        changeLang('val');
    });
});
