import React from "react";

import styles from "./PaginatedList.module.css";

interface Props {
  page: number;
  perPage: number;
  data: any[];
  onHeaderRender: Function;
  onItemRender: Function;
  sortItems?: boolean;
  getSortedItems?: Function;
  updatePage: Function;
}

export default class EventsList extends React.Component<Props> {
  getItems = () => {
    const { page, perPage } = this.props;
    let items = this.props.data.slice(page * perPage, (page + 1) * perPage);
    if (this.props.sortItems && this.props.getSortedItems) {
      items = this.props.getSortedItems(items);
    }
    return items;
  };

  handleNextClick = () => {
    // this.setState({ page: this.state.page + 1 });
    const newPage = this.props.page + 1;
    this.props.updatePage(newPage);
  };

  handlePrevClick = () => {
    // this.setState({ page: this.state.page - 1 });
    const newPage = this.props.page - 1;
    this.props.updatePage(newPage);
  };

  isFirstPage = () => {
    return this.props.page === 0;
  };

  isLastPage = () => {
    const { page, perPage } = this.props;
    return (page + 1) * perPage >= this.props.data.length;
  };

  render() {
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
