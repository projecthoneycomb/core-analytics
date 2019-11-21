import React from "react";
import { Col } from "antd";
import ChartRenderer from "../components/ChartRenderer";
import Dashboard from "../components/Dashboard";
import DashboardItem from "../components/DashboardItem";
const DashboardItems = [
  {
    id: 1,
    name: "Errors",
    vizState: {
      query: {
        measures: ["Error.count"],
        timeDimensions: [
          {
            dimension: "Error.sentAt",
            granularity: "hour",
            dateRange: "from 7 days ago to now"
          }
        ],
        dimensions: ["Error.contextName"],
        filters: [
          {
            dimension: "Error.contextEnvironment",
            operator: "equals",
            values: ["production"]
          }
        ]
      },
      chartType: "line",
    },
    format: "fullWidth"
  },
  {
    id: 2,
    name: "App Opens w/ Versions",
    vizState: {
      query: {
        filters: [
          {
            dimension: "Tracks.contextEnvironment",
            operator: "equals",
            values: ["production"]
          },
          {
            dimension: "Tracks.event",
            operator: "contains",
            values: ["open"]
          },
          {
            dimension: "Tracks.event",
            operator: "notContains",
            values: ["first"]
          }
        ],
        measures: ["Tracks.count"],
        timeDimensions: [
          {
            dimension: "Tracks.originalTimestamp",
            granularity: "hour",
            dateRange: "from 7 days ago to now"
          }
        ],
        dimensions: ["Tracks.event"]
      },
      chartType: "bar"
    }
  },
  {
    id: 3,
    name: "Notification Taps",
    vizState: {
      query: {
        filters: [
          {
            dimension: "Tracks.contextEnvironment",
            operator: "equals",
            values: ["production"]
          },
          {
            dimension: "Tracks.event",
            operator: "contains",
            values: ["notification_tap"]
          }
        ],
        measures: ["Tracks.count"],
        timeDimensions: [
          {
            dimension: "Tracks.originalTimestamp",
            granularity: "hour",
            dateRange: "from 7 days ago to now"
          }
        ],
        dimensions: ["Tracks.event"]
      },
      chartType: "line"
    }
  },
  {
    id: 4,
    name: "Diary Interactions",
    vizState: {
      query: {
        filters: [
          {
            dimension: "Tracks.contextEnvironment",
            operator: "equals",
            values: ["production"]
          },
          {
            dimension: "Tracks.event",
            operator: "contains",
            values: ["diary_save"]
          }
        ],
        measures: ["Tracks.count"],
        timeDimensions: [
          {
            dimension: "Tracks.originalTimestamp",
            granularity: "day",
            dateRange: "from 7 days ago to now"
          }
        ],
        dimensions: ["Tracks.event"]
      },
      chartType: "bar"
    }
  },
  {
    id: 5,
    name: "Onboarding Status",
    vizState: {
      query: {
        filters: [
          {
            dimension: "Tracks.contextEnvironment",
            operator: "equals",
            values: ["production"]
          },
          {
            dimension: "Tracks.event",
            operator: "contains",
            values: ["Onboarding"]
          }
        ],
        measures: ["Tracks.count"],
        timeDimensions: [
          {
            dimension: "Tracks.originalTimestamp",
            granularity: "hour",
            dateRange: "from 7 days ago to now"
          }
        ],
        dimensions: ["Tracks.event"]
      },
      chartType: "line"
    }
  },
  {
    id: 6,
    name: "Notification Permission Monitoring",
    vizState: {
      query: {
        filters: [
          {
            dimension: "Tracks.contextEnvironment",
            operator: "equals",
            values: ["production"]
          },
          {
            dimension: "Tracks.event",
            operator: "contains",
            values: ["notification_permission"]
          }
        ],
        measures: ["Tracks.count"],
        timeDimensions: [
          {
            dimension: "Tracks.originalTimestamp",
            granularity: "hour",
            dateRange: "from 7 days ago to now"
          }
        ],
        dimensions: ["Tracks.event"]
      },
      chartType: "line"
    }
  },
  {
    id: 7,
    name: "Change in configuration of reminders",
    vizState: {
      query: {
        filters: [
          {
            dimension: "Tracks.contextEnvironment",
            operator: "equals",
            values: ["production"]
          },
          {
            dimension: "Tracks.event",
            operator: "contains",
            values: ["configured_reminder"]
          }
        ],
        measures: ["Tracks.count"],
        timeDimensions: [
          {
            dimension: "Tracks.originalTimestamp",
            granularity: "hour",
            dateRange: "from 7 days ago to now"
          }
        ],
        dimensions: ["Tracks.event"]
      },
      chartType: "line"
    }
  }
];

const DashboardPage = () => {
  const dashboardItem = item => {
    let styles = {
      marginBottom: "24px"
    }

    if(item.format === 'fullWidth') styles.width = '100%'

    return <Col
      span={24}
      lg={12}
      key={item.id}
      style={styles}
    >
      <DashboardItem title={item.name} layout={item.format}>
        <ChartRenderer vizState={item.vizState} />
      </DashboardItem>
    </Col>
  };

  const Empty = () => (
    <div
      style={{
        textAlign: "center",
        padding: 12
      }}
    >
      <h2>There are no charts on this dashboard</h2>
    </div>
  );

  return DashboardItems.length ? (
    <React.Fragment>
      {/* <Card>
        <p>We’re excited to welcome you to the LastPass family! In fact, we’re so excited that we went ahead and unlocked our Premium features for you for the next 30 days. </p>
      </Card> */}
      <Dashboard dashboardItems={DashboardItems}>
        {DashboardItems.map(dashboardItem)}
      </Dashboard>
    </React.Fragment>
  ) : (
    <Empty />
  );
};

export default DashboardPage;
