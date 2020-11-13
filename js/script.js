const userkey = "645652c410cdfbe69299e21c3dd25d14";
const baseUrl = "https://developers.zomato.com/api/v2.1/";
const baseEndPoin = `${baseUrl}categories`;
const res_id = "res_id=16507624";
const menuEndPoin =`${baseUrl}/dailymenu?${res_id}`;
const contents = document.querySelector("#content-list");
const title = document.querySelector(".card-title");

const fetchHeader = {
    headers: {
        'X-Zomato-API-Key': userkey
    }
};
function getListcategori() {
    title.innerHTML = "Daftar Categories"
    fetch(baseEndPoin, fetchHeader)
        .then(response => response.json())
        .then(resJson => {
            console.log(resJson.categories);
            let  categories = "";
            resJson.categories.forEach(categori => {
                categories += `
                <li class="collection-item avatar">
                <span class="title">${categori.categories.id}</span>
                    <p >nama :${categori.categories.name}</p>
                    <a href="#!" class="secondary-content"><i class="material-icons">info</i></a>
                </li>
                    `
                });
                contents.innerHTML = '<ul class="collection">' + categories +'</ul>'
               
            }).catch(err => {
                console.error(err);
            })
}
function getListdailymenu() {
    title.innerHTML = "Daftar Daily Menus"
    fetch(menuEndPoin, fetchHeader)
        .then(response => response.json())
        .then(resJson => {
            console.log(resJson.daily_menus);
            let  daily_menus = "";
            resJson.daily_menus.forEach(Daily_menu => {
                daily_menus += `
                <li class="collection-item avatar">
                <span class="title">${Daily_menu.daily_menu.daily_menu_id}</span>
                <p >nama :${Daily_menu.daily_menu.name}</p>
                <p >Start Date :${Daily_menu.daily_menu.start_date}</p>
                </li>
                    `
                });
                contents.innerHTML = '<ul class="collection">' + daily_menus +'</ul>'
               
            }).catch(err => {
                console.error(err);
            })
}

function loadPage(page) {
    switch (page) {
        case "categories":
            getListcategori();
            break;
        case "daily_menus":
            getListdailymenu();
            break;    
    }
}
document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems);

    document.querySelectorAll(".sidenav a, .topnav a").forEach(elm => {
        elm.addEventListener("click", evt => {
            let sideNav = document.querySelector(".sidenav");
            M.Sidenav.getInstance(sideNav).close();
            page = evt.target.getAttribute("href").substr(1);
            loadPage(page);
        })
    })
    var page = window.location.hash.substr(1);
    if (page === "" || page === "!") page = "categories";
    loadPage(page);
});
