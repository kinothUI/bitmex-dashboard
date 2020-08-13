import React from "react";
import { useDispatch } from "react-redux";
import moment from "moment-timezone";
import "react-notifications-component/dist/theme.css";

import { CONNECT_WEBSOCKET } from "redux/actions/websocket";
import { FETCH_INSTRUMENT } from "redux/actions/instrument";
import { action } from "redux/actions";
import Layout from "components/Layout";
import { extractLanguage } from "helper";
import Notification from "components/Notification";

const App = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(action(CONNECT_WEBSOCKET));
    dispatch(action(FETCH_INSTRUMENT));

    const locale = extractLanguage(navigator.language);

    import(`moment/locale/${locale}`)
      .then(() => moment.locale(locale))
      .catch(() => moment.locale("en-EN"));
  }, [dispatch]);

  return (
    <React.Fragment>
      <Notification />
      <Layout />
    </React.Fragment>
  );
};

export default App;
