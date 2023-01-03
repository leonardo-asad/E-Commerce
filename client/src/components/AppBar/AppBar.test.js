import { render, screen } from "@testing-library/react";
import ButtonAppBar from "./AppBar";
import { Provider } from 'react-redux';
import store from "../../store/store";
import {BrowserRouter as Router} from 'react-router-dom';

test("renders the app bar", () => {
  render(
    <Provider store={store}>
      <Router>
        <ButtonAppBar />
      </Router>
    </Provider>
  );
});
