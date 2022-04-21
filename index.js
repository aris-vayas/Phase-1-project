//Fetch anime from API
//renderInput (click)
//identify anime character somewohw and get from API
//render image from anime API
//renderForm() 
//renderOurcollection (like toytale/ booklist)
        //ener like
        //listener event for like 

        let url ='https://api.jikan.moe/v3/search/anime?q=naruto'

        let dataCardTemplate = document.querySelector("[data-template]");
        let dataContainer = document.querySelector("[data-container]");
        let viewPort = document.querySelector("[view-port]")
        let searchInput = document.querySelector("[data-search]");
        let searchButton = document.querySelector("[search-btn]");
        let animeData = [];

        searchBtn()

        function searchBtn() {
            searchButton.addEventListener("click", (e)=>{
                
                let inputValue = searchInput.value.toLowerCase();
                
               
                let foundItem = animeData.find((item) => {
                    return item.name.toLowerCase().includes(inputValue);
                })

                console.log(foundItem)
                
                addForm(foundItem);
                
                viewPort.remove();
                
                const newViewport = document.createElement("div");
                const newDivContainer = document.createElement("div");
                const divCards = document.createElement("div");
                const newH2 = document.createElement("h2");
                const newImg = document.createElement("img");
                let rate = document.createElement("span");
                let score = document.createElement("p");
                let epi = document.createElement("p");

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
                
                document.querySelector("body").append(newViewport);
            })
    
        }

        searchInput.addEventListener("input", (e) => {
            const value = e.target.value.toLowerCase();

            animeData.forEach(anime => {
            const isVisible = anime.name.toLowerCase().includes(value) || anime.image.toLowerCase().includes(value)
            anime.el.classList.toggle("hide", !isVisible);
            })
        })
        //1.get data from the Anime API Server
        fetch('https://api.jikan.moe/v3/search/anime?q=naruto')
        .then(res=>res.json())
        .then(data=> {
            //2. Iterating each element objects in data array and grab tmep and copy the data that we want in animeData using map
             animeData = data.results.map(element => {
            
                const card = dataCardTemplate.content.cloneNode(true).children[0]; // we content inside of template, and clone the node and passe true  meaning clone contents of tags inside of template tag // return to document fragment gets return
                const header = card.querySelector("[data-name]")
                const bodyImg = card.querySelector("[data-img]")
                const button = card.querySelector("[data-btn]")    
                header.textContent = element.title;
                bodyImg.src = element.image_url;
                //button.textContent = " Like ❤️ ";
                dataContainer.append(card);
                
                return { 
                    name: element.title, image: element.image_url, el: card, 
                    enddate: element["end_date"], rate: element.rated, scoring: element.score, 
                    episode: element.episodes
                }
             })
             console.log(data.results)
             console.log(animeData);
        })
        .catch(err => console.log(err));
        
            let formContainer = document.querySelector('body')
            let form = document.createElement('form')
            let nameInput = document.createElement('input')
          
            let dateInput=document.createElement('input')
            let companyInput=document.createElement('input')
            let submitBtn = document.createElement('button')
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
        
        //form css
        function addForm(clickedData) {

            form.addEventListener('submit',(e)=>{
                e.preventDefault()
                //empty singleCard

               console.log( e.target.name.value)
               console.log( e.target.date.value)
               console.log( e.target.company.value)
               
                 const formObj={
                     name: e.target.name.value,
                     date: e.target.date.value,
                     who: e.target.company.value,
                     image: clickedData.image
                     //placeholder image
                     //value of "current" from search
                     // just the not hidden
             }
             console.log(formObj)
             newCard(formObj)
             form.reset()
            })
        }
        
       
        
        //I want to be able to take the class name 'name' that is fed from
        // our above search feature add take the img from that
        //after we get the img we will layer on the name, the date 
        //we watched it, comments about our memory of the event
        //i will also carry the like button from above with class 'btn'
        //take my object from above and add all into the html together

        function newCard(formObj){
            //build out a new card with all NEW elements
            //query select 
        
            let newDiv = document.createElement('div')
            let name = document.createElement('h2')
            let date = document.createElement('h2')
            let memory= document.createElement('p')
            let image= document.createElement('img')
            let btn = document.createElement('button')
            console.log(image)
            memory.textContent = formObj.who
            name.textContent= formObj.name
            image.src= formObj.image
            date.textContent=formObj.date
            btn.id= 'like-button'
            btn.textContent = " Like ❤️ "
            btn.addEventListener('click',(e)=>{
               likeButton(e)
               
                })
            newDiv.append(name,image,memory,date,btn)
            document.querySelector('body').append(newDiv)

        }

        function likeButton(btn){
           // let likeBtn = document.querySelector('#like-button')
           // console.log(likeBtn)
            if (btn.target.textContent===" Like ❤️ "){

                btn.target.textContent= 'Like'
                 }
            else if (btn.target.textContent=='Like'){
                btn.target.textContent=" Like ❤️ "
            }
        }