export function chatMessageTime(data) {
    return new Date(data).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false
    })
}

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
  