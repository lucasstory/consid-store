const posts = [
    {
        id: 3,
        title: "Checken soup",
        publishDate: "2022-01-03",
        author: "Lucas",
        excerpt: "Chicken soup is one of my favorite foods. It is easy and cheap to make",
        content: "Lorems dsdfsdf  sdfsdfsd fsdfsd sdf sdfs dfsd fdsf sdf sdfsd fds f",
        slug: "chicken-soup"
    }
]

export function getAllPosts() {
    return posts
}

export function getAllSlugs() {
    let slugs = []
    getAllPosts().map(p => slugs.push(`/products/${p.slug}`))
    return slugs
}

export function getPostData(slug) {
    let post = null
    getAllPosts().map((p) => {
        if (p.slug === slug) {
            post = p
            return
        }
    })
    return post
}