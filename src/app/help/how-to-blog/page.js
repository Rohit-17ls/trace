import Footer from "@/app/Components/Footer";
import Navbar from "../../Components/Navbar";

export default function HelpBlog(){
    return (
        <section className="flex flex-col justify-between min-h-[100vh]">
            <Navbar/>
            <section class="bg-cardbg w-[80%] h-fit m-auto px-[50px] py-4 card-shadow">
                <strong class="text-2xl block my-4">How to create a new blog?</strong>
                <ul>
                    <li>
                        <div>
                        <p><strong>Shortcuts</strong></p>
                        <ol className="mx-[5%]">
                            <li><strong>Alt+h</strong> for a new subheading.</li>
                            <li><strong>Alt+t</strong> for a new text block.</li>
                            <li><strong>Alt+i</strong> for a new image.</li>
                        </ol>
                        </div>
                    
                    </li>
                    <li>
                        To add an image, use <strong>Alt+i</strong> and double click the placeholder
                        image to open up an input field where you can drop the desired image's URL.
                    </li>
                    <li>You can use the preview button to preview the blog.</li>
                    <li>Ideally, you'd want to set up the layout before starting out the blog to prevent unexpected layout anomalies.</li>
                    <li>Publish the blog once you are done, a link to it will appear in your profile.</li>
                </ul>
            </section>
            <Footer/>
        </section>
        
    )
}
