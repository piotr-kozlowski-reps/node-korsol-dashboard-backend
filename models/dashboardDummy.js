const stackedChartData = [
  [
    { x: "Jan", y: 111.1 },
    { x: "Feb", y: 127.3 },
    { x: "Mar", y: 143.4 },
    { x: "Apr", y: 159.9 },
    { x: "May", y: 159.9 },
    { x: "Jun", y: 159.9 },
    { x: "July", y: 159.9 },
  ],
  [
    { x: "Jan", y: 111.1 },
    { x: "Feb", y: 127.3 },
    { x: "Mar", y: 143.4 },
    { x: "Apr", y: 159.9 },
    { x: "May", y: 159.9 },
    { x: "Jun", y: 159.9 },
    { x: "July", y: 159.9 },
  ],
];

const dashboard = {
  userId: "1234",
  totalEarnings: 84458.78,
  userData: [
    {
      icon: "<TbPlant2 />",
      amount: "52",
      percentage: "-4% rok do roku",
      title: "Odmiany",
      iconColor: "#03C9D7",
      iconBg: "#E5FAFB",
      pcColor: "red-600",
    },
    {
      icon: "<BiRectangle />",
      amount: "63 hektary",
      percentage: "+23% rok do roku",
      title: "Pola",
      iconColor: "rgb(255, 244, 229)",
      iconBg: "rgb(254, 201, 15)",
      pcColor: "green-600",
    },
    {
      icon: "<BsPeople />",
      amount: "6",
      percentage: "+38% rok do roku",
      title: "Właściciele gospodarstw",
      iconColor: "rgb(228, 106, 118)",
      iconBg: "rgb(255, 244, 229)",

      pcColor: "green-600",
    },
    {
      icon: "<TbTractor />",
      amount: "22",
      percentage: "-12% rok do roku",
      title: "Sadzarki",
      iconColor: "rgb(0, 194, 146)",
      iconBg: "rgb(235, 250, 242)",
      pcColor: "red-600",
    },
  ],
  sparklineAreaData: [
    { x: 1, yval: 2 },
    { x: 2, yval: 6 },
    { x: 3, yval: 8 },
    { x: 4, yval: 5 },
    { x: 5, yval: 10 },
  ],
  stackedData: {
    stackedPrimaryXAxis: {
      majorGridLines: { width: 0 },
      minorGridLines: { width: 0 },
      majorTickLines: { width: 0 },
      minorTickLines: { width: 0 },
      interval: 1,
      lineStyle: { width: 0 },
      labelIntersectAction: "Rotate45",
      valueType: "Category",
    },
    stackedPrimaryYAxis: {
      lineStyle: { width: 0 },
      minimum: 100,
      maximum: 400,
      interval: 100,
      majorTickLines: { width: 0 },
      majorGridLines: { width: 1 },
      minorGridLines: { width: 1 },
      minorTickLines: { width: 0 },
      labelFormat: "{value}",
    },
    stackedCustomSeries: [
      {
        dataSource: stackedChartData[0],
        xName: "x",
        yName: "y",
        name: "Budżet",
        type: "StackingColumn",
        background: "blue",
      },

      {
        dataSource: stackedChartData[1],
        xName: "x",
        yName: "y",
        name: "Wydatki",
        type: "StackingColumn",
        background: "red",
      },
    ],
  },
};

module.exports = dashboard;
