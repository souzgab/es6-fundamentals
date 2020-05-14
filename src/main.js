import api from './api'

class App {
    constructor() {
        this.repo = [];
        this.formEl = document.getElementById('repo-form');
        this.inputEl = document.querySelector('input[name=repository]')
        this.listEl = document.getElementById('repo-list');
        this.registerHandlers();
    }


    registerHandlers() {
        this.formEl.onsubmit = event => this.addRepository(event)
    }

    async addRepository(event){
        event.preventDefault();

        try{
            const repoInput = this.inputEl.value;

        if(!repoInput){
            return
        }

        const res = await api.get(`/repos/souzgab/${repoInput}`)

        console.log(res)

        const { name, description, html_url, owner: {avatar_url} } = res.data

        this.repo.push({
            name,
            description,
            avatar_url,
            html_url
        })

        this.inputEl.value = '';
        
        this.render();
        }catch(e){
            alert("This Repo doenst exists")
        }

    }

    render(){
        this.listEl.innerHTML = '';
        this.repo.forEach( repo => {
            let imgEl = document.createElement('img')
            imgEl.setAttribute('src', repo.avatar_url);

            let titleEl = document.createElement('strong')
            titleEl.appendChild(document.createTextNode(repo.name))

            let descEl = document.createElement('p')
            descEl.appendChild(document.createTextNode(repo.description))
            
            let linkEl = document.createElement('a')
            linkEl.setAttribute('target', '_blank')
            linkEl.setAttribute('href', repo.html_url)
            linkEl.appendChild(document.createTextNode("Acessar"))

            let listItemEl = document.createElement('li')
            listItemEl.appendChild(imgEl)
            listItemEl.appendChild(titleEl)
            listItemEl.appendChild(descEl)
            listItemEl.appendChild(linkEl)

            this.listEl.appendChild(listItemEl)
        })
    }
}

new App();