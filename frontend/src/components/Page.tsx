interface PageProps {
    children: React.ReactNode
}

export function Page({ children }: PageProps) {
    return (
        <div className="w-full max-w-296 mx-auto py-12 space-y-8">
            {children}
        </div>
    )
}