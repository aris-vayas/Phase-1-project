
        let url ='https://api.jikan.moe/v3/search/anime?q=naruto'

        let dataCardTemplate = document.querySelector("[data-template]");
        let dataContainer = document.querySelector("[data-container]");
        let searchInput = document.querySelector("[data-search]");
        let searchButton = document.querySelector("[search-btn]");
        let animeData = [];
        let formimage = 'https://cdn.myanimelist.net/images/anime/10/67631.jpg?s=d84468711f6c7b6c122e4822fb4ab805'

        searchButton.addEventListener("click", (e)=>{
            
            let inputValue = searchInput.value.toLowerCase();

            console.log(inputValue)
            let foundItem = animeData.find((item) => {
                return item.name.toLowerCase().includes(inputValue);
            })
            
          //  document.createElement("")
            console.log(foundItem)
            
            
        })

       
        searchInput.addEventListener("input", (e) => {
            const value = e.target.value.toLowerCase();
            console.log(value);

            animeData.forEach(anime => {
            const isVisible = anime.name.toLowerCase().includes(value) || anime.image.toLowerCase().includes(value)
            anime.el.classList.toggle("hide", !isVisible);
            })

        })
        
        
     
        fetch('https://api.jikan.moe/v3/search/anime?q=naruto')
        .then(res=>res.json())
        .then(data=> {
            console.log(data.results);
             animeData = data.results.map(element => {
                const card = dataCardTemplate.content.cloneNode(true).children[0];
                const header = card.querySelector("[data-name]")
                const bodyImg = card.querySelector("[data-img]")
                const button = card.querySelector("[data-btn]")    
                header.textContent = element.title;
                bodyImg.src = element.image_url;
                button.textContent = " Like ❤️ ";
                dataContainer.append(card);
                
                return { name: element.title, image: element.image_url, el: card }
             })
            })
        function renderForm(){
            let formContainer = document.querySelector('body')
            let form = document.createElement('form')
            let nameInput = document.createElement('input')
            //let comment = document.createElement('input')
            let dateInput=document.createElement('input')
            let companyInput=document.createElement('input')
            let submitBtn = document.createElement('button')
            formContainer.id ='form-container'
            nameInput.placeholder= 'enter anime Name'
            //dateInput.placeholder= 'enter name of Episode'
            submitBtn.textContent= 'SUBMIT'
            dateInput.placeholder= 'Enter date'
            //comment.placeholder='Enter Comment Here'
            companyInput.placeholder =' who was there?'
            submitBtn.type = 'input'
            form.id= 'form'
            nameInput.name = 'name'
            companyInput.name ='company'
            dateInput.name = 'date'
        
        //form css
            form.append(dateInput,nameInput,companyInput,submitBtn)
            formContainer.append(form)
            form.addEventListener('submit',(e)=>{
                e.preventDefault()
               console.log( e.target.name.value)
               console.log( e.target.date.value)
               console.log( e.target.company.value)
               
                 const formObj={
                     name: e.target.name.value,
                     date: e.target.date.value,
                     who: e.target.company.value,
                     image: formimage
                     //placeholder image
                     //value of "current" from search
                     // just the not hidden
             }
             console.log(formObj)
             generateReview(formObj)
             form.reset()
            })
        }
        renderForm()
        //I want to be able to take the class name 'name' that is fed from
        // our above search feature add take the img from that
        //after we get the img we will layer on the name, the date 
        //we watched it, comments about our memory of the event
        //i will also carry the like button from above with class 'btn'
        //take my object from above and add all into the html together

        function generateReview(formObj){
            //build out a new card with all NEW elements
            //query select 
            let divData = document.querySelector('.card')
            let name = divData.querySelector('.name')
            let date = document.createElement('h2')
            let memory= document.createElement('p')
            let image= document.querySelector('.anime-avatar')
            let btn = document.querySelector('.btn')
            console.log(image)
            memory.textContent = formObj.who
            name.textContent= formObj.name
            image.src= formObj.image
            date.textContent=formObj.date
            
            
            
            divData.append(name,image,memory,date,btn)
           
            




        }