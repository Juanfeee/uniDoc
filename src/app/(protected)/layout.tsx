import Header from "../componentes/header";

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
    <Header />
    < main className = "px-4 sm:px-8" >
      <div>{ children } </div>
      </main>
      < footer > </footer>
      </>
  )
}
export default layout