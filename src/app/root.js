import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import App from './containers/app';
import rootReducer from './reducers/index';

function mapStateToProps(state) {
    return state;
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(rootReducer, dispatch);
}

export default connect(mapStateToProps)(App);
