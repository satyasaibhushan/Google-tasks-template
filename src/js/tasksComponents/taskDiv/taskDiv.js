import React from "react";
import "./taskDiv.css";

export class TaskDiv extends React.Component {
  constructor(props) {
    super();
    this.state = {
      icon: props.checkedList ? "tick" : "circle",
    };
    this.input = React.createRef();
    this.wholeDiv = React.createRef();
  }
  componentDidUpdate() {
    if (this.props.taskArrayElement.focus == true) {
      this.input.current.focus();
    }
    if (this.props.taskArrayElement.newlyAdded == true) {
      this.Animation(this.wholeDiv.current, "forward", 0.4, 0);
      setTimeout(() => {
        this.props.changeElementKey("newlyAdded");
      }, 300);
    }
    if (
      this.props.taskArrayElement.checked == true &&
      this.props.checkedList != true
    ) {
      this.removeAfterAnimation(this.wholeDiv.current,"checked", 0.25, 0.2);
    } else if (this.props.taskArrayElement.remove == true) {
      this.removeAfterAnimation(this.wholeDiv.current,"remove", 0.3, 0);
    }
    if (
      this.props.taskArrayElement.unchecked == true &&
      this.props.checkedList == true
    ) {
      this.removeAfterAnimation(this.wholeDiv.current,"unchecked", 0.25, 0.1);
    }
  }
  componentDidMount() {
    if (this.props.taskArrayElement.focus == true) {
      this.input.current.focus();
    }
  }
  updateTaskIcon() {
    if (this.state.icon == "circle") {
      return <div className="taskDivCheck"></div>;
    }
    if (this.state.icon == "tick") {
      return (
        <img
          src="../../images/tick.svg"
          alt="tick sign"
          className="taskDivTick"
        />
      );
    }
  }
  Animation(element, direction, time, delay) {
    if (direction == "forward")
      return TweenMax.fromTo(
        element,
        { height: 0, opacity: 0 },
        {
          duration: time,
          height: this.props.taskArrayElement.height,
          opacity: 1,
          delay: delay,
        }
      );
    else if (direction == "backward")
      return TweenMax.fromTo(
        element,
        { height: this.props.taskArrayElement.height, opacity: 1 },
        { duration: time, height: "0", opacity: 0, delay: delay }
      );
  }
  removeAfterAnimation(element,keyName, duration, delay) {
    this.Animation(element, "backward", duration, delay);
    setTimeout(() => {
      this.props.changeElementKey(keyName);
      if (element)
        this.Animation(element, "forward", 0.01);
    }, (duration + delay)*1000);
  }

  setIcon(mouseEnter) {
    if (this.props.taskArrayElement.unchecked == true) return;
    else if (
      this.props.taskArrayElement.checked == true &&
      this.props.checkedList == true
    )
      return this.setState({ icon: "tick" });
    else if (this.props.taskArrayElement.checked == true) return;
    else if (mouseEnter && this.state.icon == "circle")
      return this.setState({ icon: "tick" });
    else if (!mouseEnter && this.state.icon == "tick")
      return this.setState({ icon: "circle" });
  }
  setHeight(e) {
    e.target.style.height = "auto";
    e.target.style.height = e.target.scrollHeight + "px";
    if (e.target.clientHeight != this.props.taskArrayElement.height && !this.props.checkedList)
      this.props.setHeight(e.target.clientHeight + 22);
  }
  tickAnimation() {
    let animationDivs = (
      <div className="tickAnimtionDivs">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    );
    if (this.props.taskArrayElement.checked && !this.props.checkedList)
      return animationDivs;
  }

  render() {
    return (
      <div
        ref={this.wholeDiv}
        className={
          this.props.taskArrayElement.newlyAdded == true
            ? "taskDiv newElement"
            : "taskDiv"
        }
        style={{
          backgroundColor:
            this.props.taskArrayElement.focus == true
              ? " rgba(212, 211, 211, 0.1)"
              : "transparent",
          height: this.props.taskArrayElement.height,
        }}
      >
        <div
          className="taskIconContainer"
          onMouseOver={(_) => this.setIcon(true)}
          onMouseLeave={(_) => this.setIcon(false)}
          onClick={(_) => {
            if (!this.props.taskArrayElement.checked || this.props.checkedList)
              this.props.clickedTick();
          }}
        >
          <div
            className="taskDivCheck"
            style={{
              opacity: this.state.icon == "circle" ? 1 : 0,
              height: this.state.icon == "circle" ? "1.2rem" : 0,
            }}
          ></div>
          <img
            src="../../images/tick.svg"
            alt="tick sign"
            className="taskDivTick"
            style={{
              opacity: this.state.icon == "tick" ? 1 : 0,
              height: this.state.icon == "tick" ? "1.2rem" : 0,
            }}
          />
          {this.tickAnimation()}
        </div>
        <div
          className="taskInputContainer"
          onClick={(e) => this.props.changeElement(false, true)}
        >
          <textarea
            rows="1"
            type="text"
            ref={this.input}
            name=""
            value={this.props.taskArrayElement.value}
            readOnly={this.props.checkedList}
            onChange={(e) => {
              if (this.props.taskArrayElement.remove == true)
                e.preventDefault();
              else this.props.changeElement(e.target.value, true);
            }}
            onKeyDown={(e) => {
              if (this.props.taskArrayElement.remove == true)
                e.preventDefault();
              else this.props.manageTasks(e);
            }}
            className="textAreaTaskDiv"
            onFocusCapture={(e) => {
              this.props.changeElement(e.target.value, true);
              this.setHeight(e);
            }}
            onBlurCapture={(e) => {
              this.props.changeElement(e.target.value, false);
              this.setHeight(e);
            }}
            onInput={(e) => {
              this.setHeight(e);
            }}
            style={{
              textDecoration:
                this.props.taskArrayElement.checked == true
                  ? "line-through"
                  : "none",
              textDecoration:
                this.props.checkedList == true ? "line-through" : "none",
              height: this.props ? this.props.taskArrayElement.height - 22 : "",
            }}
          ></textarea>
        </div>
        <span
          className="bottomBorder"
          style={{
            transform:
              this.props.taskArrayElement.focus &&
              !this.props.taskArrayElement.newlyAdded
                ? "scaleX(1)"
                : "scaleX(0)",
            top: this.props.taskArrayElement.height,
          }}
        ></span>
      </div>
    );
  }
}
