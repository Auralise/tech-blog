const format_post = (postContent) => {

    const splitContent = postContent.split("\n\n");

    const cleanedContent = [];

    splitContent.forEach(paragraph => {
        if (paragraph.trim().length > 0){
            cleanedContent.push(paragraph);
        }
    })

    return `<div class="post-content"><p> ${cleanedContent.map(para => para.trim()).join("</p>\n<p>")}</p></div>`;

}

const format_date = (createdDate, updatedDate) => {
    const dateObj = new Date(createdDate);

    const day = `0${dateObj.getDate()}`.slice(-2);
    const month = `0${dateObj.getMonth()+1}`.slice(-2);
    const year = dateObj.getFullYear();

    const hour = `0${dateObj.getHours()}`.slice(-2);
    const minute = `0${dateObj.getMinutes()}`.slice(-2);
    
    if (createdDate != updatedDate){
        return `<p class="post-date">${day}-${month}-${year} ${hour}:${minute} <em>(edited)</em></p>`
    } else {
        return `<p class="post-date">${day}-${month}-${year} ${hour}:${minute}</p>`
    }

}

module.exports = {format_post, format_date}  ;