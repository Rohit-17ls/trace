import Footer from "@/app/Components/Footer";
import Navbar from "@/app/Components/Navbar";
import {prisma} from '../../db';
import BlogServe from "@/app/Components/BlogServe";

export default async function Page({params}){
    console.log(params);
    const blogname = params.blogName.split('-').join(' ').replace('%24', '$');
    console.log('Blog Name : ', blogname);

    const blogData = await prisma.blog.findUnique({where : {blogname},
                                                   select : {
                                                        blogdata : true,
                                                        createdAt : true,
                                                        creator : {
                                                            select : {
                                                                username : true,
                                                            }
                                                        },
                                                  }
                                                });

        console.log('Blog Data : ', blogData);
        let markup;
        try{
            const markupSplit = blogData.blogdata.split('</h1>');
            const dateString = new Date(blogData.createdAt).toLocaleString();
            const creatorName = blogData.creator?.username;
            const dateMarkup = markupSplit[0].concat(`</h1><div class="w-[75%] my-[3vh] text-gray-500 text-md text-right">by <b>${creatorName}</b>, ${dateString}</div>`);
            markup = dateMarkup.concat(markupSplit.slice(1,).join(''));
        }catch(err){
            console.log(err);
            // markup = blogData.blogdata;
            markup = '';
        }

        


    return(
        <section className = "flex flex-col justify-between min-h-[100vh]">
            <Navbar/>

            {markup ? 
                <section className="mb-auto">
                    <BlogServe markup={markup}/>

                </section>
                :
                <div className="w-[80%] text-lg text-center">
                    <strong>404</strong> | Blog not found
                </div>    
            }
            
            
            <section className="fixed bg-cardbg min-w-[250px] w-[20vw] h-[60vh] p-2 left-[78%] bottom-[15vh] lg:hidden card-shadow">
                <strong className="block text-center text-2xl font-semibold">Recommended</strong>
            
            </section>


            <Footer/>
        </section>
    )
}