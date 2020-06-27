axios.get('https://rickandmortyapi.com/api/character/')
    .then(function(response) {
        console.log(response);
    })
    .catch(function(error) {
        console.warn(error);
    });
