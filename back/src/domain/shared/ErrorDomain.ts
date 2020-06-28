export default class ErrorDomain extends Error {
    constructor(msg: string) {
        super(msg)
    }
}
