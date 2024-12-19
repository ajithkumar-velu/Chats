export const groupMessagesByDate = (messages) => {
    const groupedMessages = {};
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    messages.forEach((message) => {
        const messageDate = new Date(message.createdAt);

        let dateLabel;
        if (messageDate.toDateString() === today.toDateString()) {
            dateLabel = 'Today';
        } else if (messageDate.toDateString() === yesterday.toDateString()) {
            dateLabel = 'Yesterday';
        } else {
            dateLabel = messageDate.toLocaleDateString(); // Format as "MM/DD/YYYY" or locale
        }

        if (!groupedMessages[dateLabel]) {
            groupedMessages[dateLabel] = [];
        }
        groupedMessages[dateLabel].push(message);
    });

    return groupedMessages;
};
//   console.log(groupMessagesByDate([new Date()]))

const groupedMessages = {};
const today = new Date();
const yesterday = new Date();
yesterday.setDate(today.getDate() - 1);

console.log(new Date());

console.log(yesterday.toDateString());

const today = new Date();
let yesterday = new Date();
yesterday.setDate(today.getDate() - 1)