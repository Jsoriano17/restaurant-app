import React from "react";
import { Button, Card } from "semantic-ui-react";
import MenuForm from "./MenuForm";

export default class Menu extends React.Component {
  state = {
    showForm: false
  };

  showForm() {
    return (
      <MenuForm
        updateMenuProp={this.props.updateMenuProp} 
        name={this.props.name}
        id={this.props.id}
        completed={this.props.completed}
      />
    );
  }
  showMenu() {
    return (
      <>
        <Card.Meta content={this.props.id} />
        <Card.Description content={this.props.name} />
      </>
    );
  }
  toggleForm = e => {
    this.setState({
      showForm: !this.state.showForm
    });
  };
  render() {
    return (
      <Card>
        <Card.Content>
          {this.state.showForm ? this.showForm() : this.showMenu()}
          <Button onClick={this.toggleForm}>
            {this.state.showForm ? "hide form" : "edit"}
          </Button>
          <Button>Delete</Button>
        </Card.Content>
      </Card>
    );
  }
}
