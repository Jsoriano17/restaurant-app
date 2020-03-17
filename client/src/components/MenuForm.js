import React from "react";
import { Form, Button } from "semantic-ui-react";

export default class MenuForm extends React.Component {
  state = {
    name: this.props.name,
  };

  handleSubmit = event => {
    event.preventDefault();
    if(this.props.id){
      this.props.updateMenuProp(this.state, this.props.id )
    } else{
      this.props.addMenuProp(this.state)
    }
   
    this.setState({
      name:'',
    })
  };
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Input
          label="Menu"
          name="name"
          placeholder="enter a Menu"
          required
          onChange={this.handleChange}
          value={this.state.name}
        />
        <Button type="submit">Submit</Button>
      </Form>
    );
  }
}
