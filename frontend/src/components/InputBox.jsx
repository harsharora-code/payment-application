export function InputBox({label, placeholder, onChange}) {
return (
    <div>
    <div className="text-rm font-m">
        {label}
        </div>
        <input onChange={onChange} placeholder={placeholder} className="w-full"/>
        </div>
)
}