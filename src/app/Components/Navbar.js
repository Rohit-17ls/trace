import Link from "next/link";

export default function Navbar(){
    return (
        <div className="sticky">
            <nav className="m-0 w-full nav mb-[2vh] h-[10vh] p-2 flex flex-row items-center justify-between">
            <strong className="px-[2%] text-3xl text-white">Trace</strong>
            <div className="flex flex-row justify-evenly gap-5 px-[5%]">
                <span className="nav-link font-semibold"><Link href='/blogs'>Blogs</Link></span>
                <span className="nav-link font-semibold"><Link href='/signin'>Signin</Link></span>
            </div>
        </nav>
        </div>
    )
}