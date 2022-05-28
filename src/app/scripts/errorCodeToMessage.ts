export default function errorCodeToMessage(code: string) {
    code = code.split('/')[1]
    code = code.split('-').join(' ')
    code = code.charAt(0).toUpperCase() + code.slice(1)

    return code
}