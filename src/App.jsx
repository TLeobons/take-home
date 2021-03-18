import { Switch, Route } from 'react-router-dom'
import styled from 'styled-components'

import NavMenu from 'components/NavMenu'
import MenuProvider from 'contexts/MenuContext'
import TripProvider from 'contexts/TripContext'

import NotFound from 'pages/404'
import NewTrip from 'pages/NewTrip'
import Trips from 'pages/Trips'
import EditTrip from 'pages/EditTrip'
import ViewTrip from 'pages/ViewTrip'

import { device } from 'style/responsive'
import GlobalStyle from 'style/global'
import DatePickerLeft from 'assets/DatePickerLeft.svg'
import DatePickerRight from 'assets/DatePickerRight.svg'
import GlobeIcon from 'assets/DropdownGlobe.svg'
import AustriaFlag from 'assets/flags/austria.svg'
import ChinaFlag from 'assets/flags/china.svg'
import FranceFlag from 'assets/flags/france.svg'
import GreeceFlag from 'assets/flags/greece.svg'
import ItalyFlag from 'assets/flags/italy.svg'
import NetherlandsFlag from 'assets/flags/netherlands.svg'
import PortgualFlag from 'assets/flags/portugal.svg'
import SlovakiaFlag from 'assets/flags/slovakia.svg'
import SpainFlag from 'assets/flags/spain.svg'
import SweedenFlag from 'assets/flags/spain.svg'
import UnitedKingdomFlag from 'assets/flags/united-kingdom.svg'

const flags = {
  globe: GlobeIcon,
  at: AustriaFlag,
  cn: ChinaFlag,
  fr: FranceFlag,
  gr: GreeceFlag,
  it: ItalyFlag,
  aw: NetherlandsFlag,
  pt: PortgualFlag,
  sk: SlovakiaFlag,
  es: SpainFlag,
  se: SweedenFlag,
  uk: UnitedKingdomFlag,
}

const Routing = () => (
  <Main>

    <Switch>
      <Route path="/new-trip" component={NewTrip} />
      <Route path="/edit-trip/:id" component={EditTrip} />
      <Route path="/view-trip/:id" component={ViewTrip} />
      <Route path="/" exact component={Trips} />
      <Route to="*" component={NotFound} />
    </Switch>

  </Main>
)

const App = () => {
  return (
    <MenuProvider>
      <Container className="App">
        <TripProvider>
          <GlobalStyle
            leftArrow={DatePickerLeft}
            rightArrow={DatePickerRight}
            flags={flags}
          />
          <NavMenu />
          <Routing />
        </TripProvider>
      </Container>
    </MenuProvider>
  )
}

export default App

const Container = styled.div`
  display: flex;
  grid-template-columns: 240px 1fr;
`

const Main = styled.main`
  width: 100%;
  display: flex;
  justify-content: center;

  @media ${device.mobileL} {
    padding: 0;
  }
`
