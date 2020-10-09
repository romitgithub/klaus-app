import React from "react";

import styles from "./PaginatedList.module.css";

interface Props {
  data: any[];
  onItemRender: Function;
}

export default class EventsList extends React.Component<Props> {
  state = {
    page: 0,
  };

  handleScroll = (event: any) => {
    if (
      event.target.offsetHeight + event.target.scrollTop ===
      event.target.scrollHeight
    ) {
      this.setState({ page: this.state.page + 1 });
    }
  };

  handleLoadMoreBtn = () => {
    this.setState({ page: this.state.page + 1 });
  };

  getItems = () => {
    const { page } = this.state;
    return this.props.data.slice(0, (page + 1) * 10);
  };

  render() {
    console.log(this.props);
    const items = this.getItems();
    return (
      <div className={styles.container} onScroll={this.handleScroll}>
        <div className={styles.list}>
          {items.map((item: any, index) => this.props.onItemRender(item))}
        </div>
        <button className={styles.loadMoreBtn} onClick={this.handleLoadMoreBtn}>
          Load More
        </button>
      </div>
    );
  }
}
