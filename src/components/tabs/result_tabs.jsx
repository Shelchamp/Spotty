import React from "react";

export default class ResultTabs extends React.Component {
  constructor(props) {
    super(props);
    this.state = { active: 0 };

    this.pickTab = this.pickTab.bind(this);
  }

  pickTab(num) {
    this.setState({ active: num });
  }
  render() {
    const tabs = this.props.tabs;
    const activeTab = tabs[this.state.active];
    return (
      <div>
        <Header tabs={tabs} active={this.state.active} pickTab={this.pickTab} />
        <article>{activeTab.results}</article>
      </div>
    );
  }
}

const Header = props => {
  const active = props.active;
  const pickTab = props.pickTab;
  const tabs = props.tabs.map((tab, i) => {
    const bold = active === i ? "bold" : "";
    return (
      <li
        className={`tab-title ${bold}`}
        key={i}
        onClick={() => {
          pickTab(i);
        }}
      >
        {tab.title}
      </li>
    );
  });
  return <ul className="title-container">{tabs}</ul>;
};
