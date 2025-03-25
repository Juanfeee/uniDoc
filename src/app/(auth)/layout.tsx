
export const layout = ({ children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <div className="h-screen flex items-center justify-center">{children}</div>
    </>
  )
}
export default layout