import ProfileInfoForm from "@/forms/ProfileInfoForm"

const AccountInfoWrapper = () => {
    return (
        <div className="py-5 px-7 bg-white rounded-2xl max-w-[947px] mx-auto">
            <div className="flex flex-col gap-1">
                <h2 className=" text-background-dark font-semibold text-2xl">Account Information</h2>
                <div className="h-0.5 w-40 bg-brand-primary"></div>
            </div>
            <ProfileInfoForm />
        </div>
    )
}

export default AccountInfoWrapper