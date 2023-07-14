import BlogCanvas from "@/app/Components/BlogTools/BlogCanvas";
import Footer from "@/app/Components/Footer";
import Navbar from "@/app/Components/Navbar";

export default function NewBlog(){

    return(

        <section className="flex flex-col justify-between min-h-[100vh]">
            <Navbar/>
            <BlogCanvas/>
            <Footer/>
        </section>
    )

}