const dummy =(blogs) => {
    return 1
}
const totalLikes=(blogs) => {
    if(blogs.length === 0){
        return 0
    }
    else if(blogs.length === 1){
        return blogs[0].likes
    }
    const totalLikes=blogs.reduce((total,blogItem) => {
        return total + blogItem.likes
    },0)

    return totalLikes
}
const favoriteBlog=(blogs) => {
    const favoriteBlog=blogs.reduce((requiredItem,listItem) => (listItem.likes > requiredItem.likes ? listItem:requiredItem))
    const {_id,url,__v,...requiredBlog}=favoriteBlog

    return requiredBlog
}

module.exports={dummy,totalLikes,favoriteBlog}