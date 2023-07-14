import Footer from "@/app/Components/Footer";
import Navbar from "@/app/Components/Navbar";

export default function SuggestedWords(){
    return(
        <section className="flex flex-col justify-between min-h-[100vh]">
            <Navbar/>
            <section class="bg-cardbg w-[80%] h-fit m-auto px-[50px] py-4 card-shadow flex flex-col justify-evenly gap-2">
                <strong className="block suggestion-color text-3xl font-semibold">How does 'suggested words' work?</strong>
                <p>
                    You've probably rolled out a text field at this point and started to write out a
                    sentence for your blog and all of a sudden you notice this tab hovering above
                    with the label <b>Suggested Words</b> and a bunch of words beside it.
                </p>
                <p>This is a tiny feature to help provide the writer with words during the
                    course of blogging. The words suggested by this tool are often really
                    vague and far too obvious for the most part. This is a feature which will
                    see improvement sooner.
                </p>

                <strong className="block font-semibold text-lg my-[20px]">But how does it work?</strong>
                <p>At the moment, the  words are basically computed in browser via 
                    dot product similarity using weights from a word embedding. The word
                    embedding itself is very minimal and contains weights for a handful of the most 
                    commonly used words in data science. As for the embedding weights, 
                    they were trained on a simple neural network on a small corpus of
                    data.
                </p>
            </section>

            <Footer/>
        </section>
    )
}