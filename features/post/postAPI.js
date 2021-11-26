import axios from 'axios';

const content = [
    {
        imageUrl: 'user.png',
        name: 'Aliqa Macale',
        email: 'support@gmail.com',
        bgImage: 'https://picsum.photos/500/300',
    },
    {
        imageUrl: 'user.png',
        name: 'Hendrix Stamp',
        email: 'support@gmail.com',
        bgImage: 'https://picsum.photos/200/400',
    },
    {
        imageUrl: 'user.png',
        name: 'Stephen Grider',
        email: 'support@gmail.com',
        bgImage: 'https://picsum.photos/200',
    },
    {
        imageUrl: 'user.png',
        name: 'Mohannad Zitoun',
        email: 'support@gmail.com',
        bgImage: 'https://picsum.photos/200/300'
    },
    {
        imageUrl: 'user.png',
        name: 'Aliqa Macale',
        email: 'support@gmail.com',
        bgImage: 'https://picsum.photos/200/400',
    },
    {
        imageUrl: 'user.png',
        name: 'Surfiya Zakir',
        email: 'support@gmail.com',
        bgImage: 'https://picsum.photos/200/400',
    },
    {
        imageUrl: 'user.png',
        name: 'Aliqa Macale',
        email: 'support@gmail.com',
        bgImage: 'https://picsum.photos/200/300',
    },
    {
        imageUrl: 'user.png',
        name: 'Surfiya Zakir',
        email: 'support@gmail.com',
        bgImage: 'https://picsum.photos/200/300',
    },
    {
        imageUrl: 'user.png',
        name: 'Aliqa Macale',
        email: 'support@gmail.com',
        bgImage: 'https://picsum.photos/200/300',
    },
    {
        imageUrl: 'user.png',
        name: 'Surfiya Zakir',
        email: 'support@gmail.com',
        bgImage: 'https://picsum.photos/200/300',
    },
    {
        imageUrl: 'user.png',
        name: 'Aliqa Macale',
        email: 'support@gmail.com',
        bgImage: 'https://picsum.photos/500/300',
    },
    {
        imageUrl: 'user.png',
        name: 'Surfiya Zakir',
        email: 'support@gmail.com',
        bgImage: 'https://picsum.photos/400/600',
    },

]


export const getPosts = (query) => {
    return axios.get('http://localhost:3001/post').then(res => {
        return res.data
    }).catch(err => {
        //
    })
};

export const createPost = (data) => {
    return axios.post('http://localhost:3001/post',
        data,
        { headers: { "Content-Type": "multipart/form-data" } }).then(res => {
            return res.data
        }).catch(err => {
            //
        })
};

export default getPosts;