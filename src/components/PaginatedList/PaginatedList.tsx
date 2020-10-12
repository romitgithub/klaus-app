import React from "react";

import styles from "./PaginatedList.module.css";

interface Props {
  perPage: number;
  data: any[];
  onHeaderRender: Function;
  onItemRender: Function;
  sortItems?: boolean;
  getSortedItems?: Function;
}

export default class EventsList extends React.Component<Props> {
  state = {
    page: 0,
  };

  getItems = () => {
    const { page } = this.state;
    const { perPage } = this.props;
    let items = this.props.data.slice(page * perPage, (page + 1) * perPage);
    if(this.props.sortItems && this.props.getSortedItems) {
      items = this.props.getSortedItems(items);
    }
    return items;
  };

  handleNextClick = () => {
    this.setState({ page: this.state.page + 1 });
  };

  handlePrevClick = () => {
    this.setState({ page: this.state.page - 1 });
  };

  isFirstPage = () => {
    return this.state.page === 0;
  };

  isLastPage = () => {
    const { perPage } = this.props;
    return (this.state.page + 1) * perPage > this.props.data.length;
  };

  render() {
    console.log(this.props);
    const items = this.getItems();
    return (
      <div className={styles.container}>
        <div className={styles.list}>
          {items.map((item: any, index) => this.props.onItemRender(item))}
        </div>
        <div className={styles.header}>{this.props.onHeaderRender(items)}</div>
        <div className={styles.pagination}>
          <button
            className={styles.paginationButtons}
            disabled={this.isFirstPage()}
            onClick={this.handlePrevClick}
          >
            Previous
          </button>
          <button
            className={styles.paginationButtons}
            disabled={this.isLastPage()}
            onClick={this.handleNextClick}
          >
            Next
          </button>
        </div>
      </div>
    );
  }
}
