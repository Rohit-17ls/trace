import Footer from "@/app/Components/Footer";
import Navbar from "@/app/Components/Navbar";
import {prisma} from '../../db';
import Link from "next/link";

export default async function Page({params}){

    const username = params.username;
    let isUserFound = true;

    const userData = await prisma.user.findUnique({where : {username},
                                                   select : {id : true, createdAt : true}});
    if(!userData) isUserFound = false;
    
    let blogs;
    if(userData){
        console.log(userData)
    
        blogs = await prisma.blog.findMany({where : {creatorId : userData.id}, select : {blogname : true, createdAt : true}});
    }
    

    return(

        <section className="flex flex-col justify-between min-h-[100vh]">
            <Navbar/>
            {
                isUserFound ? 

                <section className="mb-auto mx-[5vw]">
                    <strong className="block text-2xl font-semibold">{params.username}</strong>
                    <strong className="block text-xl my-[5vh]">Blogs</strong>

                    {blogs.map((blog, ind) => 
                        <nav className="nav-link font-semibold my-[1vh]" key={ind}>
                            <Link href={`blogs/${blog.blogname.split(' ').join('-')}`} target='_blank'>{blog.blogname}</Link></nav>
                    )}
                
                </section>

                : 

                <div className="text-lg">
                    <strong>404</strong> User not found
                </div>
            }

            <Footer/>
        </section>
    )
    

}