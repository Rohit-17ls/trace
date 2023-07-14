import crypto from 'crypto';
import {prisma} from '../db'
import { redirect } from 'next/navigation';
import { cookies } from 'next//headers';
import jwt from 'jsonwebtoken';

const getHash = (hashSource) => {
    const hmac = crypto.createHmac('sha256', process.env.PASSWORD_SECRET_KEY);
    hmac.update(hashSource);
    return hmac.digest('hex');
}

const createToken = (username) => {
    return jwt.sign({username}, process.env.JWT_SECRET_KEY.toString(), {expiresIn : 3*24*3600});
}

async function handleSignIn(authData){
    "use server"
    const username = authData.get('username')?.valueOf();
    const password = authData.get('password')?.valueOf();
    const hashedPassword = getHash(password);

    const userData = await prisma.user.findUnique({where : {username}});
    console.log(userData);

    if(getHash(password) !== userData.password){
        throw Error("Incorrect credentials");
    }

    const jwtToken = createToken(username);
    cookies().set({
        name : 'jwt',
        value : jwtToken,
        httpOnly: true,
        secure : true,
        path : '/',
        expiresIn : '3d'
    });

    cookies().set({
        name : 'user',
        value : username,
        httpOnly : false,
        secure : false,
        path : '/',
        expiresIn : '3d'
    });

    redirect(`/user/${username}`);
    
}



import Link from "next/link";
import Input from "../Components/Input";
import SubmitButton from "../Components/SubmitButton";


export default function Signin(){
    return(
        <div className="h-[100vh] w-[100vw] flex flex-row justify-center items-center">
            <div className="m-auto rounded-lg p-5 bg-cardbg card-shadow max-w-[550px] w-[35vw] min-w-[400px]">
                <strong className="text-2xl text-white block text-center my-[7vh]">Sign In</strong>
                <form action = {handleSignIn} className="flex flex-col justify-evenly items-center gap-[60px]">
                    <span className="w-full flex flex-row justify-center">
                        <label className="inline mx-3 font-semibold">Username : </label>
                        <Input type="text" name="username" placeholder={"Enter username"}/>
                    </span>

                    <span className="w-full flex flex-row justify-center">
                        <label className="inline mx-3 font-semibold">Password : </label>
                        <Input type="password" name="password" placeholder={"Enter password"}/>
                    </span>

                    <SubmitButton name="sign in"/>

                </form>

                <div className="mt-8 text-center text-defaultbg text-sm">Don't have an account?
                <span className="link"><Link href='/signup'>Sign up</Link></span></div>
            </div>
        </div>
    )
}