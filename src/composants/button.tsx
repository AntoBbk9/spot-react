interface ButtonProps {
    children: string;
    color: 'primary' | 'secondary';
}

function Button({children, color}:ButtonProps) {
    let bgColor=''
    if(color === 'secondary'){
        bgColor = 'bg-white border border-1 border-black mt-4'
    }else if(color ==='primary'){
        bgColor = 'bg-yellow-500 border border-1 border-yellow-500 mt-1'
    }
  return (
    <div>
        <button className={`rounded-md px-3 p-2 w-60 ${bgColor}`}>{children}</button>
    </div>
  )
}

export default Button