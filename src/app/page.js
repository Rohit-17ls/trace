import Footer from "./Components/Footer";
import Navbar from "./Components/Navbar";


export default async function Home() {

  return (
    <main className="flex flex-col justify-between min-h-[100vh]">
      
      <Navbar/>
      <div className="py-9 w-[70%] px-[5%] bg-transparent text-white text-lg">
        Stoked to have you at <strong>Trace</strong>, join the community of
        hundreds of data science bloggers. If you think you don't have the
        time or resources to contribute, enjoy having a read of the blog
        posts created by the community.
      </div>

      <div className="mx-[5vw] my-[8vh] flex flex-col gap-8 items-center">
        <strong className="text-2xl font-semibold suggestion-color">
          Leverage the features to quickly create blogs on topics that interest you
        </strong>
        <img src='/home-blog-demo.jpg' 
             alt="home-blog-demo-img"
             className="scale-90 border-[1.5px] border-solid border-violet-700 strong-shadow rounded-lg"/>
      </div>

      <Footer/> 
    </main>
  )
}
