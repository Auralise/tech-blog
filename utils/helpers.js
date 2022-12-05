const format_post = (postContent) => {

    const splitContent = postContent.split("\n\n");

    const cleanedContent = [];

    splitContent.forEach(paragraph => {
        if (paragraph.trim().length > 0){
            cleanedContent.push(paragraph);
        }
    })

    return `<p> ${cleanedContent.map(para => para.trim()).join("</p>\n<p>")}</p>`;

}

const format_date = (createdDate, updatedDate) => {
    const cDate = new Date(createdDate);
    const uDate = new Date(updatedDate);
    
    const day = `0${cDate.getDate()}`.slice(-2);
    const month = `0${cDate.getMonth()+1}`.slice(-2);
    const year = cDate.getFullYear();

    const hour = `0${cDate.getHours()}`.slice(-2);
    const minute = `0${cDate.getMinutes()}`.slice(-2);
    
    if (cDate.getTime() != uDate.getTime()){
        return `${day}-${month}-${year} ${hour}:${minute} <em>(edited)</em>`
    } else {
        return `${day}-${month}-${year} ${hour}:${minute}`
    }

}

const isUser = (userId, contentUserId) => userId === contentUserId ? true : false;

module.exports = {format_post, format_date, isUser}  ;