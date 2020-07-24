import React, { useRef, useState } from "react";
import JSONDigger from "json-digger";
import { v4 as uuidv4 } from "uuid";
import OrganizationChart from "../components/ChartContainer";
import "./edit-chart.css";

const EditChart = () => {
  const orgchart = useRef();
  const datasource = {
    id: "n1",
    name: "Lao Lao",
    title: "general manager",
    children: [
      { id: "n2", name: "Bo Miao", title: "department manager" },
      {
        id: "n3",
        name: "Su Miao",
        title: "department manager",
        children: [
          { id: "n4", name: "Tie Hua", title: "senior engineer" },
          {
            id: "n5",
            name: "Hei Hei",
            title: "senior engineer",
            children: [
              { id: "n6", name: "Dan Dan", title: "engineer" },
              { id: "n7", name: "Xiang Xiang", title: "engineer" }
            ]
          },
          { id: "n8", name: "Pang Pang", title: "senior engineer" }
        ]
      },
      { id: "n9", name: "Hong Miao", title: "department manager" },
      {
        id: "n10",
        name: "Chun Miao",
        title: "department manager",
        children: [{ id: "n11", name: "Yue Yue", title: "senior engineer" }]
      }
    ]
  };

  const [ds, setDS] = useState(datasource);
  const dsDigger = new JSONDigger(ds, "id", "children");

  const [selectedNodes, setSelectedNodes] = useState(new Set());
  const [newNodes, setNewNodes] = useState([{ name: "", title: "" }]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isMultipleSelect, setIsMultipleSelect] = useState(false);

  // add new nodes
  const [newNodeName, setNewNodeName] = useState("");
  const [newNodeTitle, setNewNodeTitle] = useState("");

  // export file
  const exportTo = () => {
    orgchart.current.exportTo(filename, fileextension);
  };
  const [filename, setFilename] = useState("organization_chart");
  const [fileextension, setFileextension] = useState("png");

  const onFileNameChange = event => {
    setFilename(event.target.value);
  };

  const onExtensionChange = event => {
    setFileextension(event.target.value);
  };

  const readSelectedNode = nodeData => {
    if (isMultipleSelect) {
      setSelectedNodes(prev => new Set(prev.add(nodeData)));
    } else {
      setSelectedNodes(new Set([nodeData]));
    }
  };

  const clearSelectedNode = () => {
    setSelectedNodes(new Set());
  };

  const onNameChange = (e, index) => {
    newNodes[index].name = e.target.value;
    setNewNodes([...newNodes]);
  };

  const onTitleChange = (e, index) => {
    newNodes[index].title = e.target.value;
    setNewNodes([...newNodes]);
  };
 
  const addNewNode = () => {
    setNewNodes(prevNewNodes => [...prevNewNodes, { name: "", title: "" }]);
  };

  const removeNewNode = index => {
    setNewNodes(prevNewNodes => {
      prevNewNodes.splice(index, 1);
      return [...prevNewNodes];
    });
  };

  const getNewNodes = () => {
    const nodes = [];
    for (const node of newNodes) {
      nodes.push({ ...node, id: uuidv4() });
    }
    return nodes;
  };

  const addChildNodes = async () => {
    await dsDigger.addChildren([...selectedNodes][0].id, getNewNodes());
    setDS({ ...dsDigger.ds });
  };

  const addRootNode = () => {
    dsDigger.addRoot(getNewNodes()[0]);
    setDS({ ...dsDigger.ds });
  };

  // 
  const updateNodes = async () => {
    await dsDigger.updateNodes([...selectedNodes].map(node => node.id), { id: uuidv4(), name: getNewNodes()[0].name, title: getNewNodes()[0].title });
    setDS({ ...dsDigger.ds });
  };

  const remove = async () => {
    await dsDigger.removeNodes([...selectedNodes].map(node => node.id));
    setDS({ ...dsDigger.ds });
    setSelectedNodes(new Set());
  };

  const onMultipleSelectChange = e => {
    setIsMultipleSelect(e.target.checked);
  };

  const onModeChange = e => {
    setIsEditMode(e.target.checked);
    if (e.target.checked) {
      orgchart.current.expandAllNodes();
    }
  };

  return (
    <div className="edit-chart-wrapper">
      <section className="toolbar">
        <div>
          <div style={{ marginBottom: "1rem" }}>
            <label htmlFor="txt-filename">File Name: </label>
            <input
                id="txt-filename"
                type="text"
                value={filename}
                onChange={onFileNameChange}
                style={{ fontSize: "1rem", marginRight: "2rem" }}
            />
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <span>File Extension: </span>
            <input
                id="rd-png"
                type="radio"
                value="png"
                checked={fileextension === "png"}
                onChange={onExtensionChange}
            />
            <label htmlFor="rd-png">png</label>
            <input
              style={{ marginLeft: "1rem" }}
              id="rd-pdf"
              type="radio"
              value="pdf"
              checked={fileextension === "pdf"}
              onChange={onExtensionChange}
            />
            <label htmlFor="rd-pdf">pdf</label>
          </div>
          <div>
            <button
              onClick={exportTo}
            >Export</button>
          </div>

          <ul>
            {Array.from(selectedNodes).map(node => (
              <li key={node.id}>
                {node.name} - {node.title}
              </li>
            ))}
          </ul>
        </div>

        <div className="new-nodes">
          <h4>New Node(s)
          <input
            style={{ marginLeft: "1rem" }}
            id="cb-mode"
            type="checkbox"
            checked={isEditMode}
            onChange={onModeChange}
          />
          <label htmlFor="cb-mode">Edit Mode</label>

          <input
              style={{ marginLeft: "1rem" }}
              id="cb-multiple-select"
              type="checkbox"
              checked={isMultipleSelect}
              onChange={onMultipleSelectChange}
            />
            <label htmlFor="cb-multiple-select">Multiple Select</label>
          </h4>
          <ul>
            {newNodes &&
              newNodes.map((node, index) => (
                <li key={index}>
                  <input
                    type="text"
                    placeholder="name"
                    value={node.name}
                    onChange={e => onNameChange(e, index)}
                  />
                  <input
                    type="text"
                    placeholder="title"
                    value={node.title}
                    onChange={e => onTitleChange(e, index)}
                  />
                  {newNodes.length === 1 || index === newNodes.length - 1 ? (
                    <button disabled={!isEditMode || !isMultipleSelect} onClick={addNewNode}>
                      +
                    </button>
                  ) : (
                    <button
                      disabled={!isEditMode}
                      onClick={() => removeNewNode(index)}
                    >
                      -
                    </button>
                  )}
                </li>
              ))}
          </ul>
        </div>

        <div className="action-buttons">
          <div>
            <button disabled={!isEditMode} onClick={addRootNode}>
              Add Root Node
            </button>
            <button disabled={!isEditMode} onClick={addChildNodes}>
              Add Child Nodes
            </button>
          </div> 

          <div>
            <button disabled={!isEditMode} onClick={updateNodes}>
              Update Nodes
            </button>
            <button disabled={!isEditMode} onClick={remove}>
              Remove Nodes
            </button>
          </div> 
        </div>
      </section>

      <OrganizationChart
        ref={orgchart}
        datasource={ds}
        collapsible={isEditMode}
        multipleSelect={isMultipleSelect}
        onClickNode={readSelectedNode}
        onClickChart={clearSelectedNode}
        draggable={true}
        pan={true} 
        zoom={true}
      />
      
    </div>
  );
};

export default EditChart;
