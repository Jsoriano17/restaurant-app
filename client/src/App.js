import React from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import MenuForm from "./components/MenuForm";
import Menu from "./components/Menu";
import { Container } from "semantic-ui-react";

export default class App extends React.Component {
  state = {
    menus: [],
    loadMenuError: false,
    errorStatusCode: null,
    loading: true
  };

  addMenu = menu => {
    console.log(menu);

    axios
      .post("api/menus", {

        name: menu.name,
        complete: menu.complete
      })
      .then(res => {
        console.log(res);
        const newArray = [res.data, ...this.state.menus];
        this.setState({
          menus: newArray
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
  updateMenu = (menuFromForm, id) => {
    axios
      .put(`api/menus/${id}`, {
        name: menuFromForm.name,
        complete: menuFromForm.complete
      })
      .then(res => {
        const newArray = this.state.menus.map(currentMenu => {
          if (currentMenu.id != id) return currentMenu;
          return { ...currentMenu, ...menuFromForm };
        });
        this.setState({
          menus: newArray
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
  renderMenus() {
    if (this.state.loading) {
      return "loading";
    }
    if (this.state.loadMenuError) {
      return (
        <>
          <h1 style={{ color: "red" }}>Error</h1>
          <p>status Code: {this.state.errorStatusCode}</p>
        </>
      );
    }
    return this.state.menus.map(menu => {
      return (
        <Menu
          key={`menu-${menu.id}`}
          {...menu}
          updateMenuProp={this.updateMenu}
        />
      );
    });
  }
  componentDidMount() {
    console.log("get data here");
    axios
      .get("api/menus")
      .then(res => {
        // success
        this.setState({
          loading: false,
          menus: res.data,
          errorStatusCode: res.status
        });
      })
      .catch(err => {
        console.log(err);
        this.setState({
          loading: false,
          loadMenuError: true,
          errorStatusCode: err.toString()
        });
      });
  }
  render() {
    return (
      <Container>
        <MenuForm addMenuProp={this.addMenu} />
        {this.renderMenus()}
      </Container>
    );
  }
}
