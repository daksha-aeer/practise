async function getUserAndPosts() {
    try{
        const userResponse = await fetch("https://jsonplaceholder.typicode.com/users/1");
        const user = await userResponse.json();
        const postsResponse = await fetch("https://jsonplaceholder.typicode.com/posts?userId=1");
        const post = await postsResponse.json();
        // console.log(post);

        const object = {
            user: user,
            post: post
        }
        console.log(object)
        
    } catch (e) {
        console.log(e)
    }
}

async function getMultipleUsers() {
    try {
        const [user1, user2, user3] = await Promise.all([
            fetch("https://jsonplaceholder.typicode.com/users/1").then(r => r.json()),
            fetch("https://jsonplaceholder.typicode.com/users/2").then(r => r.json()),
            fetch("https://jsonplaceholder.typicode.com/users/3").then(r => r.json())
        ])
        const userArr = [user1, user2, user3]
        console.log(userArr)
    } catch (error) {
        console.log(error)
    }
}

async function getUsersWithPosts() {
    try {
        const userIds = [1,2,3];
        const users = await Promise.all(
            userIds.map(id => fetch(`https://jsonplaceholder.typicode.com/users/${id}`).then(r => r.json()))
        )

        // console.log(users)
        const usersWithPosts = await Promise.all(
            users.map(async (user) => {
                const posts = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${user.id}`).then(r => r.json());
                return { user, posts };
            }
            )
        )
        console.log(usersWithPosts)
    } catch (error) {
        console.log(error)
    }
}

async function getUserFeed() {
    try {
        const users = await fetch("https://jsonplaceholder.typicode.com/users").then(r => r.json());
        
        const data = await Promise.all(
            users.map(async (user) => {
                try {
                    const posts = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${user.id}`).then(r => r.json());
                    const todos = await fetch(`https://jsonplaceholder.typicode.com/todos?userId=${user.id}`).then(r => r.json());
                    return{id: user.id, name: user.name, postCount: posts.length, completedTodos: todos.filter(todos => todos.completed).length}
                } catch (error) {
                    console.log(error)
                }
                
            })
        )

        console.log(data)
    } catch (error) {
        console.log(error)
    }
}

getUserFeed()