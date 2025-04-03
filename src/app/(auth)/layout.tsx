
export const layout = ({ children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <div className="min-h-screen flex items-center justify-center py-10">{children}</div>
    </>
  )
}
export default layout