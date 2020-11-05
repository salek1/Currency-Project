class RequestError extends Error{

    constructor(msg){
        super()
        this.name = 'Request Error'
        this.message = msg
    }
}