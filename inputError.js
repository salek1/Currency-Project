class InputError extends Error{

    constructor(msg){
        super()
        this.name = 'Input Error'
        this.message = msg
    }
}