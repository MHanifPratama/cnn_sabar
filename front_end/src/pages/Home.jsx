import CustomSidebar from "../components/CustomSidebar";

const Home = () => {
    return (
      <div className="flex dark:bg-gray-900">
                <CustomSidebar />
                <div className="w-full h-screen overflow-x-auto">
                </div>
            </div>            
    );
}

export default Home;
