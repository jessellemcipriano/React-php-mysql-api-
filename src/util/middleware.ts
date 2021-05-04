
const requests = {
    "horarios": "http://127.0.0.1:8000/api/hours/",
    "dias": "http://127.0.0.1:8000/api/days/"
}

const request = async (method: "GET"|"POST",url: "horarios"|"dias", queryParams: string,body: object, verbose: boolean) => {
    try {
        let reqUrl = requests[url] + queryParams
        
        if (!reqUrl) return
        
        let resp = await fetch(reqUrl, {
            method,
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Authorization': 'Basic MjE4Mzk1MTQ6NDU0OTIzOTM3NDgxNGUyNjE5YWJlYjM5OGRhYzA0NWM='
            }
        })

        console.log("RESPOSTA ->" + resp)
        if (resp.status == 200)
            return  {"ok": true, "data": await resp.json()}
        else
            return {"ok": false, "data": await resp.text()}
    } catch (ex) {
        console.log(ex)
        return {"ok": false, "data": ex.toString()}
    }
}

export default request