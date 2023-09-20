export default {
    login: {
        username:  'input[name="username"]',
        password: 'input[name="password"]',
        submit: 'input[type="submit"]',
    },
    title: 'h1.title'
}

export type HomepageType = {
    login: {
        username: string,
        password: string,
        submit: string,
    }
    title: string
}