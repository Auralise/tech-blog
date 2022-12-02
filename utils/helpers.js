const format_post = (postContent) => {

    const splitContent = postContent.split("\n\n");

    const cleanedContent = [];

    splitContent.forEach(paragraph => {
        if (paragraph.trim().length > 0){
            cleanedContent.push(paragraph);
        }
    })

    return "<p>" + cleanedContent.map(para => para.trim()).join("</p>\n<p>") + "</p>";

}

module.exports = format_post;