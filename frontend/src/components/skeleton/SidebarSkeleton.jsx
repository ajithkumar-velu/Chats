import { useMessageStore } from '../../store/messageStore'

const SidebarSkeleton = () => {
    const { selectedUser } = useMessageStore()
    const mapSidebar = Array(10).fill(null)
    return (
        <div className={`w-full md:w-64 bg-base-300 overflow-hidden rounded-box ${selectedUser ? "hidden md:block" : ""}`} >

            <div className="flex flex-col gap-4 pt-2 w-full">
                {
                    mapSidebar.map((user, idx) => (


                        <div key={idx} className="flex items-center px-4 py-1  bg-base-200">
                            <div className="skeleton h-16 w-16 shrink-0 rounded-full"></div>
                            <div className="flex flex-col gap-4">
                                <div className="skeleton h-4 w-28"></div>
                                <div className="skeleton h-4 w-20"></div>
                            </div>
                        </div>


                    ))
                }

            </div>

        </div>
    )
}

export default SidebarSkeleton