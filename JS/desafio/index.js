var buttonElement = document.querySelector('#name button');
var listElement = document.querySelector('#repos ul');
var inputElement = document.querySelector('#name input');
var feedback = document.getElementById('feedback');
const url_init = 'https://api.github.com/users/';
const repo = '/repos';


function searchRepo () {
    var user = inputElement.value;
    var url = url_init+user+repo;
    inputElement.value = '';
    feedback.classList.remove('hidden');

    axios.get(url)
    .then(function(response) {
        for (var i = 0; i < (response.data).length; i++){
            var repoUrl = response.data[i].html_url;
            var nameRepo = response.data[i].full_name;

            var listItem = document.createElement('li');
            var listText = document.createTextNode('Repositório ' + (i+1) + ' ' + nameRepo);

            var linkElement = document.createElement('a');
            linkElement.setAttribute('href', repoUrl);
            linkElement.appendChild(listText);
            
            listItem.appendChild(linkElement);
            listElement.appendChild(listItem);
        }
        console.log(response);
    })
    .catch(function(error) {
        if (error == 'Error: Request failed with status code 404'){
         alert('Erro, Usuário não encontrado');   
        } else {
            alert(error);
        }
    })
    .then(() => {
        feedback.classList.add('hidden');
    });

}

