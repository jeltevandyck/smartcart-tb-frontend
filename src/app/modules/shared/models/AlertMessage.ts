export class AlertMessage {
    type: string
    message: string
    duration: number = 4

    constructor(type: string, message: string) {
        this.type = type
        this.message = message
    }
}