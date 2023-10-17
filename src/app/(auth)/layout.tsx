const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='bg-slate-200 p-10 rounded'>
            {children}
        </div>
    )
}

export default AuthLayout