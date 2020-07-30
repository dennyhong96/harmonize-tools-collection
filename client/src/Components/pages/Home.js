import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Container } from "react-bootstrap";

import { loadUser } from "../../actions/userActions";
import Topbar from "../layout/Topbar";
import ControlPanel from "../controls/ControlPanel";
import OrgChart from "../charts/OrgChart";

const Home = ({ user, loadUser }) => {
  useEffect(() => {
    loadUser();
  }, []);

  return (
    <div className="app-home">
      <Topbar user={user} />
      <ControlPanel />
      <Container fluid>
        <OrgChart />
      </Container>
    </div>
  );
};

const mapStateToProps = ({ user }) => ({ user });

export default connect(mapStateToProps, { loadUser })(Home);
