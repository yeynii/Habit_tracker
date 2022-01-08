import React, { PureComponent } from "react";

class Navbar extends PureComponent {
  render() {
    return (
      <header>
        <i className="fas fa-leaf"></i>
        <span>Habit Tracker</span>
        <span className="active-count">{this.props.totalCount}</span>
      </header>
    );
  }
}

export default Navbar;
