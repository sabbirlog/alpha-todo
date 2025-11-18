import Image from "next/image"

const AuthBanner = ({ image }: {
    image: string
}) => {
    return (
        <div className="bg-[#E2ECF8] h-dvh w-full flex items-center justify-center">
            <div className="relative w-[613px] h-[344px]">
                <Image
                    src={image ?? ""}
                    alt="auth form image"
                    fill
                    className="w-full h-auto"
                />
            </div>
        </div>
    )
}

export default AuthBanner