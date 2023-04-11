// import { Fragment} from 'react'
import PropTypes from 'prop-types';

const newMessage = {
  message: 'Hola Mundo',
  name: 'Mauricio'
};

const getResult = (a, b) => {
  return a + b;
}

export const FirstApp = ( { title, subTitle, name} ) => {

  // if(!title) {
  //   throw new Error('El title no existe')
  // }

  return (
    <>
      <h1> { title } </h1>
      {/* <h1> { getResult(1,3) } </h1> */}
      {/* <code>{ JSON.stringify(newMessage)}</code> */}
      <p>{ subTitle }</p>
      <p>{ name }</p>
    </>
  )
}

FirstApp.propTypes = {
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string
}

FirstApp.defaultProps = {
  title: 'No hay titulo',
  subTitle: 'No hay subtitulo',
  name: 'Mauricio Murua'
}
