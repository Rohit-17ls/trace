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
    
    let blogs, joinDate;
    if(userData){
        console.log(userData)
        joinDate = new Date(userData.createdAt).toLocaleString();

        blogs = await prisma.blog.findMany({where : {creatorId : userData.id},
                                            select : {blogname : true,
                                                     createdAt : true},
                                            orderBy : {createdAt : 'desc'}});

        console.log(blogs);
    }
    

    return(

        <section className="flex flex-col justify-between min-h-[100vh]">
            <Navbar/>
            {
                isUserFound ? 

                <section className="mb-auto mx-[5vw]">
                    <div>
                        <strong className="text-3xl font-semibold">{username}</strong>
                        <span className="ml-[40vw] text-md text-gray-500">joined {joinDate}</span>
                    </div>
                    <strong className="block text-xl my-[5vh]">Blogs by {username} : </strong>

                    {blogs.map((blog, ind) => 
                        <nav className="nav-link font-semibold my-[1vh]" key={ind}>
                            <Link href={`/blogs/${blog.blogname.split(' ').join('-')}`} target='_blank'>{blog.blogname.replace('$', '-')}</Link></nav>
                    )}
                
                </section>

                : 

                <div className="w-[80%] text-lg text-center">
                    <strong>404</strong> User not found
                </div>
            }

            <Footer/>
        </section>
    )
    

}