let apiUrl ='https://api.jikan.moe/v3/search/anime?q=naruto';
let jsonServer = "http://localhost:3000/animeData";

let dataCardTemplate = document.querySelector("[data-template]");
let dataContainer = document.querySelector("[data-container]");
let viewPort = document.querySelector("[view-port]")
let searchInput = document.querySelector("[data-search]");
let searchButton = document.querySelector("[search-btn]");
let animeData = [];
const newViewport = document.createElement("div");
const newDivContainer = document.createElement("div");
const divCards = document.createElement("div");
const newH2 = document.createElement("h2");
const newImg = document.createElement("img");
let rate = document.createElement("span");
let score = document.createElement("p");
let epi = document.createElement("p");

searchBtn();     

//5. Enter will also work for search btn
searchInput.addEventListener("keyup", (e) => {
    if(e.keyCode === 13) {
        e.preventDefault();
        searchButton.click();
    }
})

//4. Search btn gets clicked then details of the anime will populate the page
function searchBtn() {
    searchButton.addEventListener("click", (e)=>{
        let foundItem = ""
        let inputValue = searchInput.value.toLowerCase();
    
        let clicked = animeData.find((item) => {
            return item.name.toLowerCase().includes(inputValue);
        })
        
        foundItem = clicked;

        newDivContainer.className = "anime-new-cards";
        divCards.className = "newcard";
        newH2.className = "new-name";
        newImg.className = "new-anime-avatar";
        newViewport.className = "new-view-port";

        let clickedName = foundItem.name;
        let clickedImage = foundItem.image;
        let clickedRate = `Rated: ${foundItem.rate}`;
        let clickedScoring = `Score: ${foundItem.scoring}`;
        let clickedEpisode = `# of Episodes: ${foundItem.episode}`;
        
        newH2.textContent = clickedName;
        newImg.src = clickedImage; 
        rate.textContent = clickedRate;
        score.textContent = clickedScoring;
        epi.textContent = clickedEpisode;

        
        divCards.append(newH2, newImg, score, rate, epi)

        newDivContainer.append(divCards);

        newViewport.append(newDivContainer); 
        
        document.getElementById("form").after(newViewport);
        
        addForm(foundItem);
    })

}

//3. Search the anime that includes the characters user put in search input
searchInput.addEventListener("input", (e) => {
    const value = e.target.value.toLowerCase();
    
    animeData.forEach(anime => {
    const isVisible = anime.name.toLowerCase().includes(value) || anime.image.toLowerCase().includes(value)

    anime.el.classList.toggle("hide", !isVisible);
    })
})

//3. made function that displaying form when loading
function formDisplay() {
    let formContainer = document.querySelector('body')
    let form = document.createElement('form')
    let nameInput = document.createElement('input')
    let dateInput=document.createElement('input')
    let companyInput=document.createElement('input')
    let submitBtn = document.createElement('button')
    
    nameInput.className = "formInput"
    dateInput.className = "formInput"
    companyInput.className = "formWhoInput"
    submitBtn.className = "formBtn"

    formContainer.id ='form-container'
    nameInput.placeholder= 'enter anime Name'
    submitBtn.textContent= 'SUBMIT'
    dateInput.placeholder= 'Enter date'
    companyInput.placeholder =' who was there?'
    submitBtn.type = 'input'
    form.id= 'form'
    nameInput.name = 'name'
    companyInput.name ='company'
    dateInput.name = 'date'

    form.append(dateInput,nameInput,companyInput,submitBtn)

    formContainer.append(form)
}

//1.get data from the Anime API Server
fetch(apiUrl)
.then(res=>res.json())
.then(data=> {
//2. Iterating each element objects in data array and copy the data that we want in animeData using map
    animeData = data.results.map(element => {
    
        const card = dataCardTemplate.content.cloneNode(true).children[0]; // we content inside of template, and clone the node and passe true  meaning clone contents of tags inside of template tag // return to document fragment gets return
        const header = card.querySelector("[data-name]")
        const bodyImg = card.querySelector("[data-img]")
        const button = card.querySelector("[data-btn]")    
        header.textContent = element.title;
        bodyImg.src = element.image_url;
        dataContainer.append(card);
        
        return { 
                name: element.title, image: element.image_url, el: card, 
                enddate: element["end_date"], rate: element.rated, scoring: element.score, 
                episode: element.episodes
        }
    })
    //2. form display
    formDisplay();
})
.catch(err => console.log(err));

//10. Handling like button & patch the data in json server
function likeButton(btn, resp){
    if(resp.like === true){
        resp.like = false;
        btn.target.textContent = ' Like ♡ '
    } else {
        resp.like = true;
        btn.target.textContent=" Like ❤️ "
    } 

    let idData = resp.id;

    let newLikes = {
        "like": resp.like
    }
    
    fetch(`${jsonServer}/${idData}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify(newLikes)
    })
    .then(responseData => responseData.json())
    .then(responseData => console.log(responseData))
}

//8. Form input infomration posted in json server get populated on page when sumbitted
function newCard(resp) {
    console.log(resp)
    let newDiv = document.createElement('div')
    let name = document.createElement('h2')
    let newTitle = document.createElement('h1')
    let date = document.createElement('h2')
    let memory= document.createElement('p')
    let image= document.createElement('img')
    let btn = document.createElement('button')
    
    newTitle.textContent = resp.animeTitle;
    newDiv.className = "Card";
    memory.textContent = resp.who
    name.textContent= resp.name
    image.src= resp.image
    date.textContent= resp.date
    btn.id= 'like-button'

    if(resp.like === true) {
        btn.textContent = " Like ❤️ "
    } else {
        btn.textContent = " Like ♡ "
    }
   
    //9. adding event listener to like button
    btn.addEventListener('click',(e)=>{
        likeButton(e, resp)   
        })

    newDiv.append(name, image, memory, date, btn)
    document.querySelector('body').append(newDiv);
}

//6. Adding event listener to form
function addForm(clickedData) {
    
    form.addEventListener('submit',(e)=>{
        e.preventDefault();
        
        clickedData;
        let formObj = {
                "name": e.target.name.value,
                "date": e.target.date.value,
                "who": e.target.company.value,
                "image": clickedData.image,
                "animeTitle": clickedData.name,
                "like": true
        }
    // 7. posting the new form input data to json server
    fetch(jsonServer, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify(formObj)
    })
    .then(resp => resp.json())
    .then(resp => newCard(resp)) //passing the data that we updated in json server to populate the page
    .catch(err => console.log(err))
        location.reload();
        form.reset()
    })
}

//11. Get saved anime like from json server to stay on the page.
fetch(jsonServer)
.then(r => r.json())
.then(r => r.forEach(elt => {
    newCard(elt);
    })
)
