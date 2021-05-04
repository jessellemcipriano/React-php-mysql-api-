
const requests = {
    "horarios": "http://127.0.0.1:8000/api/resp"
}

const request = async (method: "GET"|"POST",url: "horarios",body: object, verbose: boolean) => {
    try {
        let reqUrl = requests[url]
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
        
        let json = await resp.json()
        console.log(json)
        return {"ok": false, "data": "batata"}

        if (resp.status == 202)
            return  {"ok": true, "data": resp.json()}
        else
            return {"ok": false, "data": "alguma coisa"}
    } catch (ex) {
        console.log(ex)
        return {"ok": false, "data": ex.toString()}
    }
}

export default request