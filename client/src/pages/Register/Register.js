import Button from '../../components/Shared/Button';
import Input from '../../components/Shared/Input';
import { setError, setMessage } from '../../actions/messageActions'
import { connect } from 'react-redux';
import { Spinner } from 'react-bootstrap';
import registerLogic from '../../hoc/registerLogic';

const Register = ({
  onClickSubmit,
  onChangeInput,
  isLoading,
}) => {
  return (
    <form method="post">
      <h1>Register</h1>

      <Input
        id="email"
        type="text"
        name="email"
        title="Email:"
        onChange={onChangeInput}
      />

      <Input
        id="password"
        type="password"
        name="password"
        title="Password:"
        onChange={onChangeInput}
      />

      <Input
        id="repeatPassword"
        type="password"
        name="repeatPassword"
        title="Repeat Password:"
        onChange={onChangeInput}
      />
      {isLoading
        ? (
          <Button name="Loading...">
            <Spinner
              as="span"
              animation="grow"
              size="sm"
              role="status"
              aria-hidden="true"
            />
          </Button>
        )
        : <Button name="Sign Up" onClick={onClickSubmit} />
      }

    </form>
  )
}

const RegisterComponent = registerLogic(Register);

const mapStateToProps = (state) => ({
  user: state.user,
})

const mapDispatchToProps = {
  setError,
  setMessage,
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterComponent);
