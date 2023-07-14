import { NextResponse } from "next/server";

// Route matcher for this middleware
export const config = {
    matcher : ['/blogs/:blogId*', '/user/:username*', '/api/:endpoint*']
}

// const getHash = (hashSource) => {
//     const hmac = createHmac('sha256', process.env.JWT_SECRET_KEY);
//     hmac.update(hashSource);
//     console.log(hmac.digest('hex'))
//     return hmac.digest('hex');
// }

// const verifyJWT = async (req, token) => {
//     try{
//         // const secret = process.env.JOSE_SECRET_KEY.toString();

//         let [alg, payload, hash] = token.split('.');
//         alg = atob(alg);
//         payload = atob(payload);
//         // console.log(alg, payload, hash);

//         const computedHash = getHash(alg.concat(payload));
//         console.log(computedHash);
        
        
//         return;

//         // if(status !== 'valid') return NextResponse.redirect(new URL(req.nextUrl.origin + '/signin'));
//         // const response = NextResponse.next();
//         // const username = JSON.parse(atob(token.split('.')[1])).username;
//         // response.cookies.set('user', username); 
//         // // return response;  
//         // return NextResponse.redirect(new URL(req.nextUrl.origin + '/signin'));
        
//     }catch(err){
//         return NextResponse.redirect(new URL(req.nextUrl.origin + '/signin'));
//     }
    
// }

export function middleware(req){
    const origin = req.nextUrl.origin;
    const cookie = req.cookies.get('jwt');

    if(!cookie){
       return NextResponse.redirect(new URL(origin + '/signin'));
    }
    
    // verifyJWT(req, cookie.value);

}