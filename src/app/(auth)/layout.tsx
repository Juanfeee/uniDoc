
export const layout = ({ children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <div className="min-h-screen flex py-5 items-start justify-center">{children}</div>
    </>
  )
}
export default layout