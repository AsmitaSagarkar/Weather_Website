const mobilenav = document.querySelector(".mobilenav");
const navbar = document.querySelector(".navbar");

toggle =()=>{
    navbar.classList.toggle("active");
}
mobilenav.addEventListener("click", ()=>{
    toggle();
});