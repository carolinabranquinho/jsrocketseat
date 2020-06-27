// class List {
//     constructor(){
//         this.data = [];
//     }

//     add(data){
//         this.data.push(data);
//         console.log(data);
//     }
// }

// class TodoList extends List {
//     constructor(){
//         super();
//         this.usuario = 'Carol'
//     }

// }

// const MinhaLista = new TodoList;

// document.getElementById('novotodo').onclick = function() {
//     MinhaLista.add('Novo Todo');
// }

// const usuario = {
//     nome: 'Carol',
//     idade: 24,
//     empresa: 'Inexistente'
// };

// const {nome, ...resto} = usuario;

// console.log(nome);
// console.log(resto);

//Exercícios

//1
// class Usuario {
//     constructor(email, senha){
//         this.email = email;
//         this.senha = senha;
//         this.admin = false;
//     }

//     isAdmin(){
//         return this.admin;
//     }
// }

// class Admin extends Usuario {
//     constructor(){
//         super();
//         this.admin = true;
//     }

// }

// const User1 = new Usuario('email@teste.com', '123');
// const Admin1 = new Admin('email@testeadmin.com', 'admin');

// console.log(User1.isAdmin());
// console.log(Admin1.isAdmin());

//2

// const usuarios = [
//     { nome: 'Diego', idade: 23, empresa: 'Rocketseat' },
//     { nome: 'Gabriel', idade: 15, empresa: 'Rocketseat' },
//     { nome: 'Lucas', idade: 30, empresa: 'Facebook' },
// ];

// const idades = usuarios.map(element => element.idade);
// console.log(idades);
// const empresa = usuarios.filter(element => element.empresa == 'Rocketseat');
// console.log(empresa);
// const func = usuarios.find(element => element.empresa == 'Google');
// console.log(func);
// const novos = usuarios.map(element => element.idade * 2 ).filter(element => element <= 50)
// console.log(novos);

// const arr = [1, 2, 3, 4, 5];
// const x = arr.map(item => item + 10);
// console.log(x);

// const usuario = { nome: 'Diego', idade: 23 };
// const idade = (usuario) => usuario.idade;
// console.log(idade(usuario));

// const user = (nome = 'Diego', idade = 18) => ( `${nome} ${idade}` ) ;

// console.log(user());
// console.log(user('Carol', 20));

// const promise = () => { 
//     return new Promise(function(resolve, reject) {
//     return resolve();
//     })
// }

// const empresa = {
//     nome: 'Rocketseat',
//     endereco: {
//     cidade: 'Rio do Sul',
//     estado: 'SC',
//     }
// };

// const {nome, endereco : { cidade }, endereco: {estado}} = empresa;

// console.log(nome, cidade, estado);


// function mostraInfo(usuario) {
//     const {nome, idade} = usuario;
//     return `${nome} tem ${idade} anos.`;
// }

// console.log(mostraInfo({ nome: 'Diego', idade: 23 }));

// const arr = [1, 2, 3, 4, 5, 6];

// const  [x, ...y] = arr;
// console.log(x);
// console.log(y);

// function soma (x, ...y){
//     const reducer = (total, next) => total+next
//     return x + y.reduce(reducer); 
// }

// console.log(soma(1, 2, 3, 4, 5, 6));
// console.log(soma(1, 2));

// const usuario = {
//     nome: 'Diego',
//     idade: 23,
//     endereco: {
//     cidade: 'Rio do Sul',
//     uf: 'SC',
//     pais: 'Brasil',
//     }
// };

// const usuario2 =  {...usuario, nome: 'Gabriel'};
// const usuario3 = {...usuario, cidade: 'Lontras'};
// console.log(usuario3);

// const nome = 'Diego';
// const idade = 23;
// const usuario = {
//  nome,
//  idade,
//  cidade: 'Rio do Sul',
// };

// console.log(usuario)

// import { soma, sub } from './funcoes';

// console.log(soma(1,2));

// console.log(sub(4,2));

// import ClasseUsuario, { idade as IdadeUsuario} from './functions';

// ClasseUsuario.info();
// console.log(IdadeUsuario);

// import axios  from 'axios';

// class Api {
//     static async getUserInfo(username) {
//         try{
//         const response = await axios.get(`https://api.github.com/users/${username}`);
//         console.log(response);
//         } catch(err){
//             console.warn('Erro na API');
//         }
//     }
// }

// Api.getUserInfo('carolinabranquinho');


// const delay = () => new Promise(resolve => setTimeout(resolve, 1000));

// async function umPorSegundo() {
//     await delay();
//     console.log('1s');
//     await delay();
//     console.log('2s');
//     await delay();
//     console.log('3s');
// }

// umPorSegundo();

// class Github {
//     static async getRepositories(repo) {
//         try{
//             const response = await axios.get(`https://api.github.com/repos/${repo}`)
//             console.log(response);
//         } catch(err){
//             console.log('Repositório não existe');
//         }
//     }
// }

// Github.getRepositories('rocketseat/rocketseat.com.br');
// Github.getRepositories('rocketseat/dslkvmskv');

import api from './api';

class App{
    constructor(){
        this.repositories = [];
        this.formEl = document.getElementById('repo-form');
        this.inputEl = document.querySelector('input[name=repository]');
        this.listEl = document.getElementById('repo-list');
        this.registerHandlers();
    }

    registerHandlers(){
        this.formEl.onsubmit = event => this.addRepository(event);
    }

    setLoading(loading = true){
        if(loading === true){
            let loadingEl = document.createElement('span');
            loadingEl.appendChild(document.createElement('Carregando'));
            loadingEl.setAttribute('id', 'loading');

            this.formEl.appendChild(loadingEl);
        }else{
            document.getElementById('loading').remove();
        }
    }

    async addRepository(event){
        event.preventDefault();

        const repoInput = this.inputEl.value;

        if(repoInput.length === 0){
            return;
        } 

        this.setLoading();

        try{
            const response = await api.get(`/repos/${repoInput}`);

            const { name, description, html_url, owner: { avatar_url } } = response.data;

            this.repositories.push({
                name,
                description,
                avatar_url,
                html_url,
            });
            this.inputEl.value = '';

            this.render();
        }catch(error){
            alert('Repositório não existe');
        }

        this.setLoading(false);
    }

    render(){
        this.listEl.innerHTML = '';

        this.repositories.forEach(repo =>{
            let imgEl = document.createElement('img');
            imgEl.setAttribute('src', repo.avatar_url);

            let titleEl = document.createElement('strong');
            titleEl.appendChild(document.createTextNode(repo.name));

            let descriptionEl = document.createElement('p');
            descriptionEl.appendChild(document.createTextNode(repo.description));

            let linkEl = document.createElement('a');
            linkEl.setAttribute('target', '_blank');
            linkEl.setAttribute('href', repo.html_url);
            linkEl.appendChild(document.createTextNode('Acessar'));

            let listItemEl = document.createElement('li');
            listItemEl.appendChild(imgEl);
            listItemEl.appendChild(titleEl);
            listItemEl.appendChild(descriptionEl);
            listItemEl.appendChild(linkEl);

            this.listEl.appendChild(listItemEl);

        })
    }
}

new App();