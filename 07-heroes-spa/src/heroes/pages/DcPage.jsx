import { HeroList } from "../"

export const DcPage = () => {

  const publisher = 'DC Comics'
  
  return (
    <>
        <h1>{publisher}</h1>
        <hr />

        <HeroList publisher={publisher} />
    </>
  )
}
