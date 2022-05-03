function clearMenu(){
    document.getElementById("menu-home").classList.remove("current");
    // document.getElementById("menu-left-sidebar").classList.remove("current");
    // document.getElementById("menu-right-sidebar").classList.remove("current");
    document.getElementById("menu-shop").classList.remove("current");
    document.getElementById("menu-contact").classList.remove("current");
    // document.getElementById("menu-no-sidebar").classList.remove("current");

}
function currentMenu(id){
    document.getElementById(id).classList.add("current");
}



$(document).ready(function() {
    $(".menu-click").on("click",function(){
        clearMenu();
        currentMenu(this.id);
    });
});