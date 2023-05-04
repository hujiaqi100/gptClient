
const apiFetch = (path, openai) => {
    const list = [
        {
            path: '/chat',
            apiMethod: (msg) => openai.createChatCompletion(msg)
        }
    ]
    return list.find(d => d.path == path)?.apiMethod
}
module.exports = { apiFetch }