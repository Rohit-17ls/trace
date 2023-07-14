'use client'

import Link from "next/link"
import Spinner from "../Spinner"

export default function BlogUtils({previewHandler, downloadHandler, publishHandler, isPublishing}){



    return (



<section className="fixed bg-cardbg min-w-[250px] w-[20vw] h-[60vh] p-2 left-[78%] bottom-[15vh] lg:hidden card-shadow">
	<strong className="text-2xl block text-center">Tools</strong>
	<ul className="flex flex-col list-disc justify-center align-start gap-4 my-[5vh] mx-2 px-3 text-md font-semibold">
		<li>
		
			<nav className="nav-link">
				<Link href="/help/how-to-blog" target="_blank" rel="noopener noreferrer">How to use?</Link>
			</nav>
		</li>
		<li>
		
			<nav className="nav-link">
				<Link href="/help/what-are-suggested-words" target="_blank" rel="noopener noreferrer">How does 'suggested words' work?</Link>
			</nav>
		</li>

		<li>
		
			<nav className="nav-link hover:cursor-pointer hover:opacity-90" onClick={previewHandler}>
				<span>Preview</span>
			</nav>
		</li>

		<li>
		
			<nav className="nav-link" onClick={downloadHandler}>
				<span>Download as Markup</span>
			</nav>
		</li>
		
	</ul>
	<div className="w-full flex justify-center">
		<button type="button"
				className="w-[80%] bg-buttonbg font-semibold px-3 py-1 rounded-2xl m-auto"
				onClick={publishHandler}>
			{isPublishing ? <Spinner type='small'/> : 'Publish Blog'}
		</button>
	</div>
</section>
    )
}