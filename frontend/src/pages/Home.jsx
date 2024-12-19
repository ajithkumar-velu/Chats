import ChatContainer from "../components/ChatContainer"
import NoChatContainer from "../components/NoChatContainer"
import Sidebar from "../components/Sidebar"
import { useMessageStore } from "../store/messageStore.js";
const Home = () => {
  const { selectedUser } = useMessageStore()

  // console.log(selectedUser);

  return (
    <div className="md:p-2 p-2 md:pl-[74px] pt-[85px] flex gap-2 h-screen bg-red-300" >
      <Sidebar />
      {selectedUser ?
        <ChatContainer /> :
        <NoChatContainer />
      }

    </div>
  )
}

export default Home