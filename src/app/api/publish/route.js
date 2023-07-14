import jwt from 'jsonwebtoken';
import {prisma} from '../../db'
import { cookies } from 'next/headers';


const isAuthorized = (token) => {
    if(!token) return new Response(JSON.stringify({error : 'Auth Failed'}));
    let result = true;

    jwt.verify(token, 
               process.env.JWT_SECRET_KEY.toString(),
               async(err, decodedToken) => {
                    if(err){
                        console.log(err.message);
                        result = false;
                        // res.json({isAuthorized : false, unauthorized: true, message : err.message});
                    }
                });
                
    return result;
}

export async function POST(req){
    const body = await req.json();
    console.log(body);
    const cookie = req.cookies.get('jwt');
    const token = cookie.value;

    const auth = isAuthorized(token);
    console.log(auth);
    if(!auth) return new Response(JSON.stringify({error : 'Auth Failed'}));
    const username = JSON.parse(atob(token.split('.')[1])).username;

    const creatorId = await prisma.user.findUnique({where : {username},
                                                    select : {id : true}
                                                    });

    console.log(creatorId);
    if(!creatorId) return;

    await prisma.blog.create({data : {
                                        blogname : body.title,
                                        blogdata : body.markup,
                                        creatorId :  creatorId.id
                                    }})

    const response = new Response(JSON.stringify({result : 'Saved Blog'}));
    cookies().set('user', username);

    return response;

}