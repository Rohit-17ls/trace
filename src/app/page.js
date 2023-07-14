import Navbar from "./Components/Navbar";

export default function Home() {
  return (
    <main className="text-defaultfg">
      
      <Navbar/>
      <div className="py-9 w-[70%] px-[5%] bg-transparent text-white text-lg">
        Good to see you at <strong>Trace</strong>, join the community of
        hundreds of data science bloggers. If you think you don't have the
        time or resources to contribute, enjoy having a read of the blog
        posts created by the community.
        
      </div>
    </main>
  )
}
