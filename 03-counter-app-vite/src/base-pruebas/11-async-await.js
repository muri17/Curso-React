export const getImagen = async() => {

    try {

        const apiKey = 'k9gLggxt0wvIxecUCRNU15zm1vkt86SU';
        const resp   = await fetch(`http://api.giphy.com/v1/gifs/random?api_key=${ apiKey }`);
        const { data } = await resp.json(); 

        const { url } = data.images.original;

   return url;

    } catch (error) {
        return 'No se encontro la imagen'
    }
    
    
    
}

 getImagen();



