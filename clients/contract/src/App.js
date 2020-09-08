import React from "react";
import Header from "./components/UI/Header/Header";
import Navbar from "./components/UI/MainPageNavbar/Navbar";
import Footer from "./components/UI/Footer/Footer";
import { Switch, Route, Redirect } from "react-router-dom";
import { StateMachineProvider, createStore } from "little-state-machine";
import { DevTool } from "little-state-machine-devtools";
import useHeaderToggle from "./hooks/useHeaderToggle";
import useRedirect from "./hooks/useRedirect";
import useLoginSignup from "./hooks/useLoginSignup";
import useAuth from "./hooks/useAuth";

import UserContext from "./contexts/User";

import LandingPage from "./components/Pages/LandingPage/LandingPage";
import GetStarted from "./components/Pages/GetStarted/GetStarted";
import General from "./components/Pages/Form/General/General";
import Disclosing from "./components/Pages/Form/Disclosing/Disclosing";
import Recieving from "./components/Pages/Form/Recieving/Recieving";
import PartiesRelationship from "./components/Pages/Form/PartiesRelationship/PartiesRelationship";
import Confidentiality from "./components/Pages/Form/Confidentiality/Confidentiality";
import OtherInformation from "./components/Pages/Form/OtherInformation/OtherInformation";
import TimePeriod from "./components/Pages/Form/TimePeriod/TimePeriod";
import DownloadTO from "./components/Pages/Form/DownloadTo/DownloadTo";
import PDF from "./components/Pages/Form/PDF/PDF";
import Complete from "./components/Pages/Form/Complete/Complete";
import path from "./utils/path";
import Login from "./components/Pages/LoginSignup/Login";
import Signup from "./components/Pages/LoginSignup/Signup";

import Sidebar from "./components/Navigation/Sidebar";
import MainPage from "./components/Pages/MainPage/MainPage";

createStore({
  formDetails: {
    // Get Started
    iAm: "",
    lookingToCreate: "",

    // General
    formType: "",
    contractDate: "",
    state: "",

    // Disclosing Party
    discloserName: "",
    discloserBusiness: "",
    discloserEntity: "",
    discloserAddressStreet: "",
    discloserAddressStreet2: "",
    discloserAddressCity: "",
    discloserAddressState: "",
    discloserAddressZipcode: "",

    // Recipient
    recipientName: "",
    recipientEntity: "",
    recipientAddressStreet: "",
    recipientAddressStreet2: "",
    recipientAddressCity: "",
    recipientAddressState: "",
    recipientAddressZipcode: "",
    // recipientPhone: "",

    // relationship: "",
    disclosingToReceiving: "",
    receivingToDisclosing: "",

    // Confidentiality
    confidentialityAll: false,
    confidentiality_1: "",
    confidentiality_2: "",
    confidentiality_3: "",
    confidentiality_4: "",
    confidentiality_5: "",
    confidentiality_6: "",
    confidentiality_other: "",

    otherInformation: "",

    // Term
    timePeriod: "",
    terminationYears: "",
    terminationOccurence: "",
    terminationException: "",

    // DownloadTo
    downloadCompnay: "",
    downloadEmail: "",

    pdf: "",
  },
});

function App() {
  // Hook for toggling between 2 Navbars depends on what page user is on
  useRedirect();
  const isMainPageHeader = useHeaderToggle();
  const isLoginSignup = useLoginSignup();
  const [user, setUser] = useAuth();
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <StateMachineProvider>
        <DevTool />
        {isMainPageHeader ? <Navbar /> : !isLoginSignup ? <Header /> : null}
        {!isMainPageHeader && !isLoginSignup && <Sidebar />}

        <Switch>
          {/* <Route exact path="/" component={LandingPage} /> */}
          <Route exact path={path("/")} component={MainPage} />
          <Route exact path={path("/landing")} component={LandingPage} />
          <Route exact path={path("/getStarted")} component={GetStarted} />
          <Route exact path={path("/general")} component={General} />
          <Route exact path={path("/disclosing")} component={Disclosing} />
          <Route exact path={path("/recieving")} component={Recieving} />
          <Route
            exact
            path={path("/partiesRelationship")}
            component={PartiesRelationship}
          />
          <Route
            exact
            path={path("/confidentiality")}
            component={Confidentiality}
          />
          <Route
            exact
            path={path("/otherInformation")}
            component={OtherInformation}
          />
          <Route exact path={path("/timePeriod")} component={TimePeriod} />
          <Route exact path={path("/downloadTo")} component={DownloadTO} />
          <Route exact path={path("/pdf")} component={PDF} />
          <Route exact path={path("/complete")} component={Complete} />
          <Route exact path={path("/login")} component={Login} />
          <Route exact path={path("/signup")} component={Signup} />
          {process.env.NODE_ENV === "production" && (
            <Redirect from="/contract/*" to="/contract" />
          )}
        </Switch>
        <Footer />
      </StateMachineProvider>
    </UserContext.Provider>
  );
}

export default App;
