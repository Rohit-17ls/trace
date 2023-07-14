export default function Input({type, name, placeholder}){
    return (
        <input type={type} 
               name={name} 
               placeholder={placeholder}
               className="rounded-2xl px-3 py-1 inline max-w-[300px] w-[60%] min-w-[200px] card-shadow bg-transparent"
               />
    )
}