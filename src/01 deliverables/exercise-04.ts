console.log("************** DELIVERABLE 04 *********************");
type TBook = {
    title: string;
    isRead: boolean;
}

function isBookRead(books: TBook[], titleToSearch: string) {
    return books.some((book) => book.title === titleToSearch && book.isRead);
}