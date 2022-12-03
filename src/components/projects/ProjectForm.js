import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ComponentRow from "./ComponentRow";
import DescriptionRow from "./DescriptionRow";
import ProjectLinkRow from "./ProjectLinkRow";
import TechStackRow from "./TechStackRow";
function ProjectForm(props) {
    const [projectName, setProjectName] = useState("");
    const [projectYear, setProjectYear] = useState(2022);
    const [description, setDescription] = useState([]);
    const [techStacks, setTechStack] = useState([]);
    const [projectLinks, setProjectLinks] = useState([]);
    const [projectComponents, setProjectComponents] = useState([]);
    // ========================main functions========================
    // ========== add ==========
    const addProject = () => {};
    // ========== update ==========
    const updateProject = () => {};

    // =======================descriptions=======================
    // ========== add ==========
    const addDescriptionPoint = () => {};
    // ========== update ==========
    const updateDescriptionPoint = () => {};
    // ========== delete ==========
    const deleteDescriptionPoint = () => {};

    // =======================tech stacks=======================
    // ========== add ==========
    const addTechStack = () => {};
    // ========== update ==========
    const updateTechStack = () => {};
    // ========== delete ==========
    const deleteTechStack = () => {};

    // =======================project links=======================
    // ========== add ==========
    const addProjectLink = () => {};
    // ========== update ==========
    const updateProjectLink = () => {};
    // ========== delete ==========
    const deleteProjectLink = () => {};

    // =======================components=======================
    // ========== add ==========
    const addProjectComponent = () => {};
    // ========== update ==========
    const updateProjectComponent = () => {};
    // ========== delete ==========
    const deleteProjectComponent = () => {};

    return (
        <div>
            <h1>Project Form</h1>
        </div>
    );
}

export default ProjectForm;
