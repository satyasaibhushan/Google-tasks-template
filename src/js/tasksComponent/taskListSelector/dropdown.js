import React from "react";
import "./taskListSelector.css";

class Dropdown extends React.Component {
  constructor() {
    super();

    this.state = {
      displayLists: false,
    };
  }

  componentDidMount() {
    let listMenu = document.getElementsByClassName("select-selected")[0];
    let listMenuSpan = listMenu.childNodes[0];
    document.addEventListener("click", e => {
      if (this.state.displayLists && e.target != listMenuSpan && e.target != listMenu)
        this.setState({ displayLists: false });
    });
  }

  render() {
    return (
      <div className="taskListSelector">
        <div
          className="select-selected"
          onClick={_ => this.setState({ displayLists: !this.state.displayLists })}
        >
          <span> {this.props.selectedList}</span>
        </div>
        <div
          className={this.state.displayLists ? "select-items open" : "select-items"}
          style={{ display: this.state.displayLists ? "block" : "none" }}
        >
          {this.props.listNames.map((list, i) => {
            return (
              <div
                key={i}
                onClick={_ => {
                  this.props.clickedList(i);
                  this.setState({ displayLists: false });
                }}
              >
                {list}
                {i == this.props.selectedListIndex ? (
                  <img src="../../images/tick.svg" className="selectedListIcon" alt="" />
                ) : (
                  ""
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Dropdown;