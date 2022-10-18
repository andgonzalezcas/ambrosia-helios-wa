interface ISmallBox {
  children: JSX.Element
  title: string
  className?: string
}

const SmallBox = ({ children, className = '', title }: ISmallBox) => {
  return (
    <div className={'flex flex-col w-full h-full p-3 rounded-xl items-center text-white ' + className}>
      <h1 className="text-2xl font-bold">{title}</h1>
      {children}
    </div>
  )
}

export default SmallBox