import Image from 'next/image'

const Logo = () => {
    return (
        <div className="relative group cursor-pointer overflow-hidden">
            <Image
                src="/logo.svg"
                alt="logo"
                width={105}
                height={32}
                className="object-cover"
            />
        </div>
    )
}

export default Logo