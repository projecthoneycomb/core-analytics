import React from "react";
import { Card } from "antd";

const DashboardItem = ({ children, title, description }) => {
  let styles = {
    height: "100%",
    width: "100%"
  }

  return <Card
    title={title}
    style={styles}
  >
    <p>{description}</p>
    {children}
  </Card>
};

export default DashboardItem;
