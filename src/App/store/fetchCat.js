async function fetchCat (){

    let resp = await fetch("https://cataas.com/cat?json=true", {})

    let data = await resp.json()
    let url = `https://cataas.com${data["url"]}`
    return url
// return Promise.resolve( "https://cataas.com/cat/6167c4e8412a9f0018729ee0")
}

export default fetchCat