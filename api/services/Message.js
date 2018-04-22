/**
 * 消息类
 * @param code 1:正常的成功消息，0:有异常的错误消息
 * @param message 消息
 * @param data 数据
 * @constructor
 */
class Message {

    constructor(code, message, data) {
        this.code = code;
        this.data = data;
        this.message = message;
    }

    /**
     * 消息类
     * @param {*} code 1:正常的成功消息，0:有异常的错误消息
     * @param {*} message
     * @param {*} data 
     */
    static messages(code, message, data) {
        this.code = code;
        this.message = message || '';
        this.data = data || null;
        return {
            code: this.code,
            message: this.message,
            data: this.data
        }
    }

}
module.exports = Message;