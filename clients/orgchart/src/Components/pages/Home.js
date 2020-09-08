import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Container } from "react-bootstrap";
import ReactGA from "react-ga";

// import useSetGuide from "../../hooks/useSetGuide";
import { loadUser, loadJwtUser } from "../../actions/userActions";
import Topbar from "../layout/Topbar";
import ControlPanel from "../controls/ControlPanel";
import OrgChart from "../charts/OrgChart";
import Checklist from "../tooltips/Checklist";
import Guide from "../tooltips/Guide";
import setTokenHeader from "../../utils/setTokenHeader";
import Loading from "../layout/Loading";

const Home = ({ user, loadUser, loadJwtUser }) => {
  useEffect(() => {
    const jwtToken = localStorage.getItem("JWT_TOKEN");
    if (jwtToken) {
      setTokenHeader(jwtToken);
      loadJwtUser();
    } else {
      loadUser();
    }
  }, []);

  // useSetGuide();

  useEffect(() => {
    ReactGA.initialize("UA-175053486-1");
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);

  return (
    <div className="app-home">
      <Loading />
      <Topbar user={user} />
      <ControlPanel />
      <Container fluid>
        <OrgChart />
        {/* <Checklist /> */}
        <Guide />
      </Container>
    </div>
  );
};

const mapStateToProps = ({ user }) => ({ user });

export default connect(mapStateToProps, { loadUser, loadJwtUser })(Home);
