import PropTypes from 'prop-types';
import MyContext from './context';

export default function DeliveryProvider({ children }) {
  const contextObj = 'aqui fica o objeto que precisar';

  return (
    <MyContext.Provider value={ contextObj }>
      {children}
    </MyContext.Provider>
  );
}

DeliveryProvider.propTypes = ({
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
});

DeliveryProvider.defaultProps = ({
  children: {},
});
