import React, { useState } from "react";
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from "reactstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Form, Input } from "semantic-ui-react";
import "./NavMenu.css";
import { useTranslation } from "react-i18next";

export function NavMenu(props) {
  const [collapsed, setCollapsed] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  const toggleNavbar = () => {
    setCollapsed(!collapsed);
  };

  const handleChange = (e, control) => {
    switch (control.name) {
      case "searchKeyword":
        setSearchKeyword(control.value);
        break;
      default:
        break;
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setSearchKeyword("");
    navigate(`/inventory?keyword=${searchKeyword}`, { replace: true });
  };

  return (
    <header>
      <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" light>
        <Container className={"binner-container"}>
          <NavbarBrand tag={Link} to="/">{t("app_name")}</NavbarBrand>
          <NavbarToggler onClick={toggleNavbar} className="mr-2" />
          <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!collapsed} navbar>
            <Form onSubmit={onSubmit}>
              <ul className="navbar-nav flex-grow">
                <NavItem>
                  <Input
                    icon={{ name: "search", circular: true, link: true, onClick: onSubmit }}
                    size="mini"
                    placeholder={t("search")}
                    onChange={handleChange}
                    value={searchKeyword}
                    name="searchKeyword"
                  />
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/">
                    {t("home")}
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/inventory/add">
                    {t("add_inventory")}
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/import">
                    {t("order_import")}
                  </NavLink>
                </NavItem>
              </ul>
            </Form>
          </Collapse>
        </Container>
      </Navbar>
    </header>
  );
}
