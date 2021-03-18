import React, { useContext } from 'react'
import styled from 'styled-components'
import { Link, NavLink } from 'react-router-dom'
import { device } from 'style/responsive'
import { MenuContext } from 'contexts/MenuContext'
import { motion, useAnimation } from 'framer-motion'
import { ReactComponent as Close } from 'assets/Close.svg'
import { ReactComponent as LogoIcon } from 'assets/Logo.svg'
import { ReactComponent as Plus } from 'assets/Plus.svg'
import { ReactComponent as ClockIcon } from 'assets/Clock.svg'
import { ReactComponent as EditIcon } from 'assets/Edit.svg'
import { ReactComponent as GlobeIcon } from 'assets/Globe.svg'

const NavMenu = () => {
  const menuCtx = useContext(MenuContext)

  const animation = useAnimation()

  async function rotatePlus() {
    await animation.start({ rotate: 360 })
  }

  return (
    <Nav className={`${menuCtx.isMenuOpen ? 'menu--active' : ''}`}>
      <Container>
        {window.matchMedia(device.tablet) && (
          <CloseMenu onClick={menuCtx.toggleMenu}>
            <Close width={12} height={12} />
          </CloseMenu>
        )}
        <Logo>
          <Link to="/">
            <LogoIcon width={120} />
          </Link>
        </Logo>

        <MenuItems>
          <StyledNavLink onClick={menuCtx.toggleMenu} to="/new-trip">
            <NewTrip
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              whileHover={{
                scale: 1.05,
                boxShadow: '2px 2px 5px rgba(0,0,0,0.5)',
              }}
            >
              New Trip
              {/* <PlusClass animate={animation}> */}
              <Plus width={16} height={16} />
              {/* </PlusClass> */}
            </NewTrip>
          </StyledNavLink>

          <MenuItem animate={{ x: [-200, 10, 0], transition: { duration: 1 } }}>
            <StyledNavLink onClick={menuCtx.toggleMenu} to={`/`}>
              <IconWrap>
                <ClockIcon width={16} height={16} />
              </IconWrap>
              Your trips
            </StyledNavLink>
          </MenuItem>

          <MenuItem
            animate={{
              x: [-200, 10, 0],
              transition: { duration: 1, delay: 0.2 },
            }}
          >
            <NonClickableLink onClick={menuCtx.toggleMenu}>
              <IconWrap>
                <EditIcon width={16} height={16} />
              </IconWrap>
              Future feature
            </NonClickableLink>
          </MenuItem>

          <MenuItem
            animate={{
              x: [-200, 10, 0],
              transition: { duration: 1, delay: 0.3 },
            }}
          >
            <NonClickableLink onClick={menuCtx.toggleMenu}>
              <IconWrap>
                <GlobeIcon width={16} height={16} />
              </IconWrap>
              Future section
            </NonClickableLink>
          </MenuItem>
        </MenuItems>
      </Container>
    </Nav>
  )
}

export default NavMenu

const Nav = styled.nav`
  font-size: 1.6rem;
  min-width: 260px;
  height: 180vh;
  color: black;
  background-color: var(--grey);

  @media ${device.tablet} {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 99999;
    width: 100%;
    display: none;

    &.menu--active {
      display: block;
    }
  }
`

const CloseMenu = styled.span`
  width: 40px;
  height: 40px;
  background: #f1f1f2;
  border-radius: 10px;
  position: absolute;
  left: 40px;
  top: 40px;
  z-index: 99999;
  align-items: center;
  justify-content: center;
  display: none;

  @media ${device.tablet} {
    display: flex;
  }
`

const Container = styled.div`
  padding: 4rem;
`

const Logo = styled.div`
  margin-bottom: 30px;

  @media ${device.tablet} {
    display: flex;
    justify-content: center;
  }
`

const NewTrip = styled(motion.div)`
  flex: 1;
  display: flex;
  background-color: var(--accent);
  font-weight: 600;
  padding: 1.4rem 2rem;
  border-radius: 10px;
  line-height: 2rem;
  margin-bottom: 3rem;
  cursor: pointer;

  svg {
    margin-left: auto;
  }

  a {
    font-size: 1.4rem;
    color: black;
    font-weight: 600;
  }
`

const IconWrap = styled.div`
  display: flex;
  width: 24px;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
`

const MenuItems = styled.ul``
const MenuItem = styled(motion.li)`
  margin: 20px 0;
  cursor: pointer;
`

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  color: black;
  display: flex;
  align-items: center;
  font-size: 1.6rem;
  flex: 1;
  color: #000000;
`

const NonClickableLink = styled.span`
  text-decoration: none;
  color: black;
  display: flex;
  align-items: center;
  font-size: 1.6rem;
  flex: 1;
  color: #97999b;
  opacity: 0.5;
`
const PlusClass = styled(motion.div)`
  color: black;
`
