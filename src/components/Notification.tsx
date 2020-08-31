import React from "react";
import { useSelector } from "react-redux";
import ReactNotification, { store, ReactNotificationOptions } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";

import { StoreState, SingleTableState } from "types";

const useErrorNotifications = (order: SingleTableState<any>, ref: React.MutableRefObject<any>) => {
  // console.log("%c useErrorNotifications invoked", "color: pink");
  // console.log("%c ref in useErrorNotifications", "color: pink", ref);

  return React.useEffect(() => {
    if (ref.current) return;

    const notificationId = store.addNotification({
      title: order.error!.name,
      message: order.error!.message,
      type: "danger",
      insert: "top",
      container: "top-right",
      animationIn: ["animated", "fadeIn"],
      animationOut: ["animated", "fadeOut"],
      dismiss: {
        duration: 5000,
        onScreen: true,
        pauseOnHover: true,
        click: true,
      },
    });
    return () => store.removeNotification(notificationId);
  }, [order.error, ref]);
};

function Notification() {
  const { order } = useSelector((state: StoreState) => state);

  /**
   * using references as below allows us to use useEffect
   * the same way as a component lifecycle method in a class based component
   * This way it mimics componentDidUpdate()
   */

  const prevOrder = React.useRef(order.content);
  const firstUpdate = React.useRef(true);

  useErrorNotifications(order, firstUpdate);

  // effect to display successfully placed orders
  React.useEffect(() => {
    // this makes `useEffect` behave like componentDidUpdate()
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }

    // this creates a previous order object for further diffing
    if (!prevOrder.current.length) prevOrder.current = order.content;

    // only render if a new order was accepted by bitmex api
    const lastOrder = order.content[order.content.length - 1];

    // prevents notification to be rendered when:
    // when canceled order has been cleared
    // there is no order
    // there was no order on previous render
    // prevOrder length equals order length. This is the case when orders are set and the page gets reloaded
    // self explaining
    // workingIndicator of an order is initially false, so don't render notification
    if (
      prevOrder.current.length > order.content.length ||
      !order.content.length ||
      !lastOrder ||
      prevOrder.current.length === order.content.length ||
      lastOrder.ordStatus === "Rejected" ||
      lastOrder.workingIndicator === false
    )
      return;

    // renders a notification when a new order was placed in the orderbook
    const { side, orderQty, price, symbol } = lastOrder;

    const notificationOptions: ReactNotificationOptions = {
      title: "",
      message: "",
      type: "success",
      insert: "top",
      container: "top-right",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: { duration: 5000, onScreen: true, pauseOnHover: true },
    };

    notificationOptions.title = `Order Submitted`;
    notificationOptions.message = `${side} ${orderQty} Contracts of ${symbol} @ ${price}`;

    const successId = store.addNotification(notificationOptions);

    return () => store.removeNotification(successId);
  }, [order.content]);

  return (
    <React.Fragment>
      <ReactNotification />
    </React.Fragment>
  );
}

export default Notification;
