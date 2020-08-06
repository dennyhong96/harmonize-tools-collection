import findNode from "../utils/findNode";
import { v4 as uuidv4 } from "uuid";

import {
  ORG_DATA_FETCHED,
  ORG_DATA_ERROR,
  NODE_MODIFIED,
  NODE_ADDED,
  COLLEAGUE_ADDED,
  NEW_HEAD_ADDED,
  NODE_DELETED,
  FIRST_NODE_ADDED,
  MANAGER_ADDED,
  CHART_SAVED,
  START_NEW_CHART,
  CHARTS_LOADED,
  CHART_SELECTED,
  CHART_UPDATED,
  LOCAL_CHART_LOADED,
  CHART_COLLAPSED,
  CHART_EXPANDED,
  CHART_EXPAND_ALL,
  NODE_DRAGGED,
  NODE_DROPPED,
} from "../actions/actionTypes";
import exampleData from "../utils/exampleData";

const deepCopyObj = (object) => JSON.parse(JSON.stringify(object));

const INITIAL_STATE = {
  chartList: null,
  currentChartId: null,
  currentChart: exampleData,
  collapsedChart: null,
  collapsedCharts: [],
  droppedOnId: null,
};

export default (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case CHART_SAVED:
      return {
        ...state,
        currentChart: JSON.parse(payload.chartData),
        chartList: state.chartList
          ? [{ ...payload }, ...state.chartList]
          : [{ ...payload }],
      };

    case ORG_DATA_FETCHED:
      return {
        ...state,
        currentChart: payload,
        collapsedChart: null,
        collapsedCharts: [],
      };

    case START_NEW_CHART:
      return {
        ...state,
        currentChart: {},
        currentChartId: null,
        collapsedChart: null,
        collapsedCharts: [],
      };

    case CHART_SELECTED:
      return {
        ...state,
        currentChartId: payload._id,
        currentChart: JSON.parse(payload.chartData),
        collapsedChart: null,
        collapsedCharts: [],
      };

    case CHART_COLLAPSED:
      const oldState = deepCopyObj(state);
      let chartBeforeCollapse;
      if (oldState.collapsedCharts.length) {
        chartBeforeCollapse = deepCopyObj(oldState).collapsedCharts.pop()
          .chartAfterCollapse;
      } else {
        chartBeforeCollapse = deepCopyObj(oldState).currentChart;
      }
      const chartAfterCollapse = deepCopyObj(chartBeforeCollapse);
      const nodeCollapsed = findNode(payload, chartAfterCollapse);
      nodeCollapsed.children = [];
      return {
        ...oldState,
        collapsedChart: chartAfterCollapse,
        collapsedCharts: [
          ...oldState.collapsedCharts,
          { collapsedNodeId: payload, chartBeforeCollapse, chartAfterCollapse },
        ],
      };

    case CHART_EXPANDED:
      const stateCopy = deepCopyObj(state);
      if (state.collapsedCharts.length <= 1) {
        return {
          ...state,
          collapsedCharts: [],
          collapsedChart: null,
        };
      } else {
        const oldChart = stateCopy.collapsedCharts.find(
          (chart) => chart.collapsedNodeId === payload
        ).chartBeforeCollapse;
        return {
          ...state,
          collapsedChart: oldChart,
          collapsedCharts: stateCopy.collapsedCharts.filter(
            (chart) => chart.collapsedNodeId !== payload
          ),
        };
      }

    case CHART_EXPAND_ALL:
      return { ...state, collapsedChart: null, collapsedCharts: [] };

    case CHART_UPDATED:
      return {
        ...state,
        currentChart: JSON.parse(payload.chartData),
        chartList: state.chartList.map((chart) =>
          chart._id === payload._id ? payload : chart
        ),
      };

    case LOCAL_CHART_LOADED:
      return {
        ...state,
        currentChart: JSON.parse(payload),
        collapsedChart: null,
        collapsedCharts: [],
      };

    case ORG_DATA_ERROR:
      return INITIAL_STATE;

    case NODE_DROPPED:
      return { ...state, droppedOnId: payload };

    case NODE_DRAGGED:
      if (state.droppedOnId && state.droppedOnId !== payload) {
        const stateAfterDrop = deepCopyObj(state);
        const draggedNode = findNode(payload, stateAfterDrop.currentChart);
        const droppedOnNode = findNode(
          stateAfterDrop.droppedOnId,
          stateAfterDrop.currentChart
        );
        draggedNode.manager = droppedOnNode.name;
        draggedNode.managerId = droppedOnNode.id;
        return { ...stateAfterDrop, droppedOnId: null };
      } else {
        return { ...state };
      }

    case FIRST_NODE_ADDED:
      return {
        ...state,
        currentChart: {
          ...payload,
          id: `oc-${uuidv4()}`,
          manager: "",
          managerId: "",
          children: [],
        },
      };

    case CHARTS_LOADED:
      return { ...state, chartList: payload };

    case NODE_MODIFIED:
      const { name, title, email } = payload.formData;
      const curChartModified = { ...state.currentChart };
      const selectedNode = findNode(payload.id, curChartModified);
      selectedNode.name = name;
      selectedNode.title = title;
      selectedNode.email = email;
      return { ...state, currentChart: curChartModified };

    case NODE_ADDED:
      const curChartAdded = { ...state.currentChart };
      const parentNode = findNode(payload.id, curChartAdded);
      parentNode.children.push({
        ...payload.formData,
        id: `oc-${uuidv4()}`, // html el id must start with letter
        children: [],
        manager: parentNode.name,
        managerId: parentNode.id,
      });
      return { ...state, currentChart: curChartAdded };

    case COLLEAGUE_ADDED:
      const curChartColleagueAdded = { ...state.currentChart };
      const commonManagerId = findNode(payload.id, curChartColleagueAdded)
        .managerId;
      const commonManager = findNode(commonManagerId, curChartColleagueAdded);
      let selectedIndex = commonManager.children.findIndex(
        (child) => child.id === payload.id
      );
      if (payload.direction === "RIGHT") {
        selectedIndex += 1;
      }
      commonManager.children.splice(selectedIndex, 0, {
        ...payload.formData,
        id: `oc-${uuidv4()}`,
        children: [],
        manager: commonManager.name,
        managerId: commonManager.id,
      });
      return { ...state, currentChart: curChartColleagueAdded };

    case NEW_HEAD_ADDED:
      const newHeadId = `oc-${uuidv4()}`;
      const oldHead = { ...state.currentChart };
      oldHead.manager = payload.name;
      oldHead.managerId = newHeadId;
      return {
        ...state,
        currentChart: {
          name: payload.name,
          title: payload.title,
          email: payload.email,
          id: newHeadId,
          children: [oldHead],
          manager: "",
          managerId: "",
        },
      };

    case MANAGER_ADDED:
      const newMangerId = `oc-${uuidv4()}`;
      const curChartManagerAdded = { ...state.currentChart };
      const oldManager = findNode(
        payload.selectedNode.managerId,
        curChartManagerAdded
      );
      oldManager.children = oldManager.children.filter((child) => {
        return child.id !== payload.selectedNode.id;
      });
      oldManager.children.push({
        id: newMangerId,
        name: payload.formData.name,
        title: payload.formData.title,
        email: payload.formData.email,
        manager: oldManager.name,
        managerId: oldManager.id,
        children: [payload.selectedNode],
      });
      return { ...state, currentChart: curChartManagerAdded };

    case NODE_DELETED:
      const curChartNodeDeleted = { ...state.currentChart };
      const { managerId } = findNode(payload.id, curChartNodeDeleted);
      if (!managerId) {
        // Handle deleting the root node
        return { ...state, currentChart: {} };
      }
      let manager = findNode(managerId, curChartNodeDeleted);
      manager.children = manager.children.filter((ch) => ch.id !== payload.id);
      // Asign new manager for deleted nodes'children
      payload.children.forEach((child) => {
        child.manager = manager.name;
        child.managerId = manager.id;
      });
      manager.children = [...manager.children, ...payload.children];
      return { ...state, currentChart: curChartNodeDeleted };

    default:
      return state;
  }
};
